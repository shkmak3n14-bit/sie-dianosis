/**
 * ② エピソードからタイプ推測エンジン
 */

import { rankCandidates } from './candidates';
import { matchInferenceRules } from './rules';
import type { InferenceConfidence, TypeCandidate } from './candidates';

export type EpisodeInput = {
  /** 相手の行動エピソード（相談者の記述） */
  episode: string;
  /** 関係性（任意）例: 上司・パートナー・友人 */
  relation?: string;
};

export type TypeInferenceResult = {
  candidates: TypeCandidate[];
  /** 全体としての確度 */
  confidence: InferenceConfidence;
  /** 推測であることの明示フラグ */
  isInferred: true;
};

export type TypeInferenceEngine = {
  infer(input: EpisodeInput): TypeInferenceResult;
};

export function createTypeInferenceEngine(): TypeInferenceEngine {
  return {
    infer(input) {
      const matched = matchInferenceRules(input.episode);
      const candidates = rankCandidates(matched);
      const top = candidates[0];
      return {
        candidates,
        confidence: top?.confidence ?? 'low',
        isInferred: true,
      };
    },
  };
}
