import type { MutualUnderstanding } from './types/mutual_understanding';
import { pairTemplate } from './data/enneagram/pair_template';

export function runMutualUnderstanding(pairKey: string): MutualUnderstanding {
  // TODO: 後で辞書を差し替える
  return {
    ...pairTemplate,
    pairKey,
  };
}
