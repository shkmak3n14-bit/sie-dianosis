/**
 * MutualUnderstanding 表示用型（core と同型・UI側で完結）
 */
export type MutualUnderstanding = {
  pairKey: string;
  summary?: string;
  status: {
    good: string[];
    bad: string[];
    summary: string;
  };
  viciousCycle: {
    triggers: string[];
    loop: string[];
    typePatterns: string[];
  };
  cognitiveGap: {
    selfGap: string[];
    otherGap: string[];
    interaction: string[];
  };
  virtuousCycle: {
    actions: string[];
    adjustments: string[];
    reassurance: string[];
  };
  respect: {
    forOther: string[];
    forSelf: string[];
  };
  responsibility: {
    self: string[];
    other: string[];
    boundary: string[];
  };
  defer: {
    reasons: string[];
    risks: string[];
    conditions: string[];
  };
  communication: {
    do: string[];
    avoid: string[];
    examples: string[];
  };
};

/** @deprecated MutualUnderstanding を使用 */
export type MutualUnderstandingView = MutualUnderstanding;
