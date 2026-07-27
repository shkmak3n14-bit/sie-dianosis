/**
 * 他者理解カード用モック
 * 後で runRelationshipDiagnosis の実出力に差し替え可能。
 */

import type { RelationshipInsightCardData } from '../../../core/templates/relationship_insight_card';

export const relationshipInsightMock: RelationshipInsightCardData = {
  consultantType: '9w8',
  otherType: '3',
  relation: '恋人',
  isOtherTypeInferred: true,
  inferenceConfidence: 'medium',
  type_summary: '成果・効率・評価を重視し、目標達成へ最適化して動くタイプです。',
  cognitive_gap: '9：平和 / 3：成果・効率 → 「平和 vs 成果」',
  friction_points: [
    '3のスピード感が、9には「圧」に感じられる',
    '9の受動性が、3には「やる気がない」と映る',
    '3の即断即決が、9の安定感を壊す',
  ].join('\n'),
  adjustment_tips: [
    '成果の目的を丁寧に共有する',
    '穏やかに伝える',
    '決断を先延ばしにしない',
  ].join('\n'),
  communication_safe: '結論を先に、短く明確に伝える',
  communication_avoid: '長い前置き、非効率な説明',
  communication_tip: '成果につながる理由を添えると動きが早くなる',
  relationship_direction: [
    'タイプ3の人は「平和 vs 成果」という認知の軸で世界を見ています。',
    'そのため、あなたとの関係では「3のスピード感が、9には「圧」に感じられる」などが起きやすくなります。',
    '',
    '関係を改善するには、まず「成果の目的を丁寧に共有する」を意識することが効果的です。',
    'コミュニケーションでは「結論を先に、短く明確に伝える」を使い、「長い前置き、非効率な説明」を避けると、相手が安心して話を受け取れるようになります。',
    '',
    'さらに、関係を前進させるコツは「成果につながる理由を添えると動きが早くなる」です。',
  ].join('\n'),
};
