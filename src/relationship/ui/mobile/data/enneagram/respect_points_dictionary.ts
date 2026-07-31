/**
 * ⑤ 相手を尊重する方法辞書（骨格）
 */

import { toPairKey } from './pair_key';

export type RespectPointsEntry = {
  selfType: string;
  otherType: string;
  /** 尊重のポイント */
  points: string[];
  /** やってはいけないこと */
  avoid: string[];
};

/** キー: "{self}x{other}" */
export const respectPointsDictionary: Record<string, RespectPointsEntry> = {
  // TODO(B/C): 尊重ポイントを投入
};

export function getRespectPointsEntry(
  selfType: string,
  otherType: string,
): RespectPointsEntry | null {
  return respectPointsDictionary[toPairKey(selfType, otherType)] ?? null;
}
