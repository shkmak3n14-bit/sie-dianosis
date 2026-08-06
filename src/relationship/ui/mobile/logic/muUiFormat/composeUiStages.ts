import { abstractToObservable, replaceAbstractTerms } from './abstractToBehavior';

/**
 * UI文章の3段階構造
 * 1. あなたの観察（self）
 * 2. 相手の反応（other）
 * 3. 二人の関係（relationship）
 */
export type UiMuStages = {
  self: string;
  other: string;
  relationship: string;
};

export type ComposeUiStagesInput = {
  /** 観察できた相手の様子・行動 */
  observable: string;
  /** まだ分からない部分 */
  unclear?: string;
  /** 相手が安心する、あなたの行動 */
  yourSupport: string;
  /** あなたの強み（具体行動） */
  yourStrength: string;
  /** 相手の強み（具体行動） */
  theirStrength: string;
  /** 関係の雰囲気（例: 落ち着いて動ける／すれ違いがち） */
  relationshipMood: string;
};

function cleanSlot(value: string, fallback: string): string {
  const text = replaceAbstractTerms(value).replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  // テンプレートに入れやすい長さへ
  if (text.length <= 36) return text;
  const cut = text.slice(0, 36);
  const punct = Math.max(cut.lastIndexOf('、'), cut.lastIndexOf('。'), cut.lastIndexOf('／'));
  return punct >= 12 ? cut.slice(0, punct) : cut;
}

/**
 * スロットから3段階テンプレート文を組み立てる
 */
export function composeUiStages(input: ComposeUiStagesInput): UiMuStages {
  const observable = cleanSlot(input.observable, '様子');
  const unclear = cleanSlot(input.unclear ?? '意図や本音', '意図や本音');
  const yourSupport = cleanSlot(input.yourSupport, '具体的に認めてくれる');
  const yourStrength = cleanSlot(
    abstractToObservable(input.yourStrength),
    '境界線を引いて守る力',
  );
  const theirStrength = cleanSlot(
    abstractToObservable(input.theirStrength),
    'すぐに行動に移す力',
  );
  const relationshipMood = cleanSlot(
    input.relationshipMood,
    '落ち着いて動ける雰囲気',
  );

  return {
    self:
      `あなたは相手の${observable}を見て、ここまでは理解できると感じます。` +
      `でも、${unclear}の部分は分からないので、そのまま伝えます。`,
    other: `相手はあなたが${yourSupport}ことで、安心して行動できます。`,
    relationship:
      `二人だと、あなたの${yourStrength}と相手の${theirStrength}が自然に噛み合い、` +
      `関係が${relationshipMood}になりやすいです。`,
  };
}

/** 表示用テキスト（ラベル付き） */
export function stagesToLabeledText(stages: UiMuStages): string {
  return [
    `【あなたの観察】\n${stages.self}`,
    `【相手の反応】\n${stages.other}`,
    `【二人の関係】\n${stages.relationship}`,
  ].join('\n\n');
}

/** 本文配列（UIの段落分割用） */
export function stagesToParagraphs(stages: UiMuStages): string[] {
  return [
    `【あなたの観察】\n${stages.self}`,
    `【相手の反応】\n${stages.other}`,
    `【二人の関係】\n${stages.relationship}`,
  ];
}
