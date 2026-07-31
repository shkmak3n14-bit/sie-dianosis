/**
 * ① 関係の現状エンジン
 * うまくいっている状態 / うまくいっていない状態
 */

import {
  getPairStatusEntry,
  type PairStatusEntry,
} from '../data/enneagram/pair_status_dictionary';

export type StatusInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  context?: {
    relation?: string;
    episode?: string;
    situation?: string;
  };
};

export type StatusResult = {
  entry: PairStatusEntry | null;
  /** うまくいっている状態 */
  goingWell: string[];
  /** うまくいっていない状態 */
  notGoingWell: string[];
};

export type StatusEngine = {
  analyze(input: StatusInput): StatusResult;
};

export function createStatusEngine(): StatusEngine {
  return {
    analyze(input) {
      const entry = getPairStatusEntry(input.selfType, input.otherType);
      return {
        entry,
        goingWell: entry?.going_well ?? [],
        notGoingWell: entry?.not_going_well ?? [],
      };
    },
  };
}
