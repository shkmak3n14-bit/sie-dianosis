/**
 * preview bridge（core 非 import）
 * 当面は空カード。辞書投入後に mobile/data を読んで埋める。
 */

import {
  emptyMutualInsightCard,
  type MutualInsightCardData,
} from '../templates/mutual_insight_card';

export type BuildMutualInsightPreviewInput = {
  selfType: string;
  otherType: string;
  otherIsInferred?: boolean;
};

export function buildMutualInsightPreview(
  input: BuildMutualInsightPreviewInput,
): MutualInsightCardData {
  // TODO(C): mobile/data のペア辞書から①〜⑧を組み立てる
  return emptyMutualInsightCard(
    input.selfType,
    input.otherType,
    input.otherIsInferred,
  );
}

export { emptyMutualInsightCard };
export type { MutualInsightCardData };
