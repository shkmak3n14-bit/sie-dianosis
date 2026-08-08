// useChatFlow.ts
import { useEffect, useRef, useState } from 'react';
import {
  buildUserEnneagramProfile,
  callSelfUnderstandingBridge,
  createEmptySieConversationState,
  respondVoiceInput,
  type SieConversationState,
  type SiePersona,
} from '../bridge';
import { selfUnderstandingMock } from '../mocks/selfUnderstandingMock';
import { SIE_AVATAR } from './sieAvatar';
import {
  loadChatHistory,
  saveChatHistory,
  type ChatFlowMessage,
} from './chatHistoryStorage';
import { runSieFlow, type SieFlowStep } from './runSieFlow';
import { loadSieState, saveSieState } from './sieStateStorage';

export type { ChatFlowMessage };

const DEFAULT_SIE_PERSONA: Pick<
  SiePersona,
  'id' | 'name' | 'tone' | 'wingCode'
> = {
  id: 'sie',
  name: SIE_AVATAR.name,
  tone: 'gentle',
};

export type UseChatFlowOptions = {
  /** 診断結果（例: 9w8）。未指定時はモックの wingCode を使う */
  enneagramType?: string;
};

function toSieChatMessage(step: SieFlowStep): ChatFlowMessage {
  return {
    sender: 'sie',
    text: step.message,
    stepLabel: step.stepLabel,
    persona: {
      id: step.persona.id,
      name: step.persona.name,
      tone: step.persona.tone,
      wingCode: step.persona.wingCode,
    },
  };
}

export function useChatFlow(options: UseChatFlowOptions = {}) {
  const userEnneagramType =
    options.enneagramType ?? selfUnderstandingMock.resultCard.wingCode;
  const userProfile = buildUserEnneagramProfile(userEnneagramType);

  const [messages, setMessages] = useState<ChatFlowMessage[]>([]);
  const messagesRef = useRef<ChatFlowMessage[]>([]);
  const [pendingSteps, setPendingSteps] = useState<ChatFlowMessage[]>([]);
  const pendingStepsRef = useRef<ChatFlowMessage[]>([]);

  const [sieState, setSieState] = useState<SieConversationState>(
    createEmptySieConversationState,
  );
  const [sieStateReady, setSieStateReady] = useState(false);

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
      setSieStateReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const commitSieState = async (next: SieConversationState) => {
    setSieState(next);
    await saveSieState(next);
  };

  /** メッセージを更新し、直近10件を永続化 */
  const commitMessages = async (
    build: (prev: ChatFlowMessage[]) => ChatFlowMessage[],
  ) => {
    const next = build(messagesRef.current).slice(-10);
    messagesRef.current = next;
    setMessages(next);
    await saveChatHistory(next);
  };

  const commitPendingSteps = (next: ChatFlowMessage[]) => {
    pendingStepsRef.current = next;
    setPendingSteps(next);
  };

  const sendMessage = async (text: string, wingCode?: string) => {
    const resolvedWingCode = wingCode ?? userEnneagramType;

    // ① ユーザーの発言を追加
    await commitMessages((prev) => [...prev, { sender: 'user', text }]);

    // ② まだ sie の flow が残っている場合 → 次のステップを返す
    if (pendingStepsRef.current.length > 0) {
      const [next, ...rest] = pendingStepsRef.current;
      await commitMessages((prev) => [...prev, next]);
      commitPendingSteps(rest);
      return;
    }

    // ③ 新しい相談として bridge を呼ぶ
    const response = await callSelfUnderstandingBridge({
      text,
      wingCode: resolvedWingCode,
    });

    // ④ 成功レスポンス（sie の flow）
    if (response.status === 'success') {
      const sieSteps = runSieFlow(response).map(toSieChatMessage);
      const [first, ...rest] = sieSteps;

      if (first) {
        await commitMessages((prev) => [...prev, first]);
      }
      commitPendingSteps(rest);
      return;
    }

    // ⑤ 失敗（failure）・例外（error）
    if (response.status === 'failure' || response.status === 'error') {
      await commitMessages((prev) => [
        ...prev,
        {
          sender: 'sie',
          text: response.error.message,
          persona: { ...DEFAULT_SIE_PERSONA, wingCode: resolvedWingCode },
        },
      ]);
    }
  };

  /**
   * 音声入力: STT → チャットに反映
   * （文字起こし結果をユーザー発言、短文化した返答を sie 発言として追加）
   */
  const sendVoiceMessage = async (audioUri: string) => {
    try {
      const activeState = sieStateReady ? sieState : await loadSieState();
      const { userInput, state: nextSieState } = await respondVoiceInput(
        audioUri,
        userProfile,
        activeState,
      );

      const spoken = userInput.trim() || '（音声を認識できませんでした）';
      await commitSieState(nextSieState);
      // 文字起こし結果を bridge flow へ接続
      await sendMessage(spoken, userEnneagramType);
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
          persona: { ...DEFAULT_SIE_PERSONA, wingCode: userEnneagramType },
        },
      ]);
    }
  };

  return {
    messages,
    sendMessage,
    sendVoiceMessage,
    pendingSteps,
    sieState,
    sieStateReady,
  };
}
