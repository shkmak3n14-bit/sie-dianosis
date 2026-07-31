/**
 * ⑦ 棚上げポイント辞書（骨格）
 * 触れないほうがいい領域
 */

import { toPairKey } from './pair_key';

export type DeferPointsEntry = {
  selfType: string;
  otherType: string;
  /** 今は触れないほうがいい領域 */
  defer_topics: string[];
  /** 棚上げの判断ヒント */
  decision_hints: string[];
};

/** キー: "{self}x{other}" */
export const deferPointsDictionary: Record<string, DeferPointsEntry> = {
  // TODO(B/C): 棚上げ領域を投入
};

export function getDeferPointsEntry(
  selfType: string,
  otherType: string,
): DeferPointsEntry | null {
  return deferPointsDictionary[toPairKey(selfType, otherType)] ?? null;
}
