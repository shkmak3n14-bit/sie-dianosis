// response_engine/generate.ts

import {
  BASE_TYPES,
  CENTER_INSIGHTS,
  WING_TYPES,
  getEnneagramBehaviorEntry,
  getEnneagramInsightEntry,
  getEnneagramInstinctEntry,
} from '../../data/enneagram';
import { classify } from '../classifier';
import { getTemplate } from '../template_engine';
import { writeAdviceFlow } from './flows/writeAdviceFlow';
import { writeConversationFlow } from './flows/writeConversationFlow';
import { writeDeepeningFlow } from './flows/writeDeepeningFlow';
import type { ConversationPhase } from './phase_detector';
import { detectPhaseLLM } from './phase/detectPhaseLLM';
import {
  adjustPhaseWithState,
  type SieConversationState,
} from './sie_state';
import { detectToneLLM } from './tone/detectToneLLM';
import type {
  GeneratedResponse,
  UserEnneagramProfile,
} from './types';

export type GenerateResponseResult = {
  text: string;
  phase: ConversationPhase;
  state: SieConversationState;
};

/**
 * response_engine のメイン処理。
 * フェーズ・トーンを LLM で判定し、会話 state で補正してから各 flow へ振り分ける。
 */
export async function generateResponse(
  userInput: string,
  profile: UserEnneagramProfile,
  state: SieConversationState
): Promise<GenerateResponseResult> {
  // 入力 state を破壊しないようコピーしてから更新する
  const nextState: SieConversationState = {
    lastPhase: state.lastPhase,
    adviceDelivered: state.adviceDelivered,
    conversationHistory: [...state.conversationHistory],
    emotionTrend: [...state.emotionTrend],
  };

  // ① LLMでフェーズ判定
  let phase = await detectPhaseLLM(userInput);

  // ② LLMでトーン判定
  const tone = await detectToneLLM(userInput);

  // ③ state による補正（最重要）
  phase = adjustPhaseWithState(phase, nextState);

  // ④ フェーズごとの返答生成
  let text = '';
  switch (phase) {
    case 'conversation':
      text = writeConversationFlow(userInput, profile, tone);
      break;

    case 'deepening':
      text = writeDeepeningFlow(userInput, profile, tone);
      break;

    case 'advice':
      text = writeAdviceFlow(profile, userInput, tone);
      nextState.adviceDelivered = true;
      break;

    default:
      text = writeConversationFlow(userInput, profile, tone);
      break;
  }

  // ⑤ state 更新
  nextState.lastPhase = phase;
  nextState.conversationHistory.push(userInput);
  nextState.emotionTrend.push(tone);

  // 直近5件に制限
  nextState.conversationHistory = nextState.conversationHistory.slice(-5);
  nextState.emotionTrend = nextState.emotionTrend.slice(-5);

  return { text, phase, state: nextState };
}

/**
 * 多段テンプレート用の設計図（type / flow / persona context）。
 * 文章化はしない。
 */
export function buildResponsePlan(
  userInput: string,
  userProfile: UserEnneagramProfile
): GeneratedResponse {
  const type = classify(userInput);
  const template = getTemplate(type);

  const center = CENTER_INSIGHTS[userProfile.center];
  const baseType = BASE_TYPES[userProfile.type];
  const wing = userProfile.wing ? (WING_TYPES[userProfile.wing] ?? null) : null;
  const behavior = getEnneagramBehaviorEntry(userProfile.type);
  const instinct = userProfile.instinct
    ? getEnneagramInstinctEntry(userProfile.instinct)
    : null;

  const insightKey = userProfile.wing || userProfile.type;
  const persona = wing ?? baseType ?? null;

  return {
    type: template.type,
    label: template.label,
    flow: template.flow,
    context: {
      label: template.label,
      typeLabel: insightKey,
      flowType: template.type,
      center,
      baseType,
      wing,
      persona,
      behavior,
      instinct,
      insight: getEnneagramInsightEntry(insightKey),
    },
  };
}

/** wingCode（例: 9w8）からプロファイルを組み立てる */
export function buildUserEnneagramProfile(
  wingCode: string,
  instinct?: string | null
): UserEnneagramProfile {
  const normalized = wingCode.trim();
  const base = normalized.charAt(0);

  return {
    center: resolveCenter(base),
    type: base,
    wing: normalized.includes('w') ? normalized : null,
    instinct: instinct ?? null,
  };
}

function resolveCenter(typeNum: string): 'Gut' | 'Heart' | 'Head' {
  if (typeNum === '8' || typeNum === '9' || typeNum === '1') {
    return 'Gut';
  }
  if (typeNum === '2' || typeNum === '3' || typeNum === '4') {
    return 'Heart';
  }
  return 'Head';
}
