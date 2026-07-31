/**
 * エニアグラム関係辞書の公開エントリ（相互理解）
 * 正本はタイプ×タイプ。基礎タイプ辞書は self / other を参照。
 */

export { toPairKey, normalizeType } from './pair_key';

export type { PairStatusEntry } from './pair_status_dictionary';
export {
  getPairStatusEntry,
  pairStatusDictionary,
} from './pair_status_dictionary';

export type { ViciousCyclePatternEntry } from './vicious_cycle_patterns_dictionary';
export {
  getViciousCyclePattern,
  viciousCyclePatternsDictionary,
} from './vicious_cycle_patterns_dictionary';

export type { CognitiveGapPairEntry } from './cognitive_gap_pair_dictionary';
export {
  getCognitiveGapPairEntry,
  cognitiveGapPairDictionary,
} from './cognitive_gap_pair_dictionary';

export type { VirtuousCycleEntry } from './virtuous_cycle_dictionary';
export {
  getVirtuousCycleEntry,
  virtuousCycleDictionary,
} from './virtuous_cycle_dictionary';

export type { RespectPointsEntry } from './respect_points_dictionary';
export {
  getRespectPointsEntry,
  respectPointsDictionary,
} from './respect_points_dictionary';

export type { ResponsibilitySplitEntry } from './responsibility_split_dictionary';
export {
  getResponsibilitySplitEntry,
  responsibilitySplitDictionary,
} from './responsibility_split_dictionary';

export type { DeferPointsEntry } from './defer_points_dictionary';
export {
  getDeferPointsEntry,
  deferPointsDictionary,
} from './defer_points_dictionary';

export type { CommunicationPairEntry } from './communication_pair_dictionary';
export {
  getCommunicationPairEntry,
  communicationPairDictionary,
} from './communication_pair_dictionary';
