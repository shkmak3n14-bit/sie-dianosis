/**
 * エピソード → タイプ推論（UI ブリッジ）
 *
 * type-engine は質問診断（HTML）担当。
 * エピソード推論は other-understanding 仕様を、mobile/data（同期済み辞書）で実行する。
 * ウイング推論は core / type-engine の「考え方」（隣接のみ・強度0〜1・閾値）を移植。
 * core は直接 import しない（LAYERING）。
 */

import {
  getObservationTags,
  observationTags,
  scoreObservationTags,
} from '../data/enneagram';

export type InferenceConfidence = 'high' | 'medium' | 'low';

/** core / type-engine と同じ閾値帯（エピソード版ラベル） */
export type WingStrengthLabel = 'weak' | 'mid' | 'strong';

export type TypeScore = {
  type: string;
  score: number;
};

export type WingInferenceResult = {
  wing: number;
  wing_strength: number;
  wing_label: WingStrengthLabel;
};

/** RelationshipInsight に渡す推論結果 */
export type EpisodeInferenceResult = {
  /** 純タイプ 1〜9 */
  type: number;
  /** ウイング側のタイプ番号（例: 3w2 → 2） */
  wing: number | null;
  /** ウイング強度 0〜1 */
  wing_strength: number;
  /** weak / mid / strong */
  wing_label: WingStrengthLabel | null;
  /** メインタイプの相対スコア 0〜1 */
  score: number;
  confidence: InferenceConfidence;
  /** ヒットした特徴タグなど */
  reasons: string[];
  candidates: Array<{ type: number; score: number }>;
};

const TAGS_PER_TYPE = 5;

/** メインタイプ → 隣接ウイング候補（core と同じ） */
export const ADJACENT_TYPES: Record<number, [number, number]> = {
  1: [9, 2],
  2: [1, 3],
  3: [2, 4],
  4: [3, 5],
  5: [4, 6],
  6: [5, 7],
  7: [6, 8],
  8: [7, 9],
  9: [8, 1],
};

/** エピソードと特徴タグの一致で全タイプをスコアリング */
export function inferTypes(episode: string): TypeScore[] {
  const tagScores = scoreObservationTags(episode);
  const scores = Object.keys(observationTags).map((type) => ({
    type,
    score: tagScores[type] ?? 0,
  }));
  scores.sort((a, b) => b.score - a.score);
  return scores;
}

export function calcConfidence(scores: TypeScore[]): InferenceConfidence {
  if (scores.length === 0) return 'low';
  if (scores.length === 1) return scores[0].score > 0 ? 'medium' : 'low';

  const gap = scores[0].score - scores[1].score;
  if (gap >= 3) return 'high';
  if (gap >= 1) return 'medium';
  return 'low';
}

/**
 * 隣接タイプの特徴タグ一致数（正規化前）
 * score = ヒット数 / タグ数 → 0〜1
 */
export function calcWingStrength(
  episodeText: string,
  wingType: number | string,
): number {
  const tags = getObservationTags(String(wingType));
  if (tags.length === 0) return 0;

  const source = episodeText.toLowerCase();
  let hit = 0;
  for (const tag of tags) {
    if (source.includes(tag.toLowerCase())) {
      hit += 1;
    }
  }
  return hit / tags.length;
}

export function toWingStrengthLabel(strength: number): WingStrengthLabel {
  if (strength < 0.25) return 'weak';
  if (strength < 0.6) return 'mid';
  return 'strong';
}

/**
 * エピソード版ウイング推論
 * メインタイプ確定後、隣接タイプのみ評価 → 強度 0〜1 → weak/mid/strong
 */
export function inferWing(
  mainType: number | string,
  episodeText: string,
): WingInferenceResult | null {
  const main = Number(mainType);
  if (!Number.isInteger(main) || main < 1 || main > 9) return null;

  const candidates = ADJACENT_TYPES[main];
  if (!candidates) return null;

  let bestWing = candidates[0];
  let bestStrength = -1;

  for (const wing of candidates) {
    const strength = calcWingStrength(episodeText, wing);
    if (strength > bestStrength) {
      bestStrength = strength;
      bestWing = wing;
    }
  }

  const wing_strength = Math.min(1, Math.max(0, bestStrength < 0 ? 0 : bestStrength));

  return {
    wing: bestWing,
    wing_strength,
    wing_label: toWingStrengthLabel(wing_strength),
  };
}

function matchedTags(episode: string, typeId: string): string[] {
  const source = episode.toLowerCase();
  const tags = observationTags[typeId] ?? [];
  return tags.filter((tag) => source.includes(tag.toLowerCase()));
}

/**
 * EpisodeInput → RelationshipInsight 用の標準結果
 */
export function inferEpisodeType(episode: string): EpisodeInferenceResult {
  const scores = inferTypes(episode);
  const confidence = calcConfidence(scores);
  const top = scores[0];
  const typeNum = Number(top?.type ?? 9);
  const raw = top?.score ?? 0;
  const score = Math.min(1, Math.max(0, raw / TAGS_PER_TYPE));

  const wingResult = inferWing(typeNum, episode);

  const reasons = top
    ? matchedTags(episode, top.type)
    : ['エピソードから明確な特徴タグが検出できませんでした'];

  if (reasons.length === 0) {
    reasons.push('観察ポイントとの一致は弱いため、確度は参考値です');
  }

  if (wingResult) {
    reasons.push(
      `ウイング候補: ${typeNum}w${wingResult.wing}（強度 ${Math.round(wingResult.wing_strength * 100)}% / ${wingResult.wing_label}）`,
    );
  }

  return {
    type: typeNum,
    wing: wingResult?.wing ?? null,
    wing_strength: wingResult?.wing_strength ?? 0,
    wing_label: wingResult?.wing_label ?? null,
    score,
    confidence,
    reasons,
    candidates: scores.slice(0, 3).map((s) => ({
      type: Number(s.type),
      score: s.score,
    })),
  };
}

/** 表示用ウイングコード（例: 3w2）。弱い場合もコードは返す */
export function toWingCode(result: EpisodeInferenceResult): string {
  if (result.wing == null) return String(result.type);
  return `${result.type}w${result.wing}`;
}

const WING_LABEL_JA: Record<WingStrengthLabel, string> = {
  weak: '弱',
  mid: '中',
  strong: '強',
};

/** UI 表示用（例: 3w2・中） */
export function formatWingInference(result: EpisodeInferenceResult): string {
  const code = toWingCode(result);
  if (!result.wing_label) return code;
  return `${code}（ウイング${WING_LABEL_JA[result.wing_label]}）`;
}
