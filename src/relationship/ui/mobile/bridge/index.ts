/**
 * preview bridge（core 非 import）
 * mobile/data の辞書を読み、相互理解カードを組み立てる。
 */

import {
  emptyMutualInsightCard,
  type MutualInsightSection,
  type MutualInsightCardData,
} from '../templates/mutual_insight_card';
import {
  getCognitiveGapPairEntry,
  getCommunicationPairEntry,
  getDeferPointsEntry,
  getPairStatusEntry,
  getRespectPointsEntry,
  getResponsibilitySplitEntry,
  getVirtuousCycleEntry,
  getViciousCyclePattern,
} from '../data/enneagram';

export type BuildMutualInsightPreviewInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
};

export function buildMutualInsightPreview(
  input: BuildMutualInsightPreviewInput,
): MutualInsightCardData {
  const card = emptyMutualInsightCard(
    input.selfType,
    input.otherType,
    input.otherIsInferred,
  );

  const pairStatus = getPairStatusEntry(input.selfType, input.otherType);
  const viciousCycle = getViciousCyclePattern(input.selfType, input.otherType);
  const cognitiveGap = getCognitiveGapPairEntry(input.selfType, input.otherType);
  const virtuousCycle = getVirtuousCycleEntry(input.selfType, input.otherType);
  const respect = getRespectPointsEntry(input.selfType, input.otherType);
  const responsibility = getResponsibilitySplitEntry(
    input.selfType,
    input.otherType,
  );
  const deferPoints = getDeferPointsEntry(input.selfType, input.otherType);
  const communication = getCommunicationPairEntry(input.selfType, input.otherType);

  const byId = new Map<MutualInsightSection['id'], MutualInsightSection>(
    card.sections.map((section) => [section.id, section]),
  );

  const setBullets = (
    id: MutualInsightSection['id'],
    bullets: Array<string | null | undefined>,
  ) => {
    const target = byId.get(id);
    if (!target) return;
    target.bullets = bullets
      .map((b) => (typeof b === 'string' ? b.trim() : ''))
      .filter((b) => b.length > 0);
  };

  setBullets('status_well', pairStatus?.going_well ?? []);
  setBullets('status_not_well', pairStatus?.not_going_well ?? []);

  setBullets('vicious_cycle', [
    ...(viciousCycle?.pattern_name ? [`パターン: ${viciousCycle.pattern_name}`] : []),
    ...(viciousCycle?.entry_points ?? []).map((x) => `引き金: ${x}`),
    ...(viciousCycle?.cycle_description
      ? [`連鎖: ${viciousCycle.cycle_description}`]
      : []),
  ]);

  setBullets('cognitive_gap', [
    ...(cognitiveGap?.gaps ?? []).map((x) => `ズレ: ${x}`),
    ...(cognitiveGap?.interaction ? [`相互作用: ${cognitiveGap.interaction}`] : []),
  ]);

  setBullets('virtuous_cycle', [
    ...(virtuousCycle?.steps ?? []).map((x) => `ステップ: ${x}`),
    ...(virtuousCycle?.actions ?? []).map((x) => `行動: ${x}`),
  ]);

  setBullets('respect', [
    ...(respect?.points ?? []).map((x) => `尊重: ${x}`),
    ...(respect?.avoid ?? []).map((x) => `避ける: ${x}`),
  ]);

  setBullets('responsibility', [
    ...(responsibility?.self_side ?? []).map((x) => `自分側: ${x}`),
    ...(responsibility?.other_side ?? []).map((x) => `相手側: ${x}`),
    ...(responsibility?.shared ?? []).map((x) => `共有: ${x}`),
  ]);

  setBullets('defer', [
    ...(deferPoints?.defer_topics ?? []).map((x) => `棚上げ: ${x}`),
    ...(deferPoints?.decision_hints ?? []).map((x) => `判断ヒント: ${x}`),
  ]);

  setBullets('communication', [
    ...(communication?.tips ?? []).map((x) => `有効: ${x}`),
    ...(communication?.avoid ?? []).map((x) => `避ける: ${x}`),
  ]);

  return card;
}

export { emptyMutualInsightCard };
export type { MutualInsightCardData };
