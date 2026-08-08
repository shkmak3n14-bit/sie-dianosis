/**
 * UI 用会話・心理構造の型（core 非依存コピー）
 * 正本の形は core/logic。ホスト接続時もこの形で受け渡す。
 */

export type ConversationPhase = 'conversation' | 'deepening' | 'advice';
export type ToneType = 'soft' | 'calm' | 'voice';

export type SieConversationState = {
  lastPhase: ConversationPhase | null;
  adviceDelivered: boolean;
  conversationHistory: string[];
  emotionTrend: ToneType[];
};

export type UserEnneagramProfile = {
  center: 'Gut' | 'Heart' | 'Head';
  type: string;
  wing?: string | null;
  instinct?: string | null;
};

/** UI が保持する最小ペルソナ（core の辞書型には依存しない） */
export type ResponsePersonaContext = {
  label: string;
  typeLabel: string;
  flowType: string;
};

export type PsychoStructure = {
  fear: string | null;
  desire: string | null;
  motive: string | null;
  action: string | null;
};

export const EMPTY_PSYCHO_STRUCTURE: PsychoStructure = {
  fear: null,
  desire: null,
  motive: null,
  action: null,
};

export function createEmptySieConversationState(): SieConversationState {
  return {
    lastPhase: null,
    adviceDelivered: false,
    conversationHistory: [],
    emotionTrend: [],
  };
}

export function buildUserEnneagramProfile(
  wingCode: string,
  instinct?: string | null,
): UserEnneagramProfile {
  const normalized = wingCode.trim();
  const base = normalized.charAt(0);
  let center: UserEnneagramProfile['center'] = 'Head';
  if (base === '8' || base === '9' || base === '1') center = 'Gut';
  else if (base === '2' || base === '3' || base === '4') center = 'Heart';

  return {
    center,
    type: base,
    wing: normalized.includes('w') ? normalized : null,
    instinct: instinct ?? null,
  };
}

/** null は既存値を消さない */
export function mergePsychoStructure(
  current: PsychoStructure,
  next: PsychoStructure,
): PsychoStructure {
  return {
    fear: next.fear ?? current.fear,
    desire: next.desire ?? current.desire,
    motive: next.motive ?? current.motive,
    action: next.action ?? current.action,
  };
}
