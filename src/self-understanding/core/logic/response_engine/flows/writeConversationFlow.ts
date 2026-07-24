// response_engine/flows/writeConversationFlow.ts
// 会話フェーズ：tone 切り替え + 人格ニュアンス（軽め）

import { getReplyStyleEntry } from '../../../data/enneagram';
import { detectTone, type ToneType } from '../tone_detector';
import type { UserEnneagramProfile } from '../types';

export function writeConversationFlow(
  userInput: string,
  profile: UserEnneagramProfile,
  tone?: ToneType
): string {
  const resolvedTone = tone ?? detectTone(userInput);
  const styleKey = profile.wing || profile.type;
  const style = getReplyStyleEntry(styleKey);

  const base = generateConversationResponse(userInput, resolvedTone);

  // 人格ニュアンス（軽め）
  const nuance = style ? `（${style.tone}で話すね）` : '';

  return nuance ? `${base}\n\n${nuance}` : base;
}

function generateConversationResponse(
  _userInput: string,
  tone: ToneType
): string {
  switch (tone) {
    case 'soft':
      return [
        `そう感じたんだね。まずはそのまま話してくれて大丈夫だよ。`,
        `ちょっと戸惑いがあったのかなって思ったよ。`,
        `どのあたりが一番ひっかかった？`,
      ].join('\n');

    case 'voice':
      return [
        `そっか、そう感じたんだね。話してくれてありがとう。`,
        `その気持ち、まずはそのままでいいんだよ。`,
        `どこが気になったのか、少しだけ教えてほしいな。`,
      ].join('\n');

    case 'calm':
    default:
      return [
        `なるほど、そう感じたんだね。話してくれてありがとう。`,
        `その印象には何か理由がありそうだなって思ったよ。`,
        `まずは気になったところを一つだけ教えてほしいな。`,
      ].join('\n');
  }
}
