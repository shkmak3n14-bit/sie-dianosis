/**
 * ⑥ 責務分離辞書（骨格）
 * 自分の問題 / 相手の問題 / 共有領域
 */

import { toPairKey } from './pair_key';

export type ResponsibilitySplitEntry = {
  selfType: string;
  otherType: string;
  /** 自分側で引き受けること */
  self_side: string[];
  /** 相手側に属すること */
  other_side: string[];
  /** 共有領域 */
  shared: string[];
};

/** キー: "{self}x{other}" */
export const responsibilitySplitDictionary: Record<
  string,
  ResponsibilitySplitEntry
> = {
  // TODO(B/C): 責務分離ロジック用の辞書を投入
};

export function getResponsibilitySplitEntry(
  selfType: string,
  otherType: string,
): ResponsibilitySplitEntry | null {
  return (
    responsibilitySplitDictionary[toPairKey(selfType, otherType)] ?? null
  );
}
