/**
 * 他者理解モジュールの出力テンプレート（骨格）
 */

export type ValuesComparisonOutput = {
  consultantValues: string[];
  otherValues: string[];
  frictionPoints: string[];
  complementarity: string[];
};

export type InferenceOutput = {
  candidates: Array<{
    typeId: string;
    confidence: 'high' | 'medium' | 'low';
    reason: string;
  }>;
  observationPoints: string[];
  suggestedQuestions: string[];
};

export type MisalignmentOutput = {
  gaps: Array<{
    consultantLens: string;
    otherLens: string;
    scene: string;
  }>;
  bridgeHints: string[];
  deferHints: string[];
  boundaries: string[];
};

/** 対比表を読みやすいテキストに整形 */
export function formatValuesComparison(output: ValuesComparisonOutput): string {
  return [
    '【あなたが大切にしているもの】',
    ...output.consultantValues.map((v) => `- ${v}`),
    '',
    '【相手が大切にしているもの】',
    ...output.otherValues.map((v) => `- ${v}`),
    '',
    '【摩擦になりやすいズレ】',
    ...output.frictionPoints.map((v) => `- ${v}`),
    '',
    '【補完し合える点】',
    ...output.complementarity.map((v) => `- ${v}`),
  ].join('\n');
}

/** 推測結果の整形 */
export function formatInferenceOutput(output: InferenceOutput): string {
  const candidates = output.candidates
    .map((c) => `- ${c.typeId}（確度: ${c.confidence}）… ${c.reason}`)
    .join('\n');
  return [
    '【タイプ候補（推測）】',
    candidates || '- （候補なし）',
    '',
    '【精度を上げる観察ポイント】',
    ...output.observationPoints.map((v) => `- ${v}`),
    '',
    '【行動ベースの質問案】',
    ...output.suggestedQuestions.map((v) => `- ${v}`),
  ].join('\n');
}

/** 認知ズレ＋境界線の整形 */
export function formatMisalignmentOutput(output: MisalignmentOutput): string {
  const gaps = output.gaps
    .map(
      (g) =>
        `- 場面: ${g.scene}\n  あなた: ${g.consultantLens}\n  相手: ${g.otherLens}`,
    )
    .join('\n');
  return [
    '【認知のズレ】',
    gaps || '- （未定義）',
    '',
    '【ズレを埋めるヒント】',
    ...output.bridgeHints.map((v) => `- ${v}`),
    '',
    '【棚上げしてよい点】',
    ...output.deferHints.map((v) => `- ${v}`),
    '',
    '【境界線の提案】',
    ...output.boundaries.map((v) => `- ${v}`),
  ].join('\n');
}
