/**
 * 他者理解向け：サイ返答スタイル辞書
 * 相談者への助言を、相手理解の文脈で翻訳する（tone / framing / encouragement）
 * self-understanding の reply_style_dictionary と対になる。
 */

export type ReplyStyleForOtherEntry = {
  tone: string;
  framing: string;
  encouragement: string;
};

export const replyStyleForOtherDictionary: Record<
  string,
  ReplyStyleForOtherEntry
> = {
  // ===== 純タイプ（1〜9） =====
  // 相談者タイプに合わせた「相手理解」の伝え方
  '1': {
    tone: '誠実で整った言い方',
    framing: '相手の原則と、あなたの基準の違いとして整理する',
    encouragement: '正しさを手放さずとも、相手の意図を先に見てもいいよ、と伝える',
  },
  '2': {
    tone: 'あたたかく寄り添う言い方',
    framing: 'つながりを保ちつつ、相手の自立も尊重する形で伝える',
    encouragement: '相手を助ける前に、相手のペースを見てもいいよ、と安心させる',
  },
  '3': {
    tone: '前向きでクリアな言い方',
    framing: '相手の成果志向と、あなたの期待のズレとして伝える',
    encouragement: '効率だけでなく、相手の動機も見ていいよ、と伝える',
  },
  '4': {
    tone: '繊細で深い言い方',
    framing: '相手の感情の深さ／浅さを、個性の差として伝える',
    encouragement: '感じ方の違いは欠陥ではないよ、と受け止める',
  },
  '5': {
    tone: '静かで知的な言い方',
    framing: '相手の距離感と情報の出し方の差として整理する',
    encouragement: '理解しきれなくても、観察を続けていいよ、と伝える',
  },
  '6': {
    tone: '誠実で支えのある言い方',
    framing: '安心の作り方の違いとして、相手の守り方を伝える',
    encouragement: '疑いは守り。相手の守り方も同じように見ていいよ、と安心させる',
  },
  '7': {
    tone: '軽やかで明るい言い方',
    framing: '相手の自由さと、あなたの期待の重さの差として伝える',
    encouragement: '相手を縛らずに関わり方を選べるよ、と未来を見せる',
  },
  '8': {
    tone: '率直で力強い言い方',
    framing: '主導権と境界の取り方の差として伝える',
    encouragement: '強さのまま、相手の領域を侵さずにいていいよ、と伝える',
  },
  '9': {
    tone: '穏やかで落ち着いた言い方',
    framing: '平和を保ちながら、相手とのズレを言葉にする形で伝える',
    encouragement: '対立を避けつつ、自分の見え方も出していいよ、と安心させる',
  },

  // ===== ウイング（必要に応じて追加） =====
};

/** wing 優先。なければ純タイプへフォールバック */
export function getReplyStyleForOtherEntry(
  wingCode: string,
): ReplyStyleForOtherEntry | null {
  const normalized = wingCode.trim();
  if (replyStyleForOtherDictionary[normalized]) {
    return replyStyleForOtherDictionary[normalized];
  }
  const base = normalized.charAt(0);
  return replyStyleForOtherDictionary[base] ?? null;
}
