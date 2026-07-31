/**
 * relationship core 公開入口（骨格）
 *
 * 相互理解 = 自分 × 相手の関係の説明書（①〜⑧）
 */

export { createStatusEngine } from './status/engine';
export type { StatusInput, StatusResult } from './status/engine';

export { createViciousCycleEngine } from './vicious_cycle/engine';
export type {
  ViciousCycleInput,
  ViciousCycleResult,
} from './vicious_cycle/engine';

export { createCognitiveGapEngine } from './cognitive_gap/engine';
export type {
  CognitiveGapInput,
  CognitiveGapResult,
} from './cognitive_gap/engine';

export { createVirtuousCycleEngine } from './virtuous_cycle/engine';
export type {
  VirtuousCycleInput,
  VirtuousCycleResult,
} from './virtuous_cycle/engine';

export { createRespectEngine } from './respect/engine';
export type { RespectInput, RespectResult } from './respect/engine';

export { createResponsibilityEngine } from './responsibility/engine';
export type {
  ResponsibilityInput,
  ResponsibilityResult,
} from './responsibility/engine';

export { createDeferEngine } from './defer/engine';
export type { DeferInput, DeferResult } from './defer/engine';

export { createCommunicationEngine } from './communication/engine';
export type {
  CommunicationInput,
  CommunicationResult,
} from './communication/engine';

export { runMutualUnderstanding } from './run_mutual_understanding';
export type { MutualUnderstanding } from './types/mutual_understanding';

export {
  formatMutualUnderstandingOutput,
} from './templates/output_template';
export type {
  MutualInsightCardData,
  MutualInsightSection,
} from './templates/mutual_insight_card';
export {
  buildMutualInsightSections,
  toMutualInsightCard,
} from './templates/mutual_insight_card';

/** 辞書データ（npm 公開時の安定 API 面） */
export {
  pairStatusDictionary,
  viciousCyclePatternsDictionary,
  cognitiveGapPairDictionary,
  virtuousCycleDictionary,
  respectPointsDictionary,
  responsibilitySplitDictionary,
  deferPointsDictionary,
  communicationPairDictionary,
} from './data/enneagram';
export type {
  PairStatusEntry,
  ViciousCyclePatternEntry,
  CognitiveGapPairEntry,
  VirtuousCycleEntry,
  RespectPointsEntry,
  ResponsibilitySplitEntry,
  DeferPointsEntry,
  CommunicationPairEntry,
} from './data/enneagram';
