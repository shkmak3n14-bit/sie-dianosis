/**
 * 相互理解の実行入口（⑤ 正本優先）
 *
 * 1. pair_registry（81辞書）を正本として返す
 * 2. 無ければ buildRelationship で補助生成（開発・差分用）
 */

import type { MutualUnderstanding } from './types/mutual_understanding';
import { getPairEntry } from './data/enneagram/pair_registry';
import { normalizeType, toPairKey } from './data/enneagram/pair_key';
import { buildRelationshipFromCodes } from './convert/buildRelationship';
import { pairTemplate } from './data/enneagram/pair_template';

export type RunMutualUnderstandingOptions = {
  /**
   * 正本が無いとき補助生成する（デフォルト true）
   * false の場合は pairTemplate + pairKey のみ
   */
  allowBuildFallback?: boolean;
};

/**
 * @param pairKey 例: "9x3"
 */
export function runMutualUnderstanding(
  pairKey: string,
  options: RunMutualUnderstandingOptions = {},
): MutualUnderstanding {
  const { allowBuildFallback = true } = options;
  const normalized = normalizePairKey(pairKey);

  const canonical = getPairEntry(normalized);
  if (canonical) {
    return canonical;
  }

  if (allowBuildFallback) {
    const [selfCode, otherCode] = normalized.split('x');
    const built = buildRelationshipFromCodes(selfCode, otherCode);
    if (built) return built;
  }

  return {
    ...pairTemplate,
    pairKey: normalized,
  };
}

/**
 * 自分タイプ × 相手タイプから実行（正本優先）
 */
export function runMutualUnderstandingForTypes(
  selfType: string,
  otherType: string,
  options?: RunMutualUnderstandingOptions,
): MutualUnderstanding {
  return runMutualUnderstanding(toPairKey(selfType, otherType), options);
}

function normalizePairKey(pairKey: string): string {
  const parts = String(pairKey).toLowerCase().split(/x/i);
  if (parts.length !== 2) {
    return pairKey;
  }
  return `${normalizeType(parts[0])}x${normalizeType(parts[1])}`;
}
