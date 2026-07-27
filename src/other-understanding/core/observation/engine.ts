/**
 * ② 観察ポイント・行動ベース質問案エンジン
 */

import {
  getObservationPoints,
  getActionBasedQuestions,
  type ObservationPoint,
} from './dictionary';

export type ObservationPlan = {
  points: ObservationPoint[];
  questions: string[];
};

export type ObservationEngine = {
  /** 推測精度を上げるための観察計画を返す */
  buildPlan(candidateTypeIds: string[]): ObservationPlan;
};

export function createObservationEngine(): ObservationEngine {
  return {
    buildPlan(candidateTypeIds) {
      const points = getObservationPoints(candidateTypeIds);
      const questions = getActionBasedQuestions(candidateTypeIds);
      return { points, questions };
    },
  };
}
