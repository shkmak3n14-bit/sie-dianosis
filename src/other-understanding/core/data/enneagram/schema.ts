/**
 * 他者理解モジュール — 正式スキーマ（①）
 *
 * 方針:
 * - self と意味が同じフィールドは **同名**（EnneagramTypeCore）
 * - 他者理解固有（観察・行動・伝え方）は **拡張フィールド**（配列可）
 * - 象徴・体験談・キャラ名は正本に入れない（_drafts 専用）
 *
 * 詳細は ./SCHEMA.md / ./FIELD_MAPPING.md
 */

// ---------------------------------------------------------------------------
// 共通コア（self-understanding の EnneagramTypeEntry とフィールド名を揃える）
// ---------------------------------------------------------------------------

/**
 * 自己理解／他者理解で共有するコア（一文中心）
 * self: `EnneagramTypeEntry` と同型
 */
export type EnneagramTypeCore = {
  /** 恐れの核 */
  coreFear: string;
  /** 欲求の核 */
  coreDesire: string;
  /** ストレス時の要約 */
  stressPattern: string;
  /** 成長の方向 */
  growthDirection: string;
  /** 衝突の出方 */
  conflictStyle: string;
  /** 本人が見落としやすい点（一文） */
  blindSpot: string;
};

/**
 * 互換エイリアス（既存の types/wings 再エクスポートが参照）
 * 新規コードは EnneagramTypeCore を推奨
 */
export type EnneagramTypeEntry = EnneagramTypeCore;

// ---------------------------------------------------------------------------
// 他者理解拡張（観察・行動・伝え方）
// ---------------------------------------------------------------------------

/**
 * 他者理解専用の行動・観察レイヤー
 * 下書き B 欄 → 正本昇格時の受け皿
 */
export type OtherTypeBehavior = {
  /** 動機の箇条（coreDesire の展開） */
  coreMotivation: string[];
  /** 外から見える強み */
  strengths: string[];
  /**
   * 外から見えるズレ・影（複数）
   * 対応表: self/core の blindSpot（単数一文）→ 本フィールド（複数）
   */
  blindspots: string[];
  /** 応力時の段階・兆候（stressPattern の詳細） */
  stressPatternDetail: string[];
  /** 関わり・成長のヒント（growthDirection の展開） */
  growthPoints: string[];
  /** 観察可能な行動例（推論・タグ材料） */
  behaviorExamples: string[];
  /** 特徴タグ候補（type_inference / observation_tags 連携） */
  observationTags: string[];
  /** 相手がこのタイプのときの伝え方 */
  communicationDo: string[];
  /** 避ける伝え方 */
  communicationAvoid: string[];
  /** 言い回し例 */
  communicationExamples: string[];
};

/**
 * 他者理解のタイプ／ウイング正本エントリ
 * = 識別子 + 共通コア + 行動拡張
 *
 * 置き場（予定）: `data/enneagram/profiles/type{N}w{M}.ts`
 * 移行完了まで既存 `wings/*.ts` は self 再エクスポートのまま残す
 */
export type OtherTypeEntry = {
  /** 例: "2w1" / "4" */
  code: string;
  /** 表示用（任意） */
  label?: string;
} & EnneagramTypeCore &
  OtherTypeBehavior;

/** 空の行動拡張（骨格・プレースホルダ用） */
export const emptyOtherTypeBehavior = (): OtherTypeBehavior => ({
  coreMotivation: [],
  strengths: [],
  blindspots: [],
  stressPatternDetail: [],
  growthPoints: [],
  behaviorExamples: [],
  observationTags: [],
  communicationDo: [],
  communicationAvoid: [],
  communicationExamples: [],
});

/** 空の OtherTypeEntry（code のみ必須） */
export const emptyOtherTypeEntry = (code: string): OtherTypeEntry => ({
  code,
  coreFear: '',
  coreDesire: '',
  stressPattern: '',
  growthDirection: '',
  conflictStyle: '',
  blindSpot: '',
  ...emptyOtherTypeBehavior(),
});

// ---------------------------------------------------------------------------
// 既存の center / behavior / instinct / insight（変更なし・互換維持）
// ---------------------------------------------------------------------------

export type EnneagramInsightEntry = {
  code: string;
  label: string;
  insight: string;
  tensions?: [string, string];
};

export type EnneagramCenterEntry = {
  name: 'Gut' | 'Heart' | 'Head';
  coreDrive: string;
  coreFear: string;
  coreDesire: string;
  stressPattern: string;
  growthDirection: string;
  blindSpot: string;
};

export type EnneagramBehaviorEntry = {
  workStyle: string;
  communication: string;
  stressReaction: string;
  decisionPattern: string;
  conflictPattern: string;
};

export type EnneagramInstinctEntry = {
  name: 'Self-Preservation' | 'Social' | 'Sexual';
  coreDrive: string;
  stressPattern: string;
  focus: string;
  blindSpot: string;
};
