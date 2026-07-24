// useChatFlow.ts
import { useEffect, useRef, useState } from 'react';
import {
  formatAdviceMessage,
  generateAdvice,
  resolveReplyStyle,
} from '../../../core/logic/advice_engine';
import {
  EMPTY_PSYCHO_STRUCTURE,
  extractPsychoStructure,
  mergePsychoStructure,
  type PsychoStructure,
} from '../../../core/logic/psycho_extractor';
import { generateFollowUp } from '../../../core/logic/psycho_followup';
import { respond } from '../../../core/logic/respond';
import { respondVoiceInput } from '../../../core/logic/respond_voice';
import {
  buildUserEnneagramProfile,
  createEmptySaiConversationState,
  type ResponsePersonaContext,
  type SaiConversationState,
} from '../../../core/logic/response_engine';
import { writeResponse } from '../../../core/logic/response_writer';
import { toSpeechFriendly } from '../../../core/logic/speech_summarizer';
import { selfUnderstandingMock } from '../mocks/selfUnderstandingMock';
import {
  loadChatHistory,
  saveChatHistory,
  type ChatFlowMessage,
} from './chatHistoryStorage';
import { loadSaiState, saveSaiState } from './saiStateStorage';

export type { ChatFlowMessage };

type ConversationContext = {
  type: string | null;
  label: string | null;
  remainingSteps: string[];
  /** 人格モデル（文章化・助言用） */
  persona: ResponsePersonaContext | null;
  /** 対話中に蓄積する心理構造 */
  psychology: PsychoStructure;
  /** flow 完了後の助言をすでに出したか（saiState と同期） */
  adviceDelivered: boolean;
};

export type UseChatFlowOptions = {
  /** 診断結果（例: 9w8）。未指定時はモックの wingCode を使う */
  enneagramType?: string;
};

