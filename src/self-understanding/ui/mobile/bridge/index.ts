/**
 * UI ↔ core 境界の公開口
 * 当面は preview 実装。ホスト接続時に差し替える。
 */

export {
  createEmptySieConversationState,
  buildUserEnneagramProfile,
  EMPTY_PSYCHO_STRUCTURE,
  mergePsychoStructure,
  type ConversationPhase,
  type PsychoStructure,
  type ResponsePersonaContext,
  type SieConversationState,
  type ToneType,
  type UserEnneagramProfile,
} from '../templates/sie_conversation';

export type {
  SieErrorResponse,
  SieFailureResponse,
  SiePersona,
  SieRequest,
  SieResponse,
  SieSuccessResponse,
} from './sieResponse';

export { callSelfUnderstandingBridge } from './callSelfUnderstandingBridge';

export {
  extractPsychoStructure,
  formatAdviceMessage,
  generateAdvice,
  generateFollowUp,
  resolveReplyStyle,
  respond,
  respondVoiceInput,
  toSpeechFriendly,
  writeResponse,
} from './previewCoreApi';
