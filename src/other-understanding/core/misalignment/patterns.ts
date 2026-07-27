/**
 * ③ 認知ズレパターン照合
 * 実データは data/enneagram/misalignment_patterns_dictionary.ts
 */

import {
  misalignmentPatterns,
  type MisalignmentPatternEntry,
} from '../data/enneagram/misalignment_patterns_dictionary';

export type { MisalignmentPatternEntry };
/** @deprecated MisalignmentPatternEntry を使う */
export type MisalignmentPattern = MisalignmentPatternEntry;

function normalizeTypeKey(typeId: string): string {
  // 9w8 → 9 など、純タイプキーも拾えるようにする
  const wingMatch = typeId.match(/^([1-9])/);
  return wingMatch ? wingMatch[1] : typeId;
}

/**
 * 相談者タイプ × 相手タイプのズレエントリを1件返す。
 * 未記入（空文字のみ）の場合は null。
 */
export function findMisalignmentPattern(
  consultantType: string,
  otherType: string,
): MisalignmentPatternEntry | null {
  const a = normalizeTypeKey(consultantType);
  const b = normalizeTypeKey(otherType);
  const entry = misalignmentPatterns[a]?.[b];
  if (!entry) return null;
  if (
    !entry.cognitive_gap &&
    !entry.friction_points &&
    !entry.adjustment_tips
  ) {
    return null;
  }
  return entry;
}

/** 配列形で返す（engine 互換） */
export function findMisalignmentPatterns(
  consultantType: string,
  otherType: string,
): MisalignmentPatternEntry[] {
  const entry = findMisalignmentPattern(consultantType, otherType);
  return entry ? [entry] : [];
}
