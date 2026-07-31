/**
 * ① 関係の現状辞書（骨格）
 * 自分タイプ × 相手タイプ → うまくいっている／いない状態
 */

import { toPairKey } from './pair_key';

export type PairStatusEntry = {
  selfType: string;
  otherType: string;
  /** うまくいっている状態 */
  going_well: string[];
  /** うまくいっていない状態 */
  not_going_well: string[];
};

/** キー: "{self}x{other}" 例: "9x3" */
export const pairStatusDictionary: Record<string, PairStatusEntry> = {
  // TODO(B/C): タイプ×タイプの中身を投入
};

export function getPairStatusEntry(
  selfType: string,
  otherType: string,
): PairStatusEntry | null {
  return pairStatusDictionary[toPairKey(selfType, otherType)] ?? null;
}