export function useChatFlow(options: UseChatFlowOptions = {}) {
  const userEnneagramType =
    options.enneagramType ?? selfUnderstandingMock.resultCard.wingCode;
  const userProfile = buildUserEnneagramProfile(userEnneagramType);

  const [messages, setMessages] = useState<ChatFlowMessage[]>([]);
  const messagesRef = useRef<ChatFlowMessage[]>([]);
  const [saiState, setSaiState] = useState<SaiConversationState>(
    createEmptySaiConversationState
  );
  const [saiStateReady, setSaiStateReady] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    type: null,
    label: null,
    remainingSteps: [],
    persona: null,
    psychology: { ...EMPTY_PSYCHO_STRUCTURE },
    adviceDelivered: false,
  });

  // 起動時に永続化 state / チャット履歴を読み込む（長期相談モード）
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const [loadedState, loadedMessages] = await Promise.all([
        loadSaiState(),
        loadChatHistory(),
      ]);
      if (cancelled) {
        return;
      }
      messagesRef.current = loadedMessages;
      setMessages(loadedMessages);
      setSaiState(loadedState);
      setContext((prev) => ({
        ...prev,
        adviceDelivered: loadedState.adviceDelivered,
      }));
      setSaiStateReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /** state をメモリと AsyncStorage の両方に反映 */
  const commitSaiState = async (next: SaiConversationState) => {
    setSaiState(next);
    await saveSaiState(next);
  };

  /** メッセージを更新し、直近10件を永続化 */
  const commitMessages = async (
    build: (prev: ChatFlowMessage[]) => ChatFlowMessage[]
  ) => {
    const next = build(messagesRef.current).slice(-10);
    messagesRef.current = next;
    setMessages(next);
    await saveChatHistory(next);
  };

  const sendMessage = async (text: string) => {
    // ① ユーザーの発言を追加
    await commitMessages((prev) => [...prev, { sender: 'user', text }]);

    // ② flow が残っている間は flow を優先
    if (context.type && context.persona && context.remainingSteps.length > 0) {
      const nextStep = context.remainingSteps[0];
      const sieReply = writeResponse(nextStep, context.persona, text);

      await commitMessages((prev) => [...prev, { sender: 'sie', text: sieReply }]);
      setContext((prev) => ({
        ...prev,
        remainingSteps: prev.remainingSteps.slice(1),
      }));

      return;
    }

    // ③ flow が全部終わったらタイプ構造の整理（音声向け短文）
    if (context.type && !context.adviceDelivered) {
      const advice = generateAdvice(userProfile);
      const speechText = toSpeechFriendly(
        formatAdviceMessage(advice, resolveReplyStyle(userProfile))
      );
      await commitMessages((prev) => [
        ...prev,
        { sender: 'sie', text: speechText },
      ]);
      setContext((prev) => ({
        ...prev,
        adviceDelivered: true,
      }));
      await commitSaiState({
        ...saiState,
        adviceDelivered: true,
        lastPhase: 'advice',
      });
      return;
    }

    // ④ 新規相談（または助言後の次トピック）: 心理構造を抽出・蓄積
    const basePsychology = context.adviceDelivered
      ? { ...EMPTY_PSYCHO_STRUCTURE }
      : context.psychology;

    const extracted = await extractPsychoStructure(text, {
      wingCode: userEnneagramType,
    });
    const psychology = mergePsychoStructure(basePsychology, extracted);

    const followUp = generateFollowUp(psychology);

    if (followUp) {
      setContext((prev) => ({
        ...prev,
        type: null,
        label: null,
        remainingSteps: [],
        persona: null,
        psychology,
        adviceDelivered: false,
      }));
      await commitMessages((prev) => [
        ...prev,
        { sender: 'sie', text: followUp },
      ]);
      return;
    }

    // ⑤ フェーズ判定：advice / deepening / conversation → respond へ
    // 起動直後のレースを避けるため、未準備ならストレージから再読込
    const activeState = saiStateReady ? saiState : await loadSaiState();
    const {
      text: sieReply,
      state: nextSaiState,
    } = await respond(text, userProfile, activeState);
    await commitSaiState(nextSaiState);
    await commitMessages((prev) => [
      ...prev,
      { sender: 'sie', text: sieReply },
    ]);
    setContext((prev) => ({
      ...prev,
      type: null,
      label: null,
      remainingSteps: [],
      persona: null,
      psychology,
      adviceDelivered: nextSaiState.adviceDelivered,
    }));
  };

  /**
   * 音声入力: STT → generateResponse → チャットに反映
   * （文字起こし結果をユーザー発言、短文化した返答をサイ発言として追加）
   */
  const sendVoiceMessage = async (audioUri: string) => {
    try {
      const activeState = saiStateReady ? saiState : await loadSaiState();
      const { text, userInput, state: nextSaiState } = await respondVoiceInput(
        audioUri,
        userProfile,
        activeState
      );

      const spoken = userInput.trim() || '（音声を認識できませんでした）';
      await commitSaiState(nextSaiState);
      await commitMessages((prev) => [
        ...prev,
        { sender: 'user', text: spoken },
        { sender: 'sie', text },
      ]);
      setContext((prev) => ({
        ...prev,
        type: null,
        label: null,
        remainingSteps: [],
        persona: null,
        adviceDelivered: nextSaiState.adviceDelivered,
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '音声の処理に失敗しました';
      await commitMessages((prev) => [
        ...prev,
        {
          sender: 'sie',
          text:
            message === 'SAI_STT_ENDPOINT_NOT_SET'
              ? '音声認識の接続先がまだ設定されていないよ。テキストで話してくれると助かるな。'
              : '音声の取り込みに失敗したみたい。もう一度試すか、テキストで送ってみてね。',
        },
      ]);
    }
  };

  return {
    messages,
    sendMessage,
    sendVoiceMessage,
    context,
    saiState,
    saiStateReady,
  };
}
