/**
 * ② 観察ポイント → 特徴タグ（inference-ready）
 * 自然文から特徴を抽出しやすくするためのタグ化辞書。
 * type_inference のキーワード照合などに利用する。
 */

export type ObservationTagsMap = Record<string, string[]>;

/** 純タイプ 1〜9 の特徴タグ（最終版） */
export const observationTags: ObservationTagsMap = {
  '1': ['正しさ', '倫理', '一貫性', 'ルール違反', '厳しい指摘'],
  '2': ['助ける', '気遣い', '献身', '感謝されたい', '人間関係'],
  '3': ['効率', '成果', '最適化', '評価', 'スピード感'],
  '4': ['感情の深さ', '孤独', '本物らしさ', '独自性', '気分の波'],
  '5': ['距離を取る', '分析', '情報収集', '合理性', '静か'],
  '6': ['不安', '慎重', '確認行動', '安全', '信頼'],
  '7': ['楽しさ', '可能性', '刺激', '予定変更', '楽観'],
  '8': ['率直', '強さ', '主導権', '境界線', '衝突'],
  '9': ['平和', '調和', '受動性', '曖昧さ', '衝突回避'],
};

/** タイプコードからタグ一覧（wing は核タイプにフォールバック） */
export function getObservationTags(typeId: string): string[] {
  const normalized = typeId.trim();
  if (observationTags[normalized]) {
    return observationTags[normalized];
  }
  const base = normalized.charAt(0);
  return observationTags[base] ?? [];
}

/** テキスト内に出現したタグをタイプ別にスコアリング */
export function scoreObservationTags(text: string): Record<string, number> {
  const source = text.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [typeId, tags] of Object.entries(observationTags)) {
    let score = 0;
    for (const tag of tags) {
      if (source.includes(tag.toLowerCase())) {
        score += 1;
      }
    }
    scores[typeId] = score;
  }

  return scores;
}
