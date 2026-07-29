/**
 * ② エピソードからタイプ推測エンジン（仮ロジック・最小構成）
 *
 * 流れ:
 * 1. observationPoints（3軸）を読む
 * 2. エピソードを行動／感情／認知にマッピング
 * 3. 各タイプとのキーワード一致度 + observationTags 一致を計算
 * 4. スコア順に並べる
 * 5. スコア差で確度（高・中・低）を決める
 */

import {
  calcConfidence,
  inferTypes,
  toCandidates,
  type InferenceConfidence,
  type TypeCandidate,
  type TypeScore,
} from './candidates';

export type { InferenceConfidence, TypeCandidate, TypeScore };

export type EpisodeInput = {
  /** 相手の行動エピソード（相談者の記述） */
  episode: string;
  /** 関係性（任意）例: 上司・パートナー・友人 */
  relation?: string;
};

export type TypeInferenceResult = {
  /** 上位候補（最大3） */
  candidates: TypeCandidate[];
  /** 全体としての確度 */
  confidence: InferenceConfidence;
  /** 推測であることの明示フラグ */
  isInferred: true;
  /** 推測根拠の一文 */
  reason: string;
};

export type TypeInferenceEngine = {
  infer(input: EpisodeInput): TypeInferenceResult;
};

const DEFAULT_REASON =
  '観察ポイントと特徴タグとの一致度に基づく仮推測です';

/** 他者理解モジュールの標準入口（エピソード文字列） */
export function typeInferenceEngine(episode: string): TypeInferenceResult {
  const scores = inferTypes(episode);
  const confidence = calcConfidence(scores);

  return {
    candidates: toCandidates(scores, confidence, 3),
    confidence,
    isInferred: true,
    reason: DEFAULT_REASON,
  };
}

export function createTypeInferenceEngine(): TypeInferenceEngine {
  return {
    infer(input) {
      return typeInferenceEngine(input.episode);
    },
  };
}
