/**
 * ② 観察ポイント・行動ベース質問の辞書（骨格）
 */

export type ObservationPoint = {
  id: string;
  label: string;
  /** 何を見るか */
  whatToWatch: string;
};

export const observationPointsDictionary = {
  /** タイプ横断の基本観察ポイント */
  general: [
    {
      id: 'stress_reaction',
      label: 'ストレス時の反応',
      whatToWatch: '負荷がかかったとき、どう守り・どう動くか',
    },
    {
      id: 'after_broken_promise',
      label: '約束を破った後の態度',
      whatToWatch: '言い訳・修復・回避・正当化のどれが出るか',
    },
    {
      id: 'guilt',
      label: '罪悪感の出方',
      whatToWatch: '自分責めか、関係修復か、合理化か',
    },
    {
      id: 'consideration',
      label: '他者への配慮の仕方',
      whatToWatch: '先回り・距離・率直・沈黙のどれが多いか',
    },
    {
      id: 'competition',
      label: '競争心の強さ',
      whatToWatch: '比較・成果・勝ち負けへの感度',
    },
    {
      id: 'emotion_expression',
      label: '感情の表現の仕方',
      whatToWatch: '表に出す／抑える／論理化する傾向',
    },
  ] satisfies ObservationPoint[],

  /** 候補タイプ別の追加観察（後で充実） */
  byType: {} as Record<string, ObservationPoint[]>,
};

export const actionBasedQuestionsDictionary = {
  general: [
    '最近、うまくいかなかったとき、最初に何を考えましたか？',
    '約束が守れなかったとき、そのあとどうしましたか？',
    '誰かと意見が割れたとき、どう進めたいですか？',
  ],
  byType: {} as Record<string, string[]>,
};
