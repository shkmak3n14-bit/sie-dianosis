/**
 * self-understanding core 公開入口
 * UI（mobile）からは直接 import しない。ホストアプリ経由で接続する。
 */

export { SAI_PERSONA_PROMPT, buildPromptWithPersona } from './character/sai_persona';
export type { SaiPersonaOptions } from './character/sai_persona';

export {
  formatAdviceMessage,
  generateAdvice,
  resolveReplyStyle,
} from './logic/advice_engine';
export type { GeneratedAdvice } from './logic/advice_engine';

export {
  EMPTY_PSYCHO_STRUCTURE,
  extractPsychoStructure,
  mergePsychoStructure,
} from './logic/psycho_extractor';
export type { PsychoStructure } from './logic/psycho_extractor';

export { generateFollowUp } from './logic/psycho_followup';
export { respond } from './logic/respond';
export { respondVoiceInput } from './logic/respond_voice';
export { writeResponse } from './logic/response_writer';
export { toSpeechFriendly } from './logic/speech_summarizer';

export {
  buildUserEnneagramProfile,
  createEmptySaiConversationState,
  generateResponse,
} from './logic/response_engine';
export type {
  ConversationPhase,
  ResponsePersonaContext,
  SaiConversationState,
  ToneType,
  UserEnneagramProfile,
} from './logic/response_engine';
