/**
 * ⑦ 棚上げポイントエンジン
 * 触れないほうがいい領域
 */

import {
  getDeferPointsEntry,
  type DeferPointsEntry,
} from '../data/enneagram/defer_points_dictionary';

export type DeferInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  context?: {
    relation?: string;
    episode?: string;
    situation?: string;
  };
};

export type DeferResult = {
  entry: DeferPointsEntry | null;
  /** 今は触れないほうがいい領域 */
  deferTopics: string[];
  /** 棚上げの判断ヒント */
  decisionHints: string[];
};

export type DeferEngine = {
  analyze(input: DeferInput): DeferResult;
};

export function createDeferEngine(): DeferEngine {
  return {
    analyze(input) {
      const entry = getDeferPointsEntry(input.selfType, input.otherType);
      return {
        entry,
        deferTopics: entry?.defer_topics ?? [],
        decisionHints: entry?.decision_hints ?? [],
      };
    },
  };
}
