/**
 * ③ 認知のズレ分析エンジン
 */

import { findMisalignmentPatterns, type MisalignmentPattern } from './patterns';

export type MisalignmentInput = {
  consultantType: string;
  /** 診断または推測の相手タイプ */
  otherType: string;
  /** 相手タイプが推測かどうか */
  otherIsInferred?: boolean;
};

export type MisalignmentResult = {
  patterns: MisalignmentPattern[];
  /** ズレが現れやすい場面 */
  scenes: string[];
  /** ズレを埋めるヒント */
  bridgeHints: string[];
  /** 埋めずに棚上げすべき点 */
  deferHints: string[];
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
        scenes: patterns.flatMap((p) => p.scenes),
        bridgeHints: patterns.flatMap((p) => p.bridgeHints),
        deferHints: patterns.flatMap((p) => p.deferHints),
      };
    },
  };
}
