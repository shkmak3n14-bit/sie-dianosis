/**
 * ④ 好循環への道筋エンジン
 * 関係改善の行動パターン
 */

import {
  getVirtuousCycleEntry,
  type VirtuousCycleEntry,
} from '../data/enneagram/virtuous_cycle_dictionary';

export type VirtuousCycleInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  context?: {
    relation?: string;
    episode?: string;
    situation?: string;
  };
};

export type VirtuousCycleResult = {
  entry: VirtuousCycleEntry | null;
  /** 好循環へのステップ */
  steps: string[];
  /** 関係改善の行動パターン */
  actions: string[];
};

export type VirtuousCycleEngine = {
  analyze(input: VirtuousCycleInput): VirtuousCycleResult;
};

export function createVirtuousCycleEngine(): VirtuousCycleEngine {
  return {
    analyze(input) {
      const entry = getVirtuousCycleEntry(input.selfType, input.otherType);
      return {
        entry,
        steps: entry?.steps ?? [],
        actions: entry?.actions ?? [],
      };
    },
  };
}
