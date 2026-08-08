// useChatFlow.ts
import { useEffect, useRef, useState } from 'react';
import {
  EMPTY_PSYCHO_STRUCTURE,
  buildUserEnneagramProfile,
  createEmptySieConversationState,
  extractPsychoStructure,
  formatAdviceMessage,
  generateAdvice,
  generateFollowUp,
  mergePsychoStructure,
  resolveReplyStyle,
  respond,
  respondVoiceInput,
  toSpeechFriendly,
  writeResponse,
  type PsychoStructure,
  type ResponsePersonaContext,
  type SieConversationState,
} from '../bridge';
import { selfUnderstandingMock } from '../mocks/selfUnderstandingMock';
import {
  loadChatHistory,
  saveChatHistory,
  type ChatFlowMessage,
} from './chatHistoryStorage';
import { loadSieState, saveSieState } from './sieStateStorage';

export type { ChatFlowMessage };

type ConversationContext = {
  type: string | null;
  label: string | null;
  remainingSteps: string[];
  /** 人格モデル（文章化・助言用） */
  persona: ResponsePersonaContext | null;
  /** 対話中に蓄積する心理構造 */
  psychology: PsychoStructure;
  /** flow 完了後の助言をすでに出したか（sieState と同期） */
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
  const [sieState, setSieState] = useState<SieConversationState>(
    createEmptySieConversationState
  );
  const [sieStateReady, setSieStateReady] = useState(false);
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
        loadSieState(),
        loadChatHistory(),
      ]);
      if (cancelled) {
        return;
      }
      messagesRef.current = loadedMessages;
      setMessages(loadedMessages);
      setSieState(loadedState);
      setContext((prev) => ({
        ...prev,
        adviceDelivered: loadedState.adviceDelivered,
      }));
      setSieStateReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /** state をメモリと AsyncStorage の両方に反映 */
  const commitSieState = async (next: SieConversationState) => {
    setSieState(next);
    await saveSieState(next);
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
      await commitSieState({
        ...sieState,
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
    const activeState = sieStateReady ? sieState : await loadSieState();
    const {
      text: sieReply,
      state: nextSieState,
    } = await respond(text, userProfile, activeState);
    await commitSieState(nextSieState);
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
      adviceDelivered: nextSieState.adviceDelivered,
    }));
  };

  /**
   * 音声入力: STT → generateResponse → チャットに反映
   * （文字起こし結果をユーザー発言、短文化した返答をサイ発言として追加）
   */
  const sendVoiceMessage = async (audioUri: string) => {
    try {
      const activeState = sieStateReady ? sieState : await loadSieState();
      const { text, userInput, state: nextSieState } = await respondVoiceInput(
        audioUri,
        userProfile,
        activeState
      );

      const spoken = userInput.trim() || '（音声を認識できませんでした）';
      await commitSieState(nextSieState);
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
        adviceDelivered: nextSieState.adviceDelivered,
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '音声の処理に失敗しました';
      await commitMessages((prev) => [
        ...prev,
        {
          sender: 'sie',
          text:
            message === 'SIE_STT_ENDPOINT_NOT_SET'
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
    sieState,
    sieStateReady,
  };
}
