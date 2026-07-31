/**
 * ⑧ 伝え方の工夫エンジン
 * 自分のタイプ × 相手のタイプの伝え方
 */

import {
  getCommunicationPairEntry,
  type CommunicationPairEntry,
} from '../data/enneagram/communication_pair_dictionary';

export type CommunicationInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  context?: {
    relation?: string;
    episode?: string;
    situation?: string;
  };
};

export type CommunicationResult = {
  entry: CommunicationPairEntry | null;
  /** 効果的な伝え方 */
  tips: string[];
  /** 避けたい伝え方 */
  avoid: string[];
};

export type CommunicationEngine = {
  analyze(input: CommunicationInput): CommunicationResult;
};

export function createCommunicationEngine(): CommunicationEngine {
  return {
    analyze(input) {
      const entry = getCommunicationPairEntry(input.selfType, input.otherType);
      return {
        entry,
        tips: entry?.tips ?? [],
        avoid: entry?.avoid ?? [],
      };
    },
  };
}
