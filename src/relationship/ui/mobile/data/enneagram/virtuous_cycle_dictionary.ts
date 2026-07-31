/**
 * ④ 好循環への道筋辞書（骨格）
 */

import { toPairKey } from './pair_key';

export type VirtuousCycleEntry = {
  selfType: string;
  otherType: string;
  /** 好循環へのステップ */
  steps: string[];
  /** 関係改善の行動パターン */
  actions: string[];
};

/** キー: "{self}x{other}" */
export const virtuousCycleDictionary: Record<string, VirtuousCycleEntry> = {
  // TODO(B/C): 好循環パターンを投入
};

export function getVirtuousCycleEntry(
  selfType: string,
  otherType: string,
): VirtuousCycleEntry | null {
  return virtuousCycleDictionary[toPairKey(selfType, otherType)] ?? null;
}
