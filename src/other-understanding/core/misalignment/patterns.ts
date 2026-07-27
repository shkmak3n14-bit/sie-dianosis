/**
 * ③ 認知ズレパターン照合
 * 実データは data/enneagram/misalignment_patterns_dictionary.ts
 */

import {
  misalignmentPatternsDictionary,
  type MisalignmentPattern,
} from '../data/enneagram/misalignment_patterns_dictionary';

export type { MisalignmentPattern };

function normalizeTypeKey(typeId: string): string {
  // 9w8 → 9 など、純タイプキーも拾えるようにする
  const wingMatch = typeId.match(/^([1-9])/);
  return wingMatch ? wingMatch[1] : typeId;
}

export function findMisalignmentPatterns(
  consultantType: string,
  otherType: string,
): MisalignmentPattern[] {
  const pairKey = `${consultantType}__${otherType}`;
  const reverseKey = `${otherType}__${consultantType}`;
  const a = normalizeTypeKey(consultantType);
  const b = normalizeTypeKey(otherType);
  const basePairKey = `${a}__${b}`;
  const baseReverseKey = `${b}__${a}`;

  return (
    misalignmentPatternsDictionary.byPair[pairKey] ??
    misalignmentPatternsDictionary.byPair[reverseKey] ??
    misalignmentPatternsDictionary.byPair[basePairKey] ??
    misalignmentPatternsDictionary.byPair[baseReverseKey] ??
    []
  );
}
