/**
 * UI 用相互理解カード型（core 非依存のコピー面）
 * 正本の型と揃える。辞書投入後に bridge が埋める。
 */

export type MutualInsightSection = {
  id:
    | 'status_well'
    | 'status_not_well'
    | 'vicious_cycle'
    | 'cognitive_gap'
    | 'virtuous_cycle'
    | 'respect'
    | 'responsibility'
    | 'defer'
    | 'communication';
  title: string;
  bullets: string[];
};

export type MutualInsightCardData = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
  sections: MutualInsightSection[];
};

const SECTION_META: Array<{
  id: MutualInsightSection['id'];
  title: string;
}> = [
  { id: 'status_well', title: 'うまくいっている状態' },
  { id: 'status_not_well', title: 'うまくいっていない状態' },
  { id: 'vicious_cycle', title: '悪循環の入口' },
  { id: 'cognitive_gap', title: '認知のズレ（関係）' },
  { id: 'virtuous_cycle', title: '好循環への道筋' },
  { id: 'respect', title: '相手を尊重する方法' },
  { id: 'responsibility', title: '自分の問題 / 相手の問題' },
  { id: 'defer', title: '棚上げポイント' },
  { id: 'communication', title: '伝え方の工夫' },
];

/** 辞書未投入時の空カード骨格 */
export function emptyMutualInsightCard(
  selfType: string,
  otherType: string,
  otherIsInferred?: boolean,
): MutualInsightCardData {
  return {
    selfType,
    otherType,
    otherIsInferred,
    sections: SECTION_META.map((m) => ({
      id: m.id,
      title: m.title,
      bullets: [],
    })),
  };
}
