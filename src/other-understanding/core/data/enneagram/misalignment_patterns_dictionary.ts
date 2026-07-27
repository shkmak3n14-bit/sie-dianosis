/**
 * ③ 認知ズレパターン辞書（骨格）
 *
 * 例:
 * 1w9：予定は守るべきもの
 * 3w2：予定は状況に合わせて最適化するもの
 */

export type MisalignmentPattern = {
  id: string;
  consultantLens: string;
  otherLens: string;
  /** ズレが現れやすい場面 */
  scenes: string[];
  /** ズレを埋めるヒント */
  bridgeHints: string[];
  /** 埋めずに棚上げすべき点 */
  deferHints: string[];
};

export const misalignmentPatternsDictionary = {
  /**
   * キー: `${consultantType}__${otherType}`
   * 例: `1w9__3w2` / `1__3`
   */
  byPair: {
    '1w9__3w2': [
      {
        id: 'schedule_integrity_vs_optimization',
        consultantLens: '予定は守るべきもの',
        otherLens: '予定は状況に合わせて最適化するもの',
        scenes: [
          '約束の変更が続く場面',
          '締切直前の優先度の切り替え',
        ],
        bridgeHints: [
          '変更があるなら「いつ・何を・なぜ」を先に共有する',
          '守る約束と動かせる約束を分けて合意する',
        ],
        deferHints: [
          '予定の「正しさ」そのものの価値観論争',
        ],
      },
    ],
    '1__3': [
      {
        id: 'integrity_vs_effectiveness',
        consultantLens: '正しさ・一貫性を軸に見る',
        otherLens: '成果・適応を軸に見る',
        scenes: ['評価の基準が食い違う会議・話し合い'],
        bridgeHints: [
          '「何を成功とみなすか」を先にそろえる',
        ],
        deferHints: [
          '正しさ vs 成果のどちらか一方だけを正しいとする議論',
        ],
      },
    ],
  } as Record<string, MisalignmentPattern[]>,
};
