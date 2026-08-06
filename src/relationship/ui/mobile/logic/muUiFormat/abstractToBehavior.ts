/**
 * 抽象語 → 観察できる行動 の変換テーブル
 *
 * self / other / relationship の視点別に整理し、随時拡張する。
 */

export const abstractToBehavior: Record<string, string> = {
  // --- self（あなた） ---
  慎重: '状況をよく見てから動く',
  保護: 'ここまでは支える',
  調整: '相手の状態を見て動きを合わせる',
  不安: '分からない部分をそのまま伝える',
  役割: '自分の責任範囲を明確にする',
  境界: 'ここまでは理解できると伝える',
  安定: '落ち着いて状況を整理する',
  予測: '先の展開を考えて行動する',
  自律: '自分のペースを守って動く',
  余裕: 'ゆっくり考えてから動く',

  // --- other（相手） ---
  推進力: 'すぐに行動に移す',
  効率: '最短ルートを選ぶ',
  前進: '早く結果を出そうとする',
  信頼: '理解されると安心する',
  依存: '支えられると動ける',
  速度: 'テンポよく進める',
  直感: '感覚で判断して動く',
  期待: 'あなたの反応を気にして動く',
  変化: '状況に合わせてすぐ動く',
  承認不安: '認められない不安で慎重になる',
  希薄化: '自分の気持ちが分かりにくくなる',

  // --- relationship（二人） ---
  調和: '互いの動きが自然に噛み合う',
  補完: 'あなたの守りと相手の前進が補い合う',
  安心: '落ち着いて動ける雰囲気になる',
  緊張: 'すれ違いが起きやすい',
  協力: '役割分担がうまくいく',
  衝突: '意見がぶつかりやすい',
  すれ違い: '考え方がズレて誤解が起きる',
  誤読: '相手の言葉を誤解する',
  読み合い: '相手の反応を先回りして気遣う',
  バランス: '互いの強みがちょうどよく働く',
  雰囲気: '安心して話せる空気になる',

  // --- 拡張（辞書ドメインで頻出） ---
  推進: 'すぐに行動に移す',
  守り: '境界線を引いて守る',
  主導: '先に方向を示す',
  一貫性: '方針をぶらさず進める',
  土台: '安心して動ける土台をつくる',
  成果: '目に見える結果を出す',
  印象管理: '場に合わせて見え方を整える',
  印象: '場に合わせた見え方',
  承認: '認めていると伝える',
  魅力: '好かれる動きを優先する',
  役立ち: '相手の役に立つ動きをする',
  本音: '素の気持ちを出す',
  弱さ: '不安や限界を出す',
  圧: '強く決着を急ぐ',
  決着: '早く結論を出す',
  撤退: '距離を取って場を離れる',
  一線: 'これ以上は踏み込まないと伝える',
  誤解: 'すれ違い',
  認知のズレ: '考え方の違い',
  ズレ: '考え方の違い',
  柔軟: '状況に合わせて変えられる',
  クレジット: '相手の貢献に敬意を示す',
  敬意: '相手の貢献を認める',
  黄信号: '「ちょっと厳しい」と早めに伝える',
  開示: '短い一言で気持ちを共有する',
  固定: '同じ反応を繰り返してしまう',
  固定化: '反応がパターン化して変えにくくなる',
};

/** @deprecated abstractToBehavior を使用 */
export const ABSTRACT_TO_BEHAVIOR = abstractToBehavior;

