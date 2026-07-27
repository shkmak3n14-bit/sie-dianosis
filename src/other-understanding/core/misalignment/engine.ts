/**
 * ③ 認知のズレ分析エンジン
 */

import {
  findMisalignmentPatterns,
  type MisalignmentPatternEntry,
} from './patterns';

export type MisalignmentInput = {
  consultantType: string;
  /** 診断または推測の相手タイプ */
  otherType: string;
  /** 相手タイプが推測かどうか */
  otherIsInferred?: boolean;
};

export type MisalignmentResult = {
  patterns: MisalignmentPatternEntry[];
  /** 認知のズレ */
  cognitiveGaps: string[];
  /** 摩擦点 */
  frictionPoints: string[];
  /** 調整ヒント */
  adjustmentTips: string[];
};

export type MisalignmentEngine = {
  analyze(input: MisalignmentInput): MisalignmentResult;
};

export function createMisalignmentEngine(): MisalignmentEngine {
  return {
    analyze(input) {
      const patterns = findMisalignmentPatterns(
        input.consultantType,
        input.otherType,
      );
      return {
        patterns,
        cognitiveGaps: patterns.map((p) => p.cognitive_gap).filter(Boolean),
        frictionPoints: patterns
          .map((p) => p.friction_points)
          .filter(Boolean),
        adjustmentTips: patterns
          .map((p) => p.adjustment_tips)
          .filter(Boolean),
      };
    },
  };
}
