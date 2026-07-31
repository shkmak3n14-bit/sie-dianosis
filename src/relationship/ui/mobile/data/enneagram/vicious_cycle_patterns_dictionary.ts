/**
 * ② 悪循環パターン辞書（骨格）
 * 関係パターン（9×3、1×7、6×2 等）の入口
 */

import { toPairKey } from './pair_key';

export type ViciousCyclePatternEntry = {
  selfType: string;
  otherType: string;
  /** パターン名（任意） */
  pattern_name?: string;
  /** 悪循環の入口 */
  entry_points: string[];
  /** 悪循環の流れの説明 */
  cycle_description: string;
};

/** キー: "{self}x{other}" */
export const viciousCyclePatternsDictionary: Record<
  string,
  ViciousCyclePatternEntry
> = {
  // TODO(B/C): 関係パターン辞書を投入
};

export function getViciousCyclePattern(
  selfType: string,
  otherType: string,
): ViciousCyclePatternEntry | null {
  return (
    viciousCyclePatternsDictionary[toPairKey(selfType, otherType)] ?? null
  );
}
