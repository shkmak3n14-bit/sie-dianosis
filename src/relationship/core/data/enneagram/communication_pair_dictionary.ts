/**
 * ⑧ 伝え方（自分×相手）辞書（骨格）
 */

import { toPairKey } from './pair_key';

export type CommunicationPairEntry = {
  selfType: string;
  otherType: string;
  /** 効果的な伝え方 */
  tips: string[];
  /** 避けたい伝え方 */
  avoid: string[];
};

/** キー: "{self}x{other}" */
export const communicationPairDictionary: Record<
  string,
  CommunicationPairEntry
> = {
  // TODO(B/C): 伝え方ペア辞書を投入
};

export function getCommunicationPairEntry(
  selfType: string,
  otherType: string,
): CommunicationPairEntry | null {
  return communicationPairDictionary[toPairKey(selfType, otherType)] ?? null;
}
