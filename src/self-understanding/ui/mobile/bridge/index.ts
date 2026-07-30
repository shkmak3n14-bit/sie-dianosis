/**
 * UI ↔ core 境界の公開口
 * 当面は preview 実装。ホスト接続時に差し替える。
 */

export {
  createEmptySaiConversationState,
  buildUserEnneagramProfile,
  EMPTY_PSYCHO_STRUCTURE,
  mergePsychoStructure,
  type ConversationPhase,
  type PsychoStructure,
  type ResponsePersonaContext,
  type SaiConversationState,
  type ToneType,
  type UserEnneagramProfile,
} from '../templates/sai_conversation';

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
