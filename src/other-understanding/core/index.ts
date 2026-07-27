/**
 * other-understanding core 公開入口（骨格）
 */

export {
  createDiagnosisEntryFlow,
  buildInvitePrompt,
  buildValuesComparisonPrompt,
} from './diagnosis_entry';

export {
  createTypeInferenceEngine,
  typeInferenceEngine,
} from './type_inference/engine';
export { createObservationEngine } from './observation/engine';
export { createMisalignmentEngine } from './misalignment/engine';
export {
  createRelationshipAdjustmentEngine,
  relationshipAdjustmentEngine,
} from './relationship_adjustment/engine';
export type {
  RelationshipAdjustmentInput,
  RelationshipAdjustmentResult,
} from './relationship_adjustment/engine';

export {
  runRelationshipDiagnosis,
} from './run_relationship_diagnosis';
export type {
  RelationshipDiagnosisContext,
  RelationshipDiagnosisResult,
} from './run_relationship_diagnosis';

export {
  formatValuesComparison,
  formatInferenceOutput,
  formatMisalignmentOutput,
} from './templates/output_template';

export type {
  RelationshipInsightCardData,
  RelationshipInsightDisplayMode,
  RelationshipInsightSection,
} from './templates/relationship_insight_card';
export {
  buildRelationshipInsightSections,
  formatRelationshipInsightCard,
  splitInsightBullets,
  toRelationshipInsightCard,
} from './templates/relationship_insight_card';
