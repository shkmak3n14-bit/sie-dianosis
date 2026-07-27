/**
 * ② エピソード照合ルール（骨格）
 * 行動パターン → タイプ手がかりのマッチングを置く。
 */

export type InferenceRuleHit = {
  typeId: string;
  /** ルールが拾った手がかりの強さ 0–1 */
  weight: number;
  reason: string;
};

/**
 * エピソード文字列からルールヒットを返す。
 * TODO: 辞書・行動パターンデータと接続する。
 */
export function matchInferenceRules(_episode: string): InferenceRuleHit[] {
  return [];
}
