/**
 * ③ 関係調整エンジン（最終出力）
 */

import {
  communicationStyleForOtherDictionary,
  getCommunicationStyleForOtherEntry,
} from '../data/enneagram/communication_style_for_other_dictionary';
import {
  misalignmentPatterns,
  type MisalignmentPatternEntry,
  type MisalignmentPatternsMatrix,
} from '../data/enneagram/misalignment_patterns_dictionary';
import { typeSummary } from '../data/enneagram/type_summary';

export type RelationshipAdjustmentInput = {
  consultantType: string;
  otherType: string;
  /**
   * 認知ズレ辞書（任意）
   * 未指定時は data/enneagram の既定辞書を使う。
   */
  misalignmentPatterns?: MisalignmentPatternsMatrix;
  /** 任意コンテキスト（エピソード、関係性、状況） */
  context?: {
    episode?: string;
    relation?: string;
    situation?: string;
  };
  /** 既存の境界線ロジック互換（任意） */
  deferHints?: string[];
};

export type RelationshipAdjustmentResult = {
  /** 1. 相手タイプの特徴 */
  type_summary: string;
  /** 2. 認知のズレ */
  cognitive_gap: string;
  /** 3. 摩擦ポイント */
  friction_points: string;
  /** 4. 関係調整ヒント */
  adjustment_tips: string;
  /** 5. 安全な伝え方 */
  communication_safe: string;
  /** 6. 避けるべき伝え方 */
  communication_avoid: string;
  /** 7. 効果的な伝え方 */
  communication_tip: string;
  /** 8. 関係改善の方向性 */
  relationship_direction: string;
};

export type RelationshipAdjustmentEngine = {
  adjust(input: RelationshipAdjustmentInput): RelationshipAdjustmentResult;
};

function normalizeType(typeCode: string): string {
  const normalized = typeCode.trim();
  const base = normalized.charAt(0);
  return base >= '1' && base <= '9' ? base : normalized;
}

function getMisalignmentEntry(
  consultantType: string,
  otherType: string,
  matrix: MisalignmentPatternsMatrix,
): MisalignmentPatternEntry {
  const consultant = normalizeType(consultantType);
  const other = normalizeType(otherType);
  return (
    matrix[consultant]?.[other] ?? {
      cognitive_gap: '',
      friction_points: '',
      adjustment_tips: '',
    }
  );
}

/** 辞書の複数行を、方向性テキスト向けに1文に整える */
function inlineForDirection(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('、');
}

function buildRelationshipDirection(
  _consultantType: string,
  otherType: string,
  misalign: MisalignmentPatternEntry,
  comm: { safe: string; avoid: string; tip: string },
  context?: { episode?: string; relation?: string; situation?: string },
): string {
  const other = normalizeType(otherType);
  const cognitiveGap =
    inlineForDirection(misalign.cognitive_gap) ||
    '相手の認知の軸はまだ整理されていません';
  const friction =
    inlineForDirection(misalign.friction_points) ||
    '摩擦ポイントは状況次第で変わります';
  const adjustment =
    inlineForDirection(misalign.adjustment_tips) ||
    '小さな調整を継続する';
  const safe = comm.safe || '相手のペースを尊重して伝える';
  const avoid = comm.avoid || '押しつけや断定';
  const tip = comm.tip || '短く、具体的に伝える';

  const relationPrefix = context?.relation
    ? `${context.relation}という関係の中では、`
    : '';
  const situationPrefix = context?.situation
    ? `${context.situation}の場面では、`
    : '';

  const parts = [
    `${relationPrefix}${situationPrefix}タイプ${other}の人は「${cognitiveGap}」という認知の軸で世界を見ています。`,
    `そのため、あなたとの関係では「${friction}」が起きやすくなります。`,
    '',
    `関係を改善するには、まず「${adjustment}」を意識することが効果的です。`,
    `コミュニケーションでは「${safe}」を使い、「${avoid}」を避けると、相手が安心して話を受け取れるようになります。`,
    '',
    `さらに、関係を前進させるコツは「${tip}」です。`,
    `これを意識すると、タイプ${other}とのやり取りが安定しやすくなります。`,
  ];

  if (context?.episode) {
    parts.push(
      '',
      `今回のエピソードでは「${context.episode}」が特に重要なポイントになります。`,
    );
  }

  return parts.join('\n').trim();
}

/** 8項目を返す標準関数（UI直結用） */
export function relationshipAdjustmentEngine(
  consultantType: string,
  otherType: string,
  context?: { episode?: string; relation?: string; situation?: string },
  matrix: MisalignmentPatternsMatrix = misalignmentPatterns,
): RelationshipAdjustmentResult {
  const misalign = getMisalignmentEntry(consultantType, otherType, matrix);
  const comm =
    getCommunicationStyleForOtherEntry(otherType) ??
    communicationStyleForOtherDictionary['9'];
  const summary =
    typeSummary[normalizeType(otherType)] ?? '相手タイプの特徴は現在準備中です。';

  return {
    type_summary: summary,
    cognitive_gap: misalign.cognitive_gap,
    friction_points: misalign.friction_points,
    adjustment_tips: misalign.adjustment_tips,
    communication_safe: comm.safe,
    communication_avoid: comm.avoid,
    communication_tip: comm.tip,
    relationship_direction: buildRelationshipDirection(
      consultantType,
      otherType,
      misalign,
      comm,
      context,
    ),
  };
}

export function createRelationshipAdjustmentEngine(): RelationshipAdjustmentEngine {
  return {
    adjust(input) {
      return relationshipAdjustmentEngine(
        input.consultantType,
        input.otherType,
        input.context,
        input.misalignmentPatterns ?? misalignmentPatterns,
      );
    },
  };
}
