/**
 * ① 他者理解モジュール入口
 * 相手が診断を受けられるかで①／②へ分岐する。
 */

export { DiagnosisEntryFlow, createDiagnosisEntryFlow } from './flow';
export {
  buildInvitePrompt,
  buildValuesComparisonPrompt,
} from './prompts';
