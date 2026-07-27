/**
 * ③ 関係調整・境界線提案エンジン
 */

import {
  proposeBoundaries,
  type BoundaryProposal,
} from './boundary_rules';

export type RelationshipAdjustmentInput = {
  consultantType: string;
  otherType: string;
  /** 認知ズレから得た棚上げポイントなど */
  deferHints?: string[];
};

export type RelationshipAdjustmentResult = {
  boundaries: BoundaryProposal[];
  /** どこまでが自分の問題か */
  ownResponsibility: string;
  /** どこからが相手の問題か */
  otherResponsibility: string;
};

export type RelationshipAdjustmentEngine = {
  adjust(input: RelationshipAdjustmentInput): RelationshipAdjustmentResult;
};

export function createRelationshipAdjustmentEngine(): RelationshipAdjustmentEngine {
  return {
    adjust(input) {
      const boundaries = proposeBoundaries(input);
      return {
        boundaries,
        ownResponsibility:
          '自分の反応・期待・伝え方は自分側で整えられる範囲です。',
        otherResponsibility:
          '相手の価値観・ペース・選択は、相手側の領域として尊重します。',
      };
    },
  };
}
