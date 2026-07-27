/**
 * ① サイが使うプロンプト断片
 * - 診断誘導文
 * - 価値観対比表の生成指示
 */

/** 相手に診断を受けてもらうための自然な誘導文の生成指示 */
export function buildInvitePrompt(consultantType: string): string {
  return [
    '相談者が相手にエニアグラム診断を勧めるための、押しつけない自然な誘導文を提案してください。',
    `相談者のタイプ: ${consultantType}`,
    '目的は相手自身の自己理解を促し、大切にしているものの対比を明確にすることです。',
  ].join('\n');
}

/** 診断済みの場合の価値観対比表の生成指示 */
export function buildValuesComparisonPrompt(
  consultantType: string,
  otherType: string,
): string {
  return [
    '相談者と相手の価値観対比表を作成してください。',
    `相談者: ${consultantType}`,
    `相手: ${otherType}`,
    '含める項目: 大切にしているもの / ズレが摩擦になる点 / 補完し合える点',
  ].join('\n');
}
