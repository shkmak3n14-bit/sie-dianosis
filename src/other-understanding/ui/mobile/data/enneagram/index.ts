/**
 * mobile 用データ辞書の公開入口
 *
 * ソース・オブ・トゥルースは core/data/enneagram/。
 * 本ディレクトリは Expo バンドル用のコピー（core を直接 import しない）。
 * 同期: npm run sync:data（ui/mobile）
 */

export { typeSummary } from './type_summary';

export type { CommunicationStyleForOtherEntry } from './communication_style_for_other_dictionary';
export {
  communicationStyles,
  communicationStyleForOtherDictionary,
  getCommunicationStyleForOtherEntry,
} from './communication_style_for_other_dictionary';

export type {
  MisalignmentPatternEntry,
  MisalignmentPatternsMatrix,
} from './misalignment_patterns_dictionary';
export {
  misalignmentPatterns,
  misalignmentPatternsDictionary,
} from './misalignment_patterns_dictionary';

export type { ObservationTagsMap } from './observation_tags_dictionary';
export {
  getObservationTags,
  observationTags,
  scoreObservationTags,
} from './observation_tags_dictionary';
