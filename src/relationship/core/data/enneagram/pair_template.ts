import type { MutualUnderstanding } from '../../types/mutual_understanding';

export const pairTemplate: MutualUnderstanding = {
  pairKey: 'XxY',
  status: { good: [], bad: [], summary: '' },
  viciousCycle: { triggers: [], loop: [], typePatterns: [] },
  cognitiveGap: { selfGap: [], otherGap: [], interaction: [] },
  virtuousCycle: { actions: [], adjustments: [], reassurance: [] },
  respect: { forOther: [], forSelf: [] },
  responsibility: { self: [], other: [], boundary: [] },
  defer: { reasons: [], risks: [], conditions: [] },
  communication: { do: [], avoid: [], examples: [] },
  summary: '',
};
