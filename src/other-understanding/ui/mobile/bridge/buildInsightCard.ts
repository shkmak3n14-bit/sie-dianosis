/**
 * 推論結果 + mobile/data 辞書 → 他者理解カードデータ
 */

import {
  communicationStyles,
  misalignmentPatterns,
  typeSummary,
} from '../data/enneagram';
import type { RelationshipInsightCardData } from '../templates/relationship_insight_card';
import {
  toWingCode,
  type EpisodeInferenceResult,
} from './inferTypes';

const DEFAULT_CONSULTANT = '9';

export function buildInsightCardFromInference(input: {
  result: EpisodeInferenceResult;
  episode: string;
  relation?: string;
  consultantType?: string;
}): RelationshipInsightCardData {
  const consultantBase = (input.consultantType ?? DEFAULT_CONSULTANT).charAt(0);
  const otherType = String(input.result.type);
  const otherWing = toWingCode(input.result);
  const pair = misalignmentPatterns[consultantBase]?.[otherType];
  const comm = communicationStyles[otherType];
  const tipFirst = (pair?.adjustment_tips ?? '').split('\n').filter(Boolean)[0] ?? '';

  return {
    consultantType: input.consultantType ?? DEFAULT_CONSULTANT,
    otherType: otherWing,
    relation: input.relation,
    isOtherTypeInferred: true,
    inferenceConfidence: input.result.confidence,
    wingStrength: input.result.wing_strength,
    wingLabel: input.result.wing_label ?? undefined,
    type_summary: typeSummary[otherType] ?? '',
    cognitive_gap: pair?.cognitive_gap ?? '',
    friction_points: pair?.friction_points ?? '',
    adjustment_tips: pair?.adjustment_tips ?? '',
    communication_safe: comm?.safe ?? '',
    communication_avoid: comm?.avoid ?? '',
    communication_tip: comm?.tip ?? '',
    relationship_direction: [
      `タイプ${otherWing}の人は「${pair?.cognitive_gap || '認知のズレ'}」という軸で世界を見ています。`,
      input.episode.trim()
        ? `今回のエピソード（「${truncate(input.episode, 40)}」）からも、その傾向がうかがえます。`
        : '',
      'そのため、あなたとの関係では摩擦が起きやすくなります。',
      '',
      tipFirst
        ? `関係を改善するには、まず「${tipFirst}」を意識することが効果的です。`
        : '関係を改善するには、相手の動機を尊重した短い伝え方が効果的です。',
      `コミュニケーションでは「${comm?.safe ?? ''}」を使い、「${comm?.avoid ?? ''}」を避けると、相手が安心して話を受け取れるようになります。`,
      '',
      `さらに、関係を前進させるコツは「${comm?.tip ?? ''}」です。`,
      '',
      `※推測根拠: ${input.result.reasons.join(' / ') || '特徴タグの一致'}（確度: ${input.result.confidence}）`,
      input.result.wing != null
        ? `※ウイング: ${otherWing}（強度 ${Math.round((input.result.wing_strength ?? 0) * 100)}% / ${input.result.wing_label ?? '—'}）`
        : '',
    ]
      .filter((line) => line !== undefined && line !== '')
      .join('\n'),
  };
}

function truncate(text: string, max: number): string {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}
