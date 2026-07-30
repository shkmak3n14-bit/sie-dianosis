/**
 * 他者理解向け：伝え方辞書
 * 相談者が「相手」に話すときの safe / avoid / tip
 * self-understanding の communication_style_dictionary と対になる。
 */

export type CommunicationStyleForOtherEntry = {
  /** 相手に安心して届く伝え方 */
  safe: string;
  /** 地雷になりやすい言い方 */
  avoid: string;
  /** 関係を保ちながら伝えるコツ */
  tip: string;
};

/**
 * 最小構成:
 * - safe: 相手が安心して受け取れる伝え方
 * - avoid: 相手が傷つく・誤解する伝え方
 * - tip: 関係が前進する伝え方のコツ
 */
export const communicationStyles: Record<
  string,
  CommunicationStyleForOtherEntry
> = {
  '1': {
    safe: '事実ベースで一貫した説明をする',
    avoid: '曖昧な表現、感情だけの訴え',
    tip: '正しさが長期的な利益につながる形で話す',
  },
  '2': {
    safe: '感謝・気持ちを先に伝える',
    avoid: '冷たい態度、突き放す言い方',
    tip: '気持ちを短く言語化し、相手の温度感を尊重する',
  },
  '3': {
    safe: '結論を先に、短く明確に伝える',
    avoid: '長い前置き、非効率な説明',
    tip: '成果につながる理由を添えると動きが早くなる',
  },
  '4': {
    safe: '感情の理由を丁寧に共有する',
    avoid: '表面的な言葉、感情の否定',
    tip: '本物らしさを尊重しつつ、短く気持ちを伝える',
  },
  '5': {
    safe: '事実・根拠を簡潔に伝える',
    avoid: '感情の押しつけ、急な距離の詰め方',
    tip: '距離感を尊重しつつ、必要な情報だけ渡す',
  },
  '6': {
    safe: '安心感を先に与える、理由を丁寧に説明する',
    avoid: '曖昧な指示、急な変更',
    tip: '確認行動を否定せず、予測可能性を保つ',
  },
  '7': {
    safe: '明るく、未来志向で伝える',
    avoid: '重い話題、ネガティブの押しつけ',
    tip: '楽しさと目的をセットで伝えると動きが良くなる',
  },
  '8': {
    safe: '率直に、短く、事実ベースで伝える',
    avoid: '遠回し、弱さの押しつけ',
    tip: '強さを尊重しつつ、境界線を明確にする',
  },
  '9': {
    safe: '穏やかに、ゆっくり、衝突のない言い方',
    avoid: '強い圧、急な決断の要求',
    tip: '本音を短く共有し、ペースを尊重する',
  },
};

/** 後方互換エイリアス */
export const communicationStyleForOtherDictionary = communicationStyles;

/** wing 優先。なければ純タイプへフォールバック */
export function getCommunicationStyleForOtherEntry(
  wingCode: string,
): CommunicationStyleForOtherEntry | null {
  const normalized = wingCode.trim();
  if (communicationStyles[normalized]) {
    return communicationStyles[normalized];
  }
  const base = normalized.charAt(0);
  return communicationStyles[base] ?? null;
}
