/**
 * 相互理解カード用テンプレート（骨格）
 */

import type { MutualUnderstanding } from '../types/mutual_understanding';

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
  pairKey: string;
  summary?: string;
  sections: MutualInsightSection[];
};

export function buildMutualInsightSections(
  result: MutualUnderstanding,
): MutualInsightSection[] {
  return [
    {
      id: 'status_well',
      title: 'うまくいっている状態',
      bullets: result.status.good,
    },
    {
      id: 'status_not_well',
      title: 'うまくいっていない状態',
      bullets: result.status.bad,
    },
    {
      id: 'vicious_cycle',
      title: '悪循環の入口',
      bullets: [
        ...result.viciousCycle.triggers,
        ...result.viciousCycle.loop,
        ...result.viciousCycle.typePatterns,
      ],
    },
    {
      id: 'cognitive_gap',
      title: '認知のズレ（関係）',
      bullets: [
        ...result.cognitiveGap.selfGap.map((s) => `自分: ${s}`),
        ...result.cognitiveGap.otherGap.map((s) => `相手: ${s}`),
        ...result.cognitiveGap.interaction,
      ],
    },
    {
      id: 'virtuous_cycle',
      title: '好循環への道筋',
      bullets: [
        ...result.virtuousCycle.actions,
        ...result.virtuousCycle.adjustments,
        ...result.virtuousCycle.reassurance,
      ],
    },
    {
      id: 'respect',
      title: '相手を尊重する方法',
      bullets: [
        ...result.respect.forOther,
        ...result.respect.forSelf.map((s) => `自分: ${s}`),
      ],
    },
    {
      id: 'responsibility',
      title: '自分の問題 / 相手の問題',
      bullets: [
        ...result.responsibility.self.map((s) => `自分: ${s}`),
        ...result.responsibility.other.map((s) => `相手: ${s}`),
        ...result.responsibility.boundary.map((s) => `境界: ${s}`),
      ],
    },
    {
      id: 'defer',
      title: '棚上げポイント',
      bullets: [
        ...result.defer.reasons,
        ...result.defer.risks.map((s) => `リスク: ${s}`),
        ...result.defer.conditions.map((s) => `条件: ${s}`),
      ],
    },
    {
      id: 'communication',
      title: '伝え方の工夫',
      bullets: [
        ...result.communication.do,
        ...result.communication.avoid.map((s) => `避ける: ${s}`),
        ...result.communication.examples.map((s) => `例: ${s}`),
      ],
    },
  ];
}

export function toMutualInsightCard(
  result: MutualUnderstanding,
): MutualInsightCardData {
  return {
    pairKey: result.pairKey,
    summary: result.summary,
    sections: buildMutualInsightSections(result),
  };
}
