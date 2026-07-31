/**
 * ③ 認知のズレ（関係版）エンジン
 * 自分のズレ × 相手のズレの相互作用
 */

import {
  getCognitiveGapPairEntry,
  type CognitiveGapPairEntry,
} from '../data/enneagram/cognitive_gap_pair_dictionary';

export type CognitiveGapInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  context?: {
    relation?: string;
    episode?: string;
    situation?: string;
  };
};

export type CognitiveGapResult = {
  entry: CognitiveGapPairEntry | null;
  /** 関係上の認知ズレ */
  gaps: string[];
  /** 相互作用の説明 */
  interaction: string;
};

export type CognitiveGapEngine = {
  analyze(input: CognitiveGapInput): CognitiveGapResult;
};

export function createCognitiveGapEngine(): CognitiveGapEngine {
  return {
    analyze(input) {
      const entry = getCognitiveGapPairEntry(input.selfType, input.otherType);
      return {
        entry,
        gaps: entry?.gaps ?? [],
        interaction: entry?.interaction ?? '',
      };
    },
  };
}
