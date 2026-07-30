// saiStateStorage.ts
// SaiConversationState の永続化（長期相談モード）

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createEmptySaiConversationState,
  type ConversationPhase,
  type SaiConversationState,
  type ToneType,
} from '../bridge';

const SAI_STATE_KEY = 'sai_state';

const PHASES: ConversationPhase[] = ['conversation', 'deepening', 'advice'];
const TONES: ToneType[] = ['soft', 'calm', 'voice'];

export async function saveSaiState(state: SaiConversationState): Promise<void> {
  try {
    await AsyncStorage.setItem(SAI_STATE_KEY, JSON.stringify(state));
  } catch {
    // 保存失敗しても会話自体は止めない
  }
}

export async function loadSaiState(): Promise<SaiConversationState> {
  try {
    const raw = await AsyncStorage.getItem(SAI_STATE_KEY);
    if (!raw) {
      return createEmptySaiConversationState();
    }
    return normalizeSaiState(JSON.parse(raw));
  } catch {
    return createEmptySaiConversationState();
  }
}

export async function clearSaiState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SAI_STATE_KEY);
  } catch {
    // ignore
  }
}

/** 壊れた保存データでも安全に使える形へ整える */
function normalizeSaiState(raw: unknown): SaiConversationState {
  const empty = createEmptySaiConversationState();
  if (!raw || typeof raw !== 'object') {
    return empty;
  }

  const data = raw as Partial<SaiConversationState>;
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
