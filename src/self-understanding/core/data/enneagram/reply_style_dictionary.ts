// reply_style_dictionary.ts
// 人格別返答スタイル辞書（純タイプ9 + ウイング18 = 27）
// tone / framing / encouragement で助言をタイプごとに理解しやすい言語へ翻訳する

export type ReplyStyleEntry = {
  tone: string;
  framing: string;
  encouragement: string;
};

export const replyStyleDictionary: Record<string, ReplyStyleEntry> = {
  // ===== 純タイプ（1〜9） =====
  '1': {
    tone: '誠実で整った言い方',
    framing: '正しさ・原則・改善の観点から伝える',
    encouragement: '完璧でなくても、誠実さはそのままで十分だよ、と伝える',
  },
  '2': {
    tone: 'あたたかく寄り添う言い方',
    framing: 'つながりの中で自分も大切にする選択として伝える',
    encouragement: 'あなたの優しさは十分届いているよ、と安心させる',
  },
  '3': {
    tone: '前向きでクリアな言い方',
    framing: '成果と実感のバランスが取れる進め方として伝える',
    encouragement: 'ありのままでも十分に魅力があるよ、と伝える',
  },
  '4': {
    tone: '繊細で深い言い方',
    framing: '感情と個性を大切にした理解の枠で伝える',
    encouragement: 'その感覚はあなたらしさの一部だよ、と受け止める',
  },
  '5': {
    tone: '静かで知的な言い方',
    framing: '理解と余白を守るための整理として伝える',
    encouragement: 'ゆっくり考えていいし、距離を取っても大丈夫だよ、と伝える',
  },
  '6': {
    tone: '誠実で支えのある言い方',
    framing: '安心と備えを積み上げるステップとして伝える',
    encouragement: '疑う力は守りにもなるよ、と安心させる',
  },
  '7': {
    tone: '軽やかで明るい言い方',
    framing: '選択肢が増えて気持ちが軽くなる方向で伝える',
    encouragement: '楽しさと安定は両立できるよ、と未来を見せる',
  },
  '8': {
    tone: '率直で力強い言い方',
    framing: '主導権と境界を守るための選択として伝える',
    encouragement: '強さのまま、守る側でいていいよ、と伝える',
  },
  '9': {
    tone: '穏やかで落ち着いた言い方',
    framing: '平和を保ちながら自分の声を出す形で伝える',
    encouragement: 'あなたのペースで、静かに前へ進んでいいよ、と安心させる',
  },

  // ===== ウイング（18） =====
  '1w2': {
    tone: '誠実で思いやりのある言い方',
    framing: '正しさと貢献が両立する改善として伝える',
    encouragement: '助けたい気持ちと自分の基準、両方大切にしていいよ、と伝える',
  },
  '1w9': {
    tone: '整った構造的な言い方',
    framing: 'ルール・原則・安定の観点から説明する',
    encouragement: 'あなたの誠実さはそのままでいい、と伝える',
  },

  '2w1': {
    tone: '温かく誠実な言い方',
    framing: '思いやりを、健全な境界の中で生かす形で伝える',
    encouragement: '正しく助けようとする気持ちは、すでに立派だよ、と安心させる',
  },
  '2w3': {
    tone: '明るく前向きな言い方',
    framing: '関係と達成の両方を満たす動きとして伝える',
    encouragement: '認められることと与えることは、両立できるよ、と伝える',
  },

  '3w2': {
    tone: '明るく人懐っこい言い方',
    framing: '成果を関係性の中で活かす道筋として伝える',
    encouragement: '結果だけじゃなく、あなた自身の魅力もちゃんと見えてるよ、と伝える',
  },
  '3w4': {
    tone: '洗練されて少し内省的な言い方',
    framing: '成果と個性の両方を大切にする枠で伝える',
    encouragement: '独自性があるままで、十分に輝けるよ、と伝える',
  },

  '4w3': {
    tone: '情緒的で表現豊かな言い方',
    framing: '感情を形にして届けるプロセスとして伝える',
    encouragement: '感じたことを表に出していいし、それで届くよ、と伝える',
  },
  '4w5': {
    tone: '静かで深い言い方',
    framing: '内面の豊かさを守りながら理解を深める形で伝える',
    encouragement: '静かでも、あなたの世界はちゃんと価値があるよ、と安心させる',
  },

  '5w4': {
    tone: '静かで詩的な言い方',
    framing: '理解と個性の余白を守る整理として伝える',
    encouragement: '距離を取りながら感じてもいいよ、と伝える',
  },
  '5w6': {
    tone: '落ち着いた分析的な言い方',
    framing: '安全に理解を積み上げる手順として伝える',
    encouragement: '確かめてから動くやり方で、十分いいよ、と安心させる',
  },

  '6w5': {
    tone: '慎重で誠実な言い方',
    framing: '安心材料を一つずつ揃える進め方として伝える',
    encouragement: '疑いは弱さじゃなく、守りのための知恵だよ、と伝える',
  },
  '6w7': {
    tone: '誠実で少し明るい言い方',
    framing: '安心と可能性を両方見る枠で伝える',
    encouragement: '心配しつつも、少しずつ挑戦していいよ、と安心させる',
  },

  '7w6': {
    tone: '軽くて明るい言い方',
    framing: '自由度が増える・気持ちが軽くなる方向で伝える',
    encouragement: 'もっと楽に動けるようになるよ、と未来を見せる',
  },
  '7w8': {
    tone: '勢いがあって率直な言い方',
    framing: '自由と実行力を一緒に使う選択として伝える',
    encouragement: 'やりたいことを、力強く進めていいよ、と伝える',
  },

  '8w7': {
    tone: '力強く軽快な言い方',
    framing: '主導権を保ちつつ可能性を広げる形で伝える',
    encouragement: '強さと楽しさ、両方持っていていいよ、と伝える',
  },
  '8w9': {
    tone: '落ち着いた力強さのある言い方',
    framing: '守りたいものを、静かに守る選択として伝える',
    encouragement: '強くあっても、穏やかでいていいよ、と安心させる',
  },

  '9w1': {
    tone: '穏やかで丁寧な言い方',
    framing: '調和を保つための自然なステップとして伝える',
    encouragement: 'あなたのペースで大丈夫、と安心させる',
  },
  '9w8': {
    tone: '落ち着いた強さを感じる言い方',
    framing: 'あなたの静かな力を守るための選択という形で伝える',
    encouragement: '強さを外に出しても大丈夫だよ、と安心させる',
  },
};

/** wing 優先。なければ純タイプへフォールバック */
export function getReplyStyleEntry(wingCode: string): ReplyStyleEntry | null {
  const normalized = wingCode.trim();
  if (replyStyleDictionary[normalized]) {
    return replyStyleDictionary[normalized];
  }
  const base = normalized.charAt(0);
  return replyStyleDictionary[base] ?? null;
}
