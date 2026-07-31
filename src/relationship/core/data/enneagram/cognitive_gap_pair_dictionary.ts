/**
 * ③ 認知のズレ（関係版）辞書（骨格）
 * 自分のズレ × 相手のズレの相互作用
 */

import { toPairKey } from './pair_key';

export type CognitiveGapPairEntry = {
  selfType: string;
  otherType: string;
  /** 関係上の認知ズレ */
  gaps: string[];
  /** 相互作用の説明 */
  interaction: string;
};

/** キー: "{self}x{other}" */
export const cognitiveGapPairDictionary: Record<
  string,
  CognitiveGapPairEntry
> = {
  // TODO(B/C): ズレ×ズレの相互作用を投入
};

export function getCognitiveGapPairEntry(
  selfType: string,
  otherType: string,
): CognitiveGapPairEntry | null {
  return cognitiveGapPairDictionary[toPairKey(selfType, otherType)] ?? null;
}
