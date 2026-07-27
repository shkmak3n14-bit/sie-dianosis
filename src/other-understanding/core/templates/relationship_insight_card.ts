/**
 * 他者理解カード（Relationship Insight Card）
 * relationship_adjustment_engine / runRelationshipDiagnosis の出力を
 * UI にそのまま流し込むための型と整形。
 */

import type { RelationshipDiagnosisResult } from '../run_relationship_diagnosis';
import type { RelationshipAdjustmentResult } from '../relationship_adjustment/engine';

/** UIカード：8項目＋タイプ情報 */
export type RelationshipInsightCardData = {
  consultantType: string;
  otherType: string;
  type_summary: string;
  cognitive_gap: string;
  friction_points: string;
  adjustment_tips: string;
  communication_safe: string;
  communication_avoid: string;
  communication_tip: string;
  relationship_direction: string;
  /** 任意：関係性タグ（親子・恋人など） */
  relation?: string;
  /** 任意：推測であることの表示用 */
  isOtherTypeInferred?: boolean;
  inferenceConfidence?: 'high' | 'medium' | 'low';
};

export type RelationshipInsightDisplayMode = 'paragraph' | 'bullets';

export type RelationshipInsightSection = {
  id: string;
  number: number;
  title: string;
  titleEn?: string;
  content: string;
  bullets: string[];
  /** ③④は bullets、他は paragraph（複数行でも段落表示） */
  displayMode: RelationshipInsightDisplayMode;
};

/** 改行区切りテキストを箇条書き用に分割 */
export function splitInsightBullets(text: string): string[] {
  if (!text.trim()) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

/** エンジン結果 → カードデータ */
export function toRelationshipInsightCard(
  result: RelationshipAdjustmentResult & {
    consultantType?: string;
    otherType?: string;
    inference?: RelationshipDiagnosisResult['inference'];
  },
  meta?: { relation?: string },
): RelationshipInsightCardData {
  return {
    consultantType: result.consultantType ?? '',
    otherType: result.otherType ?? '',
    type_summary: result.type_summary,
    cognitive_gap: result.cognitive_gap,
    friction_points: result.friction_points,
    adjustment_tips: result.adjustment_tips,
    communication_safe: result.communication_safe,
    communication_avoid: result.communication_avoid,
    communication_tip: result.communication_tip,
    relationship_direction: result.relationship_direction,
    relation: meta?.relation,
    isOtherTypeInferred: result.inference?.isInferred,
    inferenceConfidence: result.inference?.confidence,
  };
}

/** UIセクション配列（認知 → 摩擦 → 調整 → 伝え方 → 方向性） */
export function buildRelationshipInsightSections(
  data: RelationshipInsightCardData,
): RelationshipInsightSection[] {
  return [
    {
      id: 'type_summary',
      number: 1,
      title: '相手タイプの概要',
      content: data.type_summary,
      bullets: splitInsightBullets(data.type_summary),
      displayMode: 'paragraph',
    },
    {
      id: 'cognitive_gap',
      number: 2,
      title: '認知のズレ',
      titleEn: 'Cognitive Gap',
      content: data.cognitive_gap,
      bullets: splitInsightBullets(data.cognitive_gap),
      displayMode: 'paragraph',
    },
    {
      id: 'friction_points',
      number: 3,
      title: '摩擦ポイント',
      titleEn: 'Friction Points',
      content: data.friction_points,
      bullets: splitInsightBullets(data.friction_points),
      displayMode: 'bullets',
    },
    {
      id: 'adjustment_tips',
      number: 4,
      title: '関係調整のヒント',
      titleEn: 'Adjustment Tips',
      content: data.adjustment_tips,
      bullets: splitInsightBullets(data.adjustment_tips),
      displayMode: 'bullets',
    },
    {
      id: 'communication_safe',
      number: 5,
      title: '安全な伝え方',
      titleEn: 'Safe Communication',
      content: data.communication_safe,
      bullets: splitInsightBullets(data.communication_safe),
      displayMode: 'paragraph',
    },
    {
      id: 'communication_avoid',
      number: 6,
      title: '避けるべき伝え方',
      titleEn: 'Avoid Communication',
      content: data.communication_avoid,
      bullets: splitInsightBullets(data.communication_avoid),
      displayMode: 'paragraph',
    },
    {
      id: 'communication_tip',
      number: 7,
      title: '効果的な伝え方',
      titleEn: 'Communication Tip',
      content: data.communication_tip,
      bullets: splitInsightBullets(data.communication_tip),
      displayMode: 'paragraph',
    },
    {
      id: 'relationship_direction',
      number: 8,
      title: '関係改善の方向性',
      titleEn: 'Relationship Direction',
      content: data.relationship_direction,
      bullets: splitInsightBullets(data.relationship_direction),
      displayMode: 'paragraph',
    },
  ];
}

/** テキストプレビュー（チャット・ログ用） */
export function formatRelationshipInsightCard(
  data: RelationshipInsightCardData,
): string {
  const relationLine = data.relation ? `（${data.relation}）` : '';
  const inferredLine = data.isOtherTypeInferred
    ? `※相手タイプは推測（確度: ${data.inferenceConfidence ?? 'low'}）`
    : '';

  return [
    `🟦 他者理解カード：あなた ${data.consultantType || '—'} × 相手 ${data.otherType || '—'}${relationLine}`,
    inferredLine,
    '',
    '① 相手タイプの概要',
    data.type_summary,
    '',
    '② 認知のズレ（Cognitive Gap）',
    data.cognitive_gap,
    '',
    '③ 摩擦ポイント（Friction Points）',
    data.friction_points,
    '',
    '④ 関係調整のヒント（Adjustment Tips）',
    data.adjustment_tips,
    '',
    '⑤ 安全な伝え方（Safe Communication）',
    data.communication_safe,
    '',
    '⑥ 避けるべき伝え方（Avoid Communication）',
    data.communication_avoid,
    '',
    '⑦ 効果的な伝え方（Communication Tip）',
    data.communication_tip,
    '',
    '⑧ 関係改善の方向性（Relationship Direction）',
    data.relationship_direction,
  ]
    .filter((line) => line !== '')
    .join('\n');
}
