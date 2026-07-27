/**
 * エニアグラム辞書の共通型
 * self-understanding と同構造。
 * （types / wings / center / instincts の各ファイルで共有）
 */

/** 純タイプ（type1〜type9）／ウイング（type1w2 など）共通 */
export type EnneagramTypeEntry = {
  coreFear: string;
  coreDesire: string;
  stressPattern: string;
  growthDirection: string;
  conflictStyle: string;
  blindSpot: string;
};

/** 文字列 insight ラッパー用 */
export type EnneagramInsightEntry = {
  code: string;
  label: string;
  insight: string;
  tensions?: [string, string];
};

/** センター（gut / heart / head）の定義 */
export type EnneagramCenterEntry = {
  name: 'Gut' | 'Heart' | 'Head';
  coreDrive: string;
  coreFear: string;
  coreDesire: string;
  stressPattern: string;
  growthDirection: string;
  blindSpot: string;
};

/** 行動パターン（behavior）※他者理解でも参照しうる */
export type EnneagramBehaviorEntry = {
  workStyle: string;
  communication: string;
  stressReaction: string;
  decisionPattern: string;
  conflictPattern: string;
};

/** 本能スタック（sp / so / sx） */
export type EnneagramInstinctEntry = {
  name: 'Self-Preservation' | 'Social' | 'Sexual';
  coreDrive: string;
  stressPattern: string;
  focus: string;
  blindSpot: string;
};
