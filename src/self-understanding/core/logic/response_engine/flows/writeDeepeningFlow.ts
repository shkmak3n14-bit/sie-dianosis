// response_engine/flows/writeDeepeningFlow.ts
// 深まりフェーズ：tone 切り替え + 人格ニュアンス（framing を薄く）

import { getReplyStyleEntry } from '../../../data/enneagram';
import { detectTone, type ToneType } from '../tone_detector';
import type { UserEnneagramProfile } from '../types';

export function writeDeepeningFlow(
  userInput: string,
  profile: UserEnneagramProfile,
  tone?: ToneType
): string {
  const resolvedTone = tone ?? detectTone(userInput);
  const styleKey = profile.wing || profile.type;
  const style = getReplyStyleEntry(styleKey);

  const base = generateDeepeningResponse(userInput, resolvedTone);

  // 人格ニュアンス（framing を薄く）
  const nuance = style
    ? `少しだけ ${style.framing} 観点で整理してみるね。`
    : '';

  return nuance ? `${nuance}\n\n${base}` : base;
}

function generateDeepeningResponse(
  _userInput: string,
  tone: ToneType
): string {
  switch (tone) {
    case 'soft':
      return [
        `そっか、その部分がひっかかったんだね。話してくれてうれしいよ。`,
        `そういう違和感って、心のどこかが「ちょっと待って」と言ってる時に出やすいんだ。`,
        `その時、いちばん強く感じていた気持ちってどんな感じだった？`,
      ].join('\n');

    case 'voice':
      return [
        `そっか、そこが気になったんだね。話してくれてありがとう。`,
        `そういう感じって、心の奥がちょっと動いた時に出てくる自然な反応なんだよ。`,
        `その時いちばん強かった気持ち、どんな感じだった？`,
      ].join('\n');

    case 'calm':
    default:
      return [
        `なるほど、そこが気になったんだね。丁寧に話してくれてありがとう。`,
        `その反応は、自分の中で何か大事なポイントに触れた時に自然と出てくるものだよ。`,
        `その場面で、一番心に残っている気持ちはどれだった？`,
      ].join('\n');
  }
}
