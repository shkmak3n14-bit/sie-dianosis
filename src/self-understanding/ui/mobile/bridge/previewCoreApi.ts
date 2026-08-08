/**
 * mobile → core の境界（preview）
 * Expo では core を import せず、UI 内スタブで動かす。
 * 将来はホストが @sie/self-understanding-core の実装を注入する。
 */

import {
  EMPTY_PSYCHO_STRUCTURE,
  type PsychoStructure,
  type ResponsePersonaContext,
  type SieConversationState,
  type UserEnneagramProfile,
} from '../templates/sie_conversation';

export type GeneratedAdvice = {
  summary: string;
  tips: string[];
};

export function writeResponse(
  step: string,
  _persona: ResponsePersonaContext,
  userText: string,
): string {
  return `（プレビュー）${step}\nいまの話「${userText.slice(0, 80)}」を受け止めたよ。もう少し具体的に教えてくれる？`;
}

export function generateAdvice(profile: UserEnneagramProfile): GeneratedAdvice {
  return {
    summary: `タイプ${profile.wing ?? profile.type}の傾向を踏まえて整理すると、自分のペースを守ることが鍵になりやすいです。`,
    tips: [
      '無理に結論を急がない',
      '感じた違和感を短い言葉で残す',
      '次の一歩を1つだけ決める',
    ],
  };
}

export function resolveReplyStyle(_profile: UserEnneagramProfile): string {
  return 'calm';
}

export function formatAdviceMessage(
  advice: GeneratedAdvice,
  _style: string,
): string {
  const tips = advice.tips.map((t) => `・${t}`).join('\n');
  return `${advice.summary}\n\n${tips}`;
}

export function toSpeechFriendly(text: string): string {
  return text
    .replace(/\n{2,}/g, '\n')
    .replace(/[・●]/g, '')
    .trim();
}

export async function extractPsychoStructure(
  _text: string,
  _options?: { wingCode?: string },
): Promise<PsychoStructure> {
  return { ...EMPTY_PSYCHO_STRUCTURE };
}

export function generateFollowUp(_structure: PsychoStructure): string | null {
  return null;
}

export async function respond(
  userInput: string,
  profile: UserEnneagramProfile,
  state: SieConversationState,
): Promise<{ text: string; state: SieConversationState }> {
  const reply = `（プレビュー／タイプ${profile.wing ?? profile.type}）「${userTextPreview(userInput)}」について、もう少し状況を教えてくれると整理しやすいよ。`;
  return {
    text: reply,
    state: {
      ...state,
      lastPhase: 'conversation',
      conversationHistory: [...state.conversationHistory, userInput].slice(-5),
    },
  };
}

export async function respondVoiceInput(
  _audioUri: string,
  profile: UserEnneagramProfile,
  state: SieConversationState,
): Promise<{ text: string; userInput: string; state: SieConversationState }> {
  const userInput = '';
  const { text, state: next } = await respond(
    '（音声プレビュー）',
    profile,
    state,
  );
  return { text, userInput, state: next };
}

function userTextPreview(text: string): string {
  const t = text.trim();
  return t.length > 40 ? `${t.slice(0, 40)}…` : t || 'いまの気持ち';
}
