/**
 * 他者理解カード用モック
 * mobile/data（core/data のコピー）から組み立てる。
 * エンジン結果は将来アプリ側ブリッジ経由で流し込む。
 */

import {
  communicationStyles,
  misalignmentPatterns,
  typeSummary,
} from '../data/enneagram';
import type { RelationshipInsightCardData } from '../templates/relationship_insight_card';

const CONSULTANT = '9';
const OTHER = '3';
const pair = misalignmentPatterns[CONSULTANT]?.[OTHER];
const comm = communicationStyles[OTHER];

export const relationshipInsightMock: RelationshipInsightCardData = {
  consultantType: '9w8',
  otherType: OTHER,
  relation: '恋人',
  isOtherTypeInferred: true,
  inferenceConfidence: 'medium',
  type_summary: typeSummary[OTHER] ?? '',
  cognitive_gap: pair?.cognitive_gap ?? '',
  friction_points: pair?.friction_points ?? '',
  adjustment_tips: pair?.adjustment_tips ?? '',
  communication_safe: comm?.safe ?? '',
  communication_avoid: comm?.avoid ?? '',
  communication_tip: comm?.tip ?? '',
  relationship_direction: [
    `タイプ${OTHER}の人は「${pair?.cognitive_gap ?? '認知のズレ'}」という軸で世界を見ています。`,
    'そのため、あなたとの関係では摩擦が起きやすくなります。',
    '',
    `関係を改善するには、まず「${(pair?.adjustment_tips ?? '').split('\n')[0] ?? ''}」を意識することが効果的です。`,
    `コミュニケーションでは「${comm?.safe ?? ''}」を使い、「${comm?.avoid ?? ''}」を避けると、相手が安心して話を受け取れるようになります。`,
    '',
    `さらに、関係を前進させるコツは「${comm?.tip ?? ''}」です。`,
  ].join('\n'),
};
