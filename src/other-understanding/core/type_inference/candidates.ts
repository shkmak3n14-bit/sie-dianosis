/**
 * ② 候補タイプの並べ替え・確度（仮ロジック）
 */

import { observationPoints } from '../data/enneagram/observation_points_dictionary';
import {
  calcCombinedMatchScore,
  mapEpisodeToAxes,
  type EpisodeAxes,
} from './rules';

export type InferenceConfidence = 'high' | 'medium' | 'low';

export type TypeScore = {
  type: string;
  score: number;
};

export type TypeCandidate = {
  typeId: string;
  score: number;
  confidence: InferenceConfidence;
  reason: string;
};

const CANDIDATE_REASON =
  '観察ポイントと特徴タグとの一致度に基づく仮推測です';

/** 全タイプのスコアを計算して高い順に並べる（観察ポイント + observationTags） */
export function inferTypes(episode: string): TypeScore[] {
  const axes: EpisodeAxes = mapEpisodeToAxes(episode);

  const scores = Object.entries(observationPoints).map(([type, obs]) => ({
    type,
    score: calcCombinedMatchScore(episode, axes, type, obs),
  }));

  scores.sort((a, b) => b.score - a.score);
  return scores;
}

/**
 * 確度はトップと2位のスコア差で決める（仮）
 * - 差 >= 3 → high
 * - 差 >= 1 → medium
 * - それ以外 → low
 */
export function calcConfidence(scores: TypeScore[]): InferenceConfidence {
  if (scores.length === 0) return 'low';
  if (scores.length === 1) return scores[0].score > 0 ? 'medium' : 'low';

  const top = scores[0].score;
  const second = scores[1].score;
  const gap = top - second;

  if (gap >= 3) return 'high';
  if (gap >= 1) return 'medium';
  return 'low';
}

/** TypeScore[] を TypeCandidate[] に整形（上位 N） */
export function toCandidates(
  scores: TypeScore[],
  confidence: InferenceConfidence,
  limit = 3,
): TypeCandidate[] {
  return scores.slice(0, limit).map((s) => ({
    typeId: s.type,
    score: s.score,
    confidence,
    reason: CANDIDATE_REASON,
  }));
}
