/**
 * ② エピソード → 3軸マッピング ＋ キーワード一致（仮ロジック）
 * 観察ポイント文との類似度に加え、observationTags による特徴タグ照合を行う。
 */

import type { TypeObservationAxes } from '../data/enneagram/observation_points_dictionary';
import { getObservationTags } from '../data/enneagram/observation_tags_dictionary';

/** エピソードを3軸テキストに分解した結果 */
export type EpisodeAxes = {
  behavior: string;
  emotion: string;
  cognition: string;
};

/** 軸判定用のキーワード（最小） */
const BEHAVIOR_KEYWORDS = [
  '行動',
  '反応',
  '動く',
  '優先',
  '助ける',
  'チェック',
  '距離',
  '主導',
  '合わせ',
  '避ける',
  '最適化',
  '効率',
  'ルール',
  '不正',
  '表現',
  '情報',
  '分析',
  '体験',
  '刺激',
  '率直',
];

const EMOTION_KEYWORDS = [
  '感情',
  '怒り',
  '寂し',
  '不満',
  '焦り',
  '孤独',
  '喪失',
  '不安',
  '慎重',
  '警戒',
  '楽観',
  'ネガティブ',
  '抑圧',
  '感謝',
];

const COGNITION_KEYWORDS = [
  '判断',
  '基準',
  '正しさ',
  '倫理',
  '一貫',
  '成果',
  '評価',
  '成功',
  '自分らしさ',
  '本物',
  '理解',
  '知識',
  '合理',
  '安全',
  '信頼',
  '予測',
  '可能性',
  '楽しさ',
  '選択肢',
  '強さ',
  '自立',
  '調和',
  '平和',
  '安定',
  '決定',
];

/** テキストを比較用トークンに分解（2文字以上） */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s、。．，,.\n\r\t「」『』（）()・／/：:！!？?]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);
}

/** キーワード一致数（仮の類似度） */
export function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  const source = a.toLowerCase();
  const tokens = tokenize(b);
  let score = 0;
  for (const token of tokens) {
    if (source.includes(token)) score += 1;
  }
  return score;
}

function extractByKeywords(episode: string, keywords: string[]): string {
  const hits = keywords.filter((k) => episode.includes(k));
  // 軸に近い語句がなければ全文を返し、タイプ観察文との照合に回す
  return hits.length > 0 ? hits.join(' ') : episode;
}

export function scoreBehavior(episode: string): string {
  return extractByKeywords(episode, BEHAVIOR_KEYWORDS);
}

export function scoreEmotion(episode: string): string {
  return extractByKeywords(episode, EMOTION_KEYWORDS);
}

export function scoreCognition(episode: string): string {
  return extractByKeywords(episode, COGNITION_KEYWORDS);
}

/** エピソードを行動・感情・認知の3軸にマッピング */
export function mapEpisodeToAxes(episode: string): EpisodeAxes {
  return {
    behavior: scoreBehavior(episode),
    emotion: scoreEmotion(episode),
    cognition: scoreCognition(episode),
  };
}

/** エピソード3軸とタイプ観察ポイントの一致度 */
export function calcMatchScore(
  episodeAxes: EpisodeAxes,
  typeObservation: TypeObservationAxes,
): number {
  let score = 0;
  score += similarity(episodeAxes.behavior, typeObservation.behavior);
  score += similarity(episodeAxes.emotion, typeObservation.emotion);
  score += similarity(episodeAxes.cognition, typeObservation.cognition);
  return score;
}

/**
 * エピソードと特徴タグ（observationTags）の一致数
 * 自然文にタグ語が含まれるほどそのタイプのスコアが上がる。
 */
export function calcTagMatchScore(episode: string, typeId: string): number {
  const tags = getObservationTags(typeId);
  if (!episode || tags.length === 0) return 0;

  const source = episode.toLowerCase();
  let score = 0;
  for (const tag of tags) {
    if (source.includes(tag.toLowerCase())) {
      score += 1;
    }
  }
  return score;
}

/**
 * 観察ポイント一致 + 特徴タグ一致の合計スコア
 */
export function calcCombinedMatchScore(
  episode: string,
  episodeAxes: EpisodeAxes,
  typeId: string,
  typeObservation: TypeObservationAxes,
): number {
  return (
    calcMatchScore(episodeAxes, typeObservation) +
    calcTagMatchScore(episode, typeId)
  );
}
