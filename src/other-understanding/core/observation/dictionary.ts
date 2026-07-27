/**
 * ② 観察ポイント辞書へのアクセス層
 * 実データは data/enneagram/observation_points_dictionary.ts
 */

import {
  observationPointsDictionary,
  actionBasedQuestionsDictionary,
  type ObservationPoint,
} from '../data/enneagram/observation_points_dictionary';

export type { ObservationPoint };

export function getObservationPoints(
  candidateTypeIds: string[],
): ObservationPoint[] {
  if (candidateTypeIds.length === 0) {
    return observationPointsDictionary.general;
  }
  const points: ObservationPoint[] = [
    ...observationPointsDictionary.general,
  ];
  for (const id of candidateTypeIds) {
    const extra = observationPointsDictionary.byType[id];
    if (extra) points.push(...extra);
  }
  return points;
}

export function getActionBasedQuestions(
  candidateTypeIds: string[],
): string[] {
  if (candidateTypeIds.length === 0) {
    return actionBasedQuestionsDictionary.general;
  }
  const questions = [...actionBasedQuestionsDictionary.general];
  for (const id of candidateTypeIds) {
    const extra = actionBasedQuestionsDictionary.byType[id];
    if (extra) questions.push(...extra);
  }
  return questions;
}
