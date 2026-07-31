/**
 * ② 悪循環の入口エンジン
 * 関係パターン（例: 9×3、1×7、6×2）の入口を返す
 */

import {
  getViciousCyclePattern,
  type ViciousCyclePatternEntry,
} from '../data/enneagram/vicious_cycle_patterns_dictionary';

export type ViciousCycleInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  context?: {
    relation?: string;
    episode?: string;
    situation?: string;
  };
};

export type ViciousCycleResult = {
  entry: ViciousCyclePatternEntry | null;
  /** 悪循環の入口（現状把握） */
  entryPoints: string[];
  /** 典型的な悪循環の流れ */
  cycleDescription: string;
};

export type ViciousCycleEngine = {
  analyze(input: ViciousCycleInput): ViciousCycleResult;
};

export function createViciousCycleEngine(): ViciousCycleEngine {
  return {
    analyze(input) {
      const entry = getViciousCyclePattern(input.selfType, input.otherType);
      return {
        entry,
        entryPoints: entry?.entry_points ?? [],
        cycleDescription: entry?.cycle_description ?? '',
      };
    },
  };
}
