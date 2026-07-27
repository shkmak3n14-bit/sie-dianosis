/**
 * type_inference × relationship_adjustment 接続パイプライン
 *
 * 1. エピソードから相手タイプを推測
 * 2. 相談者タイプ × 相手タイプで関係調整8項目を生成
 */

import { relationshipAdjustmentEngine } from './relationship_adjustment/engine';
import type { RelationshipAdjustmentResult } from './relationship_adjustment/engine';
import {
  typeInferenceEngine,
  type TypeInferenceResult,
} from './type_inference/engine';

export type RelationshipDiagnosisContext = {
  /** 相談者タイプ（自己理解・診断結果から渡す） */
  consultantType: string;
  /** 関係性（任意）例: 上司・パートナー・友人 */
  relation?: string;
  /** 状況（任意） */
  situation?: string;
};

export type RelationshipDiagnosisResult = RelationshipAdjustmentResult & {
  consultantType: string;
  otherType: string;
  /** 相手タイプ推測のメタ情報 */
  inference: TypeInferenceResult;
};

/**
 * 他者理解：エピソード入力 → タイプ推測 → 関係調整（UIカード用）
 */
export function runRelationshipDiagnosis(
  inputText: string,
  context: RelationshipDiagnosisContext,
): RelationshipDiagnosisResult {
  const inference = typeInferenceEngine(inputText);
  const otherType = inference.candidates[0]?.typeId ?? '';

  const adjustment = relationshipAdjustmentEngine(
    context.consultantType,
    otherType,
    {
      episode: inputText,
      relation: context.relation,
      situation: context.situation,
    },
  );

  return {
    consultantType: context.consultantType,
    otherType,
    inference,
    ...adjustment,
  };
}
