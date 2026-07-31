/**
 * ⑤ 相手を尊重する方法エンジン
 * 相手タイプに合わせた尊重ポイント
 */

import {
  getRespectPointsEntry,
  type RespectPointsEntry,
} from '../data/enneagram/respect_points_dictionary';

export type RespectInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  context?: {
    relation?: string;
    episode?: string;
    situation?: string;
  };
};

export type RespectResult = {
  entry: RespectPointsEntry | null;
  /** 尊重のポイント */
  points: string[];
  /** やってはいけないこと */
  avoid: string[];
};

export type RespectEngine = {
  analyze(input: RespectInput): RespectResult;
};

export function createRespectEngine(): RespectEngine {
  return {
    analyze(input) {
      const entry = getRespectPointsEntry(input.selfType, input.otherType);
      return {
        entry,
        points: entry?.points ?? [],
        avoid: entry?.avoid ?? [],
      };
    },
  };
}
