/**
 * ② タイプ候補の整形・確度
 */

import type { InferenceRuleHit } from './rules';

export type InferenceConfidence = 'high' | 'medium' | 'low';

export type TypeCandidate = {
  typeId: string;
  confidence: InferenceConfidence;
  reason: string;
  score: number;
};

function toConfidence(score: number): InferenceConfidence {
  if (score >= 0.7) return 'high';
  if (score >= 0.4) return 'medium';
  return 'low';
}

/** ルールヒットを候補リストにまとめる */
export function rankCandidates(hits: InferenceRuleHit[]): TypeCandidate[] {
  if (hits.length === 0) return [];

  const byType = new Map<string, InferenceRuleHit[]>();
  for (const hit of hits) {
    const list = byType.get(hit.typeId) ?? [];
    list.push(hit);
    byType.set(hit.typeId, list);
  }

  const candidates: TypeCandidate[] = [];
  for (const [typeId, list] of byType) {
    const score = Math.min(
      1,
      list.reduce((sum, h) => sum + h.weight, 0) / list.length,
    );
    candidates.push({
      typeId,
      score,
      confidence: toConfidence(score),
      reason: list.map((h) => h.reason).join(' / '),
    });
  }

  return candidates.sort((a, b) => b.score - a.score);
}
