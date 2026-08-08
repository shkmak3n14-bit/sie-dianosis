import type { MuUiCategoryKey } from './formatMutualUnderstandingForUi';

/** status.good / status.bad（3段階・最小） */
function applyStatusTemplate(text: string): string {
  return `あなたは${text}と感じます。相手は${text}と反応します。二人だと${text}になりやすいです。`;
}

/** viciousCycle（2段階・最小） */
function applyViciousCycleTemplate(text: string): string {
  return `あなたが${text}すると、相手は${text}になり、その結果、悪循環が続きやすいです。`;
}

/** cognitiveGap（2段階・最小） */
function applyCognitiveGapTemplate(text: string): string {
  return `あなたは${text}と考えますが、相手は${text}と捉えます。`;
}

/** virtuousCycle（最小） */
function applyVirtuousCycleTemplate(text: string): string {
  return `あなたが${text}ことで、相手は安心して前に進めます。二人だと良い循環が育ちやすいです。`;
}

/** respect（1段階・最小） */
function applyRespectTemplate(text: string): string {
  return `相手は${text}を大事にしています。あなたが${text}すると安心します。`;
}

/** responsibility（1段階・最小） */
function applyResponsibilityTemplate(text: string): string {
  return `あなたは${text}を意識すると安定します。相手は${text}を調整すると衝突が減ります。`;
}

/** defer（1段階・最小） */
function applyDeferTemplate(text: string): string {
  return `今この話題を扱うと${text}が起きやすいです。タイミングをずらすと安全に話せます。`;
}

/** communication.do / avoid / examples（1段階・最小） */
function applyCommunicationTemplate(text: string): string {
  return `あなたが${text}と伝えると理解されやすいです。`;
}

/**
 * カテゴリ別テンプレート適用の入口
 */
export function applyCategoryTemplate(
  text: string,
  category: MuUiCategoryKey,
): string {
  switch (category) {
    case 'status.good':
    case 'status.bad':
      return applyStatusTemplate(text);

    case 'viciousCycle':
      return applyViciousCycleTemplate(text);

    case 'cognitiveGap':
      return applyCognitiveGapTemplate(text);

    case 'virtuousCycle':
      return applyVirtuousCycleTemplate(text);

    case 'respect':
      return applyRespectTemplate(text);

    case 'responsibility':
      return applyResponsibilityTemplate(text);

    case 'defer':
      return applyDeferTemplate(text);

    case 'communication.do':
    case 'communication.avoid':
    case 'communication.examples':
      return applyCommunicationTemplate(text);

    default:
      return text; // generic はそのまま
  }
}
