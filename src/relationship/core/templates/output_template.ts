/**
 * 相互理解のテキスト整形（骨格）
 */

import type { MutualUnderstanding } from '../types/mutual_understanding';

export function formatMutualUnderstandingOutput(
  result: MutualUnderstanding,
): string {
  const lines: string[] = [
    '【相互理解】自分 × 相手の関係',
    `pairKey: ${result.pairKey}`,
    result.summary ? `summary: ${result.summary}` : '',
    '',
    '① うまくいっている状態',
    ...result.status.good.map((s) => `・${s}`),
    '',
    '① うまくいっていない状態',
    ...result.status.bad.map((s) => `・${s}`),
    result.status.summary ? `・${result.status.summary}` : '',
    '',
    '② 悪循環の入口',
    ...result.viciousCycle.triggers.map((s) => `・${s}`),
    ...result.viciousCycle.loop.map((s) => `・${s}`),
    ...result.viciousCycle.typePatterns.map((s) => `・${s}`),
    '',
    '③ 認知のズレ（関係版）',
    ...result.cognitiveGap.selfGap.map((s) => `・自分: ${s}`),
    ...result.cognitiveGap.otherGap.map((s) => `・相手: ${s}`),
    ...result.cognitiveGap.interaction.map((s) => `・${s}`),
    '',
    '④ 好循環への道筋',
    ...result.virtuousCycle.actions.map((s) => `・${s}`),
    ...result.virtuousCycle.adjustments.map((s) => `・${s}`),
    ...result.virtuousCycle.reassurance.map((s) => `・${s}`),
    '',
    '⑤ 相手を尊重する方法',
    ...result.respect.forOther.map((s) => `・${s}`),
    ...result.respect.forSelf.map((s) => `・自分: ${s}`),
    '',
    '⑥ 自分の問題 / 相手の問題',
    '［自分］',
    ...result.responsibility.self.map((s) => `・${s}`),
    '［相手］',
    ...result.responsibility.other.map((s) => `・${s}`),
    '［境界］',
    ...result.responsibility.boundary.map((s) => `・${s}`),
    '',
    '⑦ 棚上げポイント',
    ...result.defer.reasons.map((s) => `・${s}`),
    ...result.defer.risks.map((s) => `・リスク: ${s}`),
    ...result.defer.conditions.map((s) => `・条件: ${s}`),
    '',
    '⑧ 伝え方の工夫',
    ...result.communication.do.map((s) => `・${s}`),
    ...result.communication.avoid.map((s) => `・避ける: ${s}`),
    ...result.communication.examples.map((s) => `・例: ${s}`),
  ];

  return lines.filter((l) => l !== '').join('\n').trim();
}
