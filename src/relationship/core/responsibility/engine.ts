/**
 * ⑥ 責務分離エンジン
 * 自分の問題か相手の問題かの切り分け
 */

import {
  getResponsibilitySplitEntry,
  type ResponsibilitySplitEntry,
} from '../data/enneagram/responsibility_split_dictionary';

export type ResponsibilityInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  context?: {
    relation?: string;
    episode?: string;
    situation?: string;
  };
};

export type ResponsibilityResult = {
  entry: ResponsibilitySplitEntry | null;
  /** 自分側で引き受けること */
  selfSide: string[];
  /** 相手側に属すること */
  otherSide: string[];
  /** 共有領域 */
  shared: string[];
};

export type ResponsibilityEngine = {
  analyze(input: ResponsibilityInput): ResponsibilityResult;
};

export function createResponsibilityEngine(): ResponsibilityEngine {
  return {
    analyze(input) {
      const entry = getResponsibilitySplitEntry(
        input.selfType,
        input.otherType,
      );
      return {
        entry,
        selfSide: entry?.self_side ?? [],
        otherSide: entry?.other_side ?? [],
        shared: entry?.shared ?? [],
      };
    },
  };
}
