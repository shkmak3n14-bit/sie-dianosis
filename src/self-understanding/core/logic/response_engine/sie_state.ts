// response_engine/sie_state.ts
// generateResponse 外側で保持する会話ログ（state）

import type { ConversationPhase } from './phase_detector';
import type { ToneType } from './tone_detector';

export type SieConversationState = {
  lastPhase: ConversationPhase | null;
  adviceDelivered: boolean;
  conversationHistory: string[]; // 直近3〜5ターン
  emotionTrend: ToneType[]; // soft / calm / voice の推移
};

export function createEmptySieConversationState(): SieConversationState {
  return {
    lastPhase: null,
    adviceDelivered: false,
    conversationHistory: [],
    emotionTrend: [],
  };
}

/**
 * LLM 判定フェーズを会話 state で補正する。
 */
export function adjustPhaseWithState(
  phase: ConversationPhase,
  state: SieConversationState
): ConversationPhase {
  // ① 直前が advice の場合、連続 advice を防ぐ
  if (state.lastPhase === 'advice' && phase === 'advice') {
    return 'deepening';
  }

  // ② 直前が conversation で、今回 deepening なら自然
  if (state.lastPhase === 'conversation' && phase === 'deepening') {
    return 'deepening';
  }

  // ③ 直前が deepening で、今回 conversation なら戻さない
  if (state.lastPhase === 'deepening' && phase === 'conversation') {
    return 'deepening';
  }

  // ④ emotionTrend が soft 連続なら deepening を優先
  const recent = state.emotionTrend.slice(-3);
  if (
    recent.filter((t) => t === 'soft').length >= 2 &&
    phase === 'conversation'
  ) {
    return 'deepening';
  }

  return phase;
}
