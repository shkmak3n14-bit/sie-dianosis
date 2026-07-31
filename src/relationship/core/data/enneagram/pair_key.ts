/**
 * ペアキー共通ユーティリティ
 * 例: self=9, other=3 → "9x3"
 */

export function toPairKey(selfType: string, otherType: string): string {
  return `${normalizeType(selfType)}x${normalizeType(otherType)}`;
}

export function normalizeType(type: string): string {
  const m = String(type).match(/[1-9]/);
  return m ? m[0] : String(type).trim();
}
