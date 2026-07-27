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

export const communicationStyleForOtherDictionary: Record<
  string,
  CommunicationStyleForOtherEntry
> = {
  // ===== 純タイプ（1〜9） =====
  // TODO: 他者理解向けに精緻化。当面は骨格のみ。
  '1': {
    safe: '誠実さを尊重し、理由と原則を丁寧に示す',
    avoid: '間違いを強く指摘する言い方',
    tip: '「意図は正しい」と先に認めてから話すと安心する',
  },
  '2': {
    safe: '気持ちと貢献を先に認める',
    avoid: '冷たい言い方・無視・軽視',
    tip: '「助けられている」と伝えると安心する',
  },
  '3': {
    safe: '成果と努力を具体的に認める',
    avoid: '価値を否定する言い方・比較だけ',
    tip: '「あなたの強み」を具体的に伝えると響く',
  },
  '4': {
    safe: '個性と感情を尊重する',
    avoid: '分類・一般化・浅い言い方',
    tip: '「あなたらしさ」を守る言い方が安全',
  },
  '5': {
    safe: '知的な距離感を保ち、理由を先に示す',
    avoid: '感情的な押しつけ・曖昧な言い方',
    tip: '情報と根拠を先に出すと納得しやすい',
  },
  '6': {
    safe: '安心と根拠を示す',
    avoid: '急かす・曖昧・重すぎる言い方',
    tip: '「一緒に考える」姿勢と軽い保証が響く',
  },
  '7': {
    safe: '軽く前向きに伝える',
    avoid: '閉塞感・義務だけを押しつける言い方',
    tip: '選択肢が見える話し方だと受け取られやすい',
  },
  '8': {
    safe: '率直に、対等な立場で伝える',
    avoid: '支配・操作・弱さを突く言い方',
    tip: '敬意を先に置き、本音で話すと通じやすい',
  },
  '9': {
    safe: '穏やかに、ペースを尊重して伝える',
    avoid: '急かす・対立を煽る言い方',
    tip: '「急がなくていい」と伝えると安心する',
  },

  // ===== ウイング（必要に応じて追加） =====
};

/** wing 優先。なければ純タイプへフォールバック */
export function getCommunicationStyleForOtherEntry(
  wingCode: string,
): CommunicationStyleForOtherEntry | null {
  const normalized = wingCode.trim();
  if (communicationStyleForOtherDictionary[normalized]) {
    return communicationStyleForOtherDictionary[normalized];
  }
  const base = normalized.charAt(0);
  return communicationStyleForOtherDictionary[base] ?? null;
}
