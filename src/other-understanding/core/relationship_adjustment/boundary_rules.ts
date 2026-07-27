/**
 * ③ 境界線ルール（骨格）
 */

import type { RelationshipAdjustmentInput } from './engine';

export type BoundaryProposal = {
  /** 守る境界の一文 */
  statement: string;
  /** なぜこの境界が必要か */
  why: string;
};

/**
 * TODO: タイプ組み合わせ辞書と接続する。
 */
export function proposeBoundaries(
  input: RelationshipAdjustmentInput,
): BoundaryProposal[] {
  const base: BoundaryProposal[] = [
    {
      statement: '相手を変えようとせず、関わり方だけを選ぶ',
      why: 'タイプの基盤は変わりにくく、変えようとすると摩擦が増えやすい',
    },
  ];

  for (const hint of input.deferHints ?? []) {
    base.push({
      statement: `いったん棚上げする: ${hint}`,
      why: '埋めきれないズレを無理に合意しようとすると関係コストが上がる',
    });
  }

  return base;
}
