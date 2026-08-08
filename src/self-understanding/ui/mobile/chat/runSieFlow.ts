import type { SiePersona, SieSuccessResponse } from '../bridge/sieResponse';

/** flow controller が UI に渡す1ステップ */
export type SieFlowStep = {
  stepLabel: string;
  message: string;
  /** 常に sie */
  persona: SiePersona;
};

/**
 * bridge の success レスポンスを UI 進行用ステップ列に変換する。
 * flow / messages は sie の対話ステップ。persona は常に sie。
 */
export function runSieFlow(response: SieSuccessResponse): SieFlowStep[] {
  const { flow, messages, persona } = response;

  return flow.map((step, index) => ({
    stepLabel: step,
    message: messages[index] ?? '',
    persona,
  }));
}
