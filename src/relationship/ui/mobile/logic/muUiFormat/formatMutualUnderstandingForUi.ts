import { replaceAbstractTerms } from './abstractToBehavior';
import { applyCategoryTemplate } from './categoryTemplates';
import type { MutualUnderstanding } from '../../templates/mutual_understanding';

export type MuUiCategoryKey =
  | 'status.good'
  | 'status.bad'
  | 'viciousCycle'
  | 'cognitiveGap'
  | 'virtuousCycle'
  | 'respect'
  | 'responsibility'
  | 'defer'
  | 'communication.do'
  | 'communication.avoid'
  | 'communication.examples'
  | 'generic';

/**
 * 1辞書項目 → ラベル付きUI本文（1文字列）
 */
export function formatDictionaryItemToUiText(
  raw: string,
  category: MuUiCategoryKey = 'generic',
): string {
  const replaced = replaceAbstractTerms(raw).trim();
  return applyCategoryTemplate(replaced, category);
}

/**
 * 互換維持: 旧3段階API（現状は共通テンプレを無効化）
 */
export function formatDictionaryItemToUiStages(
  raw: string,
  category: MuUiCategoryKey = 'generic',
): { self: string; other: string; relationship: string } {
  const text = formatDictionaryItemToUiText(raw, category);
  return {
    self: text,
    other: '',
    relationship: '',
  };
}

/**
 * 互換維持: 旧分解API（最小）
 */
export function splitComplementParts(raw: string): {
  left: string;
  right: string;
  rest: string;
} {
  const text = replaceAbstractTerms(raw).trim();
  return { left: text, right: '', rest: text };
}

function mapItems(
  items: string[],
  category: MuUiCategoryKey,
): string[] {
  return items.map((item) => formatDictionaryItemToUiText(item, category));
}

/**
 * MutualUnderstanding 全体を UI向け3段階文章へ変換する
 * （構造は維持し、各 string を3段階テキストに置き換える）
 */
export function formatMutualUnderstandingForUi(
  relation: MutualUnderstanding,
): MutualUnderstanding {
  return {
    ...relation,
    status: {
      ...relation.status,
      good: mapItems(relation.status.good, 'status.good'),
      bad: mapItems(relation.status.bad, 'status.bad'),
      summary: formatDictionaryItemToUiText(relation.status.summary, 'status.good'),
    },
    viciousCycle: {
      triggers: mapItems(relation.viciousCycle.triggers, 'viciousCycle'),
      loop: mapItems(relation.viciousCycle.loop, 'viciousCycle'),
      typePatterns: mapItems(relation.viciousCycle.typePatterns, 'viciousCycle'),
    },
    cognitiveGap: {
      selfGap: mapItems(relation.cognitiveGap.selfGap, 'cognitiveGap'),
      otherGap: mapItems(relation.cognitiveGap.otherGap, 'cognitiveGap'),
      interaction: mapItems(relation.cognitiveGap.interaction, 'cognitiveGap'),
    },
    virtuousCycle: {
      actions: mapItems(relation.virtuousCycle.actions, 'virtuousCycle'),
      adjustments: mapItems(relation.virtuousCycle.adjustments, 'virtuousCycle'),
      reassurance: mapItems(relation.virtuousCycle.reassurance, 'virtuousCycle'),
    },
    respect: {
      forOther: mapItems(relation.respect.forOther, 'respect'),
      forSelf: mapItems(relation.respect.forSelf, 'respect'),
    },
    responsibility: {
      self: mapItems(relation.responsibility.self, 'responsibility'),
      other: mapItems(relation.responsibility.other, 'responsibility'),
      boundary: mapItems(relation.responsibility.boundary, 'responsibility'),
    },
    defer: {
      reasons: mapItems(relation.defer.reasons, 'defer'),
      risks: mapItems(relation.defer.risks, 'defer'),
      conditions: mapItems(relation.defer.conditions, 'defer'),
    },
    communication: {
      do: mapItems(relation.communication.do, 'communication.do'),
      avoid: mapItems(relation.communication.avoid, 'communication.avoid'),
      examples: mapItems(relation.communication.examples, 'communication.examples'),
    },
    summary: relation.summary
      ? formatDictionaryItemToUiText(relation.summary, 'status.good')
      : relation.summary,
  };
}
