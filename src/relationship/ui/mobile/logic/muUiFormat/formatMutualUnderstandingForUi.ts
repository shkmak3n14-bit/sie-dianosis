import { replaceAbstractTerms } from './abstractToBehavior';
import {
  composeUiStages,
  stagesToLabeledText,
  type ComposeUiStagesInput,
  type UiMuStages,
} from './composeUiStages';
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
 * 辞書の一文から、×／／区切りなどで左右の要素を抜く
 */
export function splitComplementParts(raw: string): {
  left: string;
  right: string;
  rest: string;
} {
  const text = replaceAbstractTerms(raw).trim();
  const byTimes = text.split(/\s*[×xX]\s*/);
  if (byTimes.length >= 2) {
    return {
      left: byTimes[0].trim(),
      right: byTimes.slice(1).join(' × ').trim(),
      rest: text,
    };
  }
  const bySlash = text.split(/\s*／\s*/);
  if (bySlash.length >= 2) {
    return {
      left: bySlash[0].trim(),
      right: bySlash.slice(1).join('／').trim(),
      rest: text,
    };
  }
  const byComma = text.split(/[、。]/).map((s) => s.trim()).filter(Boolean);
  if (byComma.length >= 2) {
    return { left: byComma[0], right: byComma[1], rest: text };
  }
  return { left: text.slice(0, 24) || text, right: text.slice(24) || text, rest: text };
}

function moodForCategory(category: MuUiCategoryKey): string {
  switch (category) {
    case 'status.good':
    case 'virtuousCycle':
    case 'respect':
      return '落ち着いて動ける雰囲気';
    case 'status.bad':
    case 'viciousCycle':
    case 'cognitiveGap':
      return 'すれ違いが続きがちな雰囲気';
    case 'defer':
      return '今は安全に距離を置ける雰囲気';
    case 'communication.do':
      return '伝わりやすい雰囲気';
    case 'communication.avoid':
      return '防衛が強まりがちな雰囲気';
    default:
      return 'お互いの位置が分かりやすい雰囲気';
  }
}

function supportForCategory(category: MuUiCategoryKey, right: string): string {
  switch (category) {
    case 'status.good':
    case 'virtuousCycle':
      return right ? `${right}を認めてくれる` : '具体的に認めてくれる';
    case 'respect':
      return 'ペースを急かさず受け止めてくれる';
    case 'communication.do':
      return right ? `${right}と伝えてくれる` : '要点を率直に伝えてくれる';
    case 'responsibility':
      return '裁量を残してくれる';
    case 'defer':
      return '今は無理に決めず待ってくれる';
    case 'status.bad':
    case 'viciousCycle':
      return '先に短い一言で意図を伝えてくれる';
    default:
      return '様子を見て合わせてくれる';
  }
}

/**
 * 1辞書項目 → 3段階UI文章
 */
export function formatDictionaryItemToUiStages(
  raw: string,
  category: MuUiCategoryKey = 'generic',
): UiMuStages {
  const { left, right, rest } = splitComplementParts(raw);
  const observable = left || rest;
  const unclear =
    category === 'cognitiveGap' || category === 'status.bad' || category === 'viciousCycle'
      ? right || '意図の読み方'
      : right || '本音や次の一手';

  const input: ComposeUiStagesInput = {
    observable,
    unclear,
    yourSupport: supportForCategory(category, right),
    yourStrength: left || '境界線を引いて守る力',
    theirStrength: right || 'すぐに行動に移す力',
    relationshipMood: moodForCategory(category),
  };

  return composeUiStages(input);
}

/**
 * 1辞書項目 → ラベル付きUI本文（1文字列）
 */
export function formatDictionaryItemToUiText(
  raw: string,
  category: MuUiCategoryKey = 'generic',
): string {
  return stagesToLabeledText(formatDictionaryItemToUiStages(raw, category));
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
