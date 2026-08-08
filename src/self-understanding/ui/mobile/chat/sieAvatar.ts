/**
 * sie の人格を UI に反映する定数
 * wingCode はここに含めない（ユーザー情報として返答側で参照する）
 */
export const SIE_AVATAR = {
  id: 'sie',
  name: 'S.I.E.（サイ）',
  color: '#4A6FA5',
  /** 落ち着き・悟りの象徴 */
  icon: '🌿',
} as const;

export type SieAvatar = typeof SIE_AVATAR;
