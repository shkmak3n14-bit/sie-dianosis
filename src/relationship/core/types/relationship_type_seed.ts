/**
 * 相互理解変換用の単タイプ・シード（④）
 *
 * 下書き C欄 + 伝え方（B）に対応。
 * 単純配列結合の入力ではなく、変換ルールの材料。
 */

export interface RelationshipTypeSeed {
  /** 例: "9" / "2w1"（純タイプ運用時は "1"〜"9"） */
  code: string;
  label: string;
  /** 関係に持ち込む強みの軸 → status.good の材料 */
  strengthAxes: string[];
  /** 衝突しやすい軸 → status.bad の材料 */
  frictionAxes: string[];
  /** 悪循環の入口 → viciousCycle.triggers */
  viciousTriggers: string[];
  /** 認知→感情→行動のヒント → loop / typePatterns */
  viciousLoopHints: string[];
  /** このタイプ側のズレ → cognitiveGap.selfGap / otherGap */
  cognitiveGapSelf: string[];
  /** 求める尊重 → respect */
  respectNeeds: string[];
  /** 過剰適応 → responsibility */
  overAdaptation: string[];
  /** 境界の判断 → responsibility.boundary */
  boundaryHints: string[];
  /** 棚上げ話題 → defer */
  deferTopics: string[];
  deferRisks: string[];
  /** 安心・調整 → virtuousCycle */
  reassurance: string[];
  adjustments: string[];
  /** 伝え方 → communication（位置で do/avoid の主語が変わる） */
  communicationDo: string[];
  communicationAvoid: string[];
  communicationExamples: string[];
}
