// communication_style_dictionary.ts
// タイプ別伝え方ガイド（地雷回避・安全な伝え方）
// 他者理解モジュール向け：伝え方を間違えると情報伝達すら崩れるため辞書化する

export type CommunicationStyleEntry = {
  /** 安心して受け取れる伝え方 */
  safe: string;
  /** 地雷になりやすい言い方 */
  avoid: string;
  /** 響くコツ */
  tip: string;
};

export const communicationStyleDictionary: Record<
  string,
  CommunicationStyleEntry
> = {
  // ===== 純タイプ（1〜9） =====
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
    avoid: '重い言い方・制限・指示',
    tip: '「自由度が増える」「選択肢がある」方向で話すと動ける',
  },
  '8': {
    safe: '強さと主導権を尊重する',
    avoid: '決めつけ・支配・強い圧',
    tip: '「あなたが選べる」形で伝えると安心する',
  },
  '9': {
    safe: '穏やかで丁寧に伝える',
    avoid: '強い言い方・急かす・強制',
    tip: '「あなたのペースでいい」と伝えると安心する',
  },

  // ===== ウイング（18） =====
  '1w9': {
    safe: '誠実さを尊重し、構造的に説明する',
    avoid: '間違いを強く指摘する言い方',
    tip: '原則や理由を丁寧に示すと安心する',
  },
  '1w2': {
    safe: '善意と誠実さを認めながら話す',
    avoid: '批判だけを伝えること',
    tip: '「あなたの意図は良い」と先に伝える',
  },

  '2w1': {
    safe: '気持ちを先に認める',
    avoid: '冷たい言い方',
    tip: '「助けられている」と伝えると安心する',
  },
  '2w3': {
    safe: '貢献を認める',
    avoid: '無視・軽視',
    tip: '「あなたのおかげで助かっている」と言うと響く',
  },

  '3w2': {
    safe: '成果と努力を認める',
    avoid: '価値を否定する言い方',
    tip: '「あなたの強み」を具体的に伝える',
  },
  '3w4': {
    safe: '独自性と成果の両方を認める',
    avoid: '比較・評価だけの言い方',
    tip: '「あなたらしさ」を含めると響く',
  },

  '4w3': {
    safe: '個性と感情を尊重する',
    avoid: '分類・一般化',
    tip: '「あなたの特別さ」を守る言い方が安全',
  },
  '4w5': {
    safe: '深さと独自性を尊重する',
    avoid: '浅い言い方',
    tip: '「その感情の意味」を一緒に探ると安心する',
  },

  '5w4': {
    safe: '知的な距離感を保つ',
    avoid: '感情的な押しつけ',
    tip: '情報・理由を先に示すと安心する',
  },
  '5w6': {
    safe: '構造と安全性を示す',
    avoid: '曖昧な言い方',
    tip: '「根拠」を示すと納得しやすい',
  },

  '6w5': {
    safe: '安心と根拠を示す',
    avoid: '急かす・曖昧',
    tip: '「一緒に考える」という姿勢が響く',
  },
  '6w7': {
    safe: '安心と軽さのバランス',
    avoid: '重すぎる言い方',
    tip: '「大丈夫だよ」と軽く保証すると動ける',
  },

  '7w6': {
    safe: '軽く前向きに伝える',
    avoid: '重い言い方',
    tip: '「自由度が増える」方向で話すと響く',
  },
  '7w8': {
    safe: '自由と力を尊重する',
    avoid: '制限・指示',
    tip: '「選択肢」を示すと動きやすい',
  },

  '8w7': {
    safe: '強さと主導権を尊重する',
    avoid: '決めつけ・支配',
    tip: '「あなたが選べる」形で伝える',
  },
  '8w9': {
    safe: '静かな強さを尊重する',
    avoid: '強い圧',
    tip: '境界線を守りながら話すと安心する',
  },

  '9w8': {
    safe: '穏やかさと静かな強さを尊重する',
    avoid: '強い言い方',
    tip: '「あなたのペースでいい」と伝える',
  },
  '9w1': {
    safe: '穏やかで丁寧に伝える',
    avoid: '急かす・強制',
    tip: '調和を守る方向で話すと安心する',
  },
};

/** wing 優先。なければ純タイプへフォールバック */
export function getCommunicationStyleEntry(
  wingCode: string
): CommunicationStyleEntry | null {
  const normalized = wingCode.trim();
  if (communicationStyleDictionary[normalized]) {
    return communicationStyleDictionary[normalized];
  }
  const base = normalized.charAt(0);
  return communicationStyleDictionary[base] ?? null;
}