/** 視点別（拡張・参照用） */
export const abstractToBehaviorBySide = {
  self: {
    慎重: abstractToBehavior['慎重'],
    保護: abstractToBehavior['保護'],
    調整: abstractToBehavior['調整'],
    不安: abstractToBehavior['不安'],
    役割: abstractToBehavior['役割'],
    境界: abstractToBehavior['境界'],
    安定: abstractToBehavior['安定'],
    予測: abstractToBehavior['予測'],
    自律: abstractToBehavior['自律'],
    余裕: abstractToBehavior['余裕'],
  },
  other: {
    推進力: abstractToBehavior['推進力'],
    効率: abstractToBehavior['効率'],
    前進: abstractToBehavior['前進'],
    信頼: abstractToBehavior['信頼'],
    依存: abstractToBehavior['依存'],
    速度: abstractToBehavior['速度'],
    直感: abstractToBehavior['直感'],
    期待: abstractToBehavior['期待'],
    変化: abstractToBehavior['変化'],
    承認不安: abstractToBehavior['承認不安'],
    希薄化: abstractToBehavior['希薄化'],
  },
  relationship: {
    調和: abstractToBehavior['調和'],
    補完: abstractToBehavior['補完'],
    安心: abstractToBehavior['安心'],
    緊張: abstractToBehavior['緊張'],
    協力: abstractToBehavior['協力'],
    衝突: abstractToBehavior['衝突'],
    すれ違い: abstractToBehavior['すれ違い'],
    誤読: abstractToBehavior['誤読'],
    読み合い: abstractToBehavior['読み合い'],
    バランス: abstractToBehavior['バランス'],
    雰囲気: abstractToBehavior['雰囲気'],
  },
} as const;

/** 長い語から順に置換（部分一致の衝突を減らす） */
const SORTED_ABSTRACT_KEYS = Object.keys(abstractToBehavior).sort(
  (a, b) => b.length - a.length,
);

/** 抽象語置換の対象外（複合語・ラベル・辞書固有フレーズ） */
const PROTECTED_PHRASES = [
  'タイプ8の調整',
  'タイプ3の調整',
  'タイプ8の安心',
  'タイプ3の安心',
  '方針の一貫性',
  '成果承認',
  '成果積み上げ',
  '成果偏重',
  '成果ニーズ',
  '変化共有',
  '段階的開示',
  '強制開示',
  '全面開示',
  '素の疲れ開示',
  '一行開示',
  '後出し評価',
  '即時決着',
  '短い交渉文',
  '保護の一線',
  'クレジット付き',
  '守り切る',
  'ころころ変化',
  '弱さ隠蔽',
  '弱さ否認',
  '弱さ否定',
  '決着要求',
  '本音の空白',
  '本音の後回し',
  '役立ちの演技',
  '見せ方判断',
  '非効率',
  '責任ある推進役',
].sort((a, b) => b.length - a.length);

function protectPhrases(text: string): { text: string; restore: (s: string) => string } {
  const stored: string[] = [];
  let result = text;
  for (const phrase of PROTECTED_PHRASES) {
    if (!result.includes(phrase)) continue;
    const token = `\x01${stored.length}\x01`;
    stored.push(phrase);
    result = result.split(phrase).join(token);
  }
  return {
    text: result,
    restore: (s) => {
      let out = s;
      for (let i = 0; i < stored.length; i++) {
        out = out.split(`\x01${i}\x01`).join(stored[i]);
      }
      return out;
    },
  };
}

/**
 * 抽象語を観察可能な行動表現へ置換する
 */
export function replaceAbstractTerms(text: string): string {
  const { text: protectedText, restore } = protectPhrases(text);
  const placeholders: string[] = [];
  let result = protectedText;
  for (const key of SORTED_ABSTRACT_KEYS) {
    const value = abstractToBehavior[key];
    if (!value || !result.includes(key)) continue;
    const placeholder = `\x00${placeholders.length}\x00`;
    placeholders.push(value);
    result = result.split(key).join(placeholder);
  }
  for (let i = 0; i < placeholders.length; i++) {
    result = result.split(`\x00${i}\x00`).join(placeholders[i]);
  }
  return restore(result);
}

/**
 * 単一の抽象語キーを行動表現へ（未知語はそのまま）
 */
export function abstractToObservable(term: string): string {
  const trimmed = term.trim();
  return abstractToBehavior[trimmed] ?? replaceAbstractTerms(trimmed);
}
