// sieStateStorage.ts
// SieConversationState の永続化（長期相談モード）

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createEmptySieConversationState,
  type ConversationPhase,
  type SieConversationState,
  type ToneType,
} from '../bridge';

const SIE_STATE_KEY = 'sie_state';

const PHASES: ConversationPhase[] = ['conversation', 'deepening', 'advice'];
const TONES: ToneType[] = ['soft', 'calm', 'voice'];

export async function saveSieState(state: SieConversationState): Promise<void> {
  try {
    await AsyncStorage.setItem(SIE_STATE_KEY, JSON.stringify(state));
  } catch {
    // 保存失敗しても会話自体は止めない
  }
}

export async function loadSieState(): Promise<SieConversationState> {
  try {
    const raw = await AsyncStorage.getItem(SIE_STATE_KEY);
    if (!raw) {
      return createEmptySieConversationState();
    }
    return normalizeSieState(JSON.parse(raw));
  } catch {
    return createEmptySieConversationState();
  }
}

export async function clearSieState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SIE_STATE_KEY);
  } catch {
    // ignore
  }
}

/** 壊れた保存データでも安全に使える形へ整える */
function normalizeSieState(raw: unknown): SieConversationState {
  const empty = createEmptySieConversationState();
  if (!raw || typeof raw !== 'object') {
    return empty;
  }

  const data = raw as Partial<SieConversationState>;
  const lastPhase =
    data.lastPhase === null ||
    (typeof data.lastPhase === 'string' &&
      PHASES.includes(data.lastPhase as ConversationPhase))
      ? (data.lastPhase as ConversationPhase | null)
      : null;

  return {
    lastPhase,
    adviceDelivered: Boolean(data.adviceDelivered),
    conversationHistory: Array.isArray(data.conversationHistory)
      ? data.conversationHistory.filter((t): t is string => typeof t === 'string').slice(-5)
      : [],
    emotionTrend: Array.isArray(data.emotionTrend)
      ? data.emotionTrend
          .filter((t): t is ToneType => TONES.includes(t as ToneType))
          .slice(-5)
      : [],
  };
}
