// reply_style_dictionary.ts
// 人格別返答スタイル辞書（助言フェーズをタイプごとに理解しやすい言語へ）

export type ReplyStyleEntry = {
  tone: string;
  framing: string;
  encouragement: string;
};

export const replyStyleDictionary: Record<string, ReplyStyleEntry> = {
  '9w8': {
    tone: '落ち着いた強さを感じる言い方',
    framing: 'あなたの静かな力を守るための選択という形で伝える',
    encouragement: '強さを外に出しても大丈夫だよ、と安心させる',
  },

  '9w1': {
    tone: '穏やかで丁寧な言い方',
    framing: '調和を保つための自然なステップとして伝える',
    encouragement: 'あなたのペースで大丈夫、と安心させる',
  },

  '1w9': {
    tone: '整った構造的な言い方',
    framing: 'ルール・原則・安定の観点から説明する',
    encouragement: 'あなたの誠実さはそのままでいい、と伝える',
  },

  '7w6': {
    tone: '軽くて明るい言い方',
    framing: '自由度が増える・気持ちが軽くなる方向で伝える',
    encouragement: 'もっと楽に動けるようになるよ、と未来を見せる',
  },
};

export function getReplyStyleEntry(wingCode: string): ReplyStyleEntry | null {
  const normalized = wingCode.trim();
  return replyStyleDictionary[normalized] ?? null;
}
