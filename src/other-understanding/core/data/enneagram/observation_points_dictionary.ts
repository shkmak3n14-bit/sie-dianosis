/**
 * ② 観察ポイント・行動ベース質問の辞書
 * - byType: UI／観察計画向け（配列）
 * - observationPoints: type_inference 向け（3軸オブジェクト）
 */

export type ObservationPoint = {
  id: string;
  label: string;
  /** 何を見るか */
  whatToWatch: string;
};

/** タイプ推測用：行動・感情・認知の3軸 */
export type TypeObservationAxes = {
  behavior: string;
  emotion: string;
  cognition: string;
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

  /** 候補タイプ別の追加観察（最小構成: 9タイプ×3軸） */
  byType: {
    // 1：改革する人
    '1': [
      {
        id: 't1_behavior_rule_violation',
        label: '行動（改革）: ルール違反への反応',
        whatToWatch: 'ルール違反や不正を見たときに強く反応するか',
      },
      {
        id: 't1_emotion_truth_anger',
        label: '感情（改革）: 怒りが正しさの主張に',
        whatToWatch: '怒りが「正しさの主張」として表れやすいか',
      },
      {
        id: 't1_cognition_ethics_consistency',
        label: '認知（改革）: 一貫性・倫理・正しさ',
        whatToWatch: '判断基準が一貫性・倫理・正しさに寄っているか',
      },
    ],

    // 2：助ける人
    '2': [
      {
        id: 't2_behavior_need_response',
        label: '行動（支援）: ニーズへの即応',
        whatToWatch: '他者のニーズに素早く反応し、手助けを優先するか',
      },
      {
        id: 't2_emotion_gratitude_loneliness',
        label: '感情（支援）: 感謝されないと寂しさ',
        whatToWatch: '感謝されないときに寂しさや不満が出やすいか',
      },
      {
        id: 't2_cognition_relationship_temperature',
        label: '認知（支援）: 関係の温度感＋他者の感情',
        whatToWatch: '人間関係の温度感と他者の感情を中心に判断するか',
      },
    ],

    // 3：達成する人
    '3': [
      {
        id: 't3_behavior_goal_optimization',
        label: '行動（達成）: 効率化と最適化',
        whatToWatch: '目標達成のために行動を最適化し、効率を重視するか',
      },
      {
        id: 't3_emotion_failure_tension',
        label: '感情（達成）: 失敗・停滞への焦り',
        whatToWatch: '失敗や停滞に強い焦りが出るか',
      },
      {
        id: 't3_cognition_success_metrics',
        label: '認知（達成）: 成果・評価・成功',
        whatToWatch: '成果・評価・成功を基準に意思決定するか',
      },
    ],

    // 4：個性を求める人
    '4': [
      {
        id: 't4_behavior_unique_expression',
        label: '行動（個性）: 独自性の表現',
        whatToWatch: '感情の深さや独自性を表現しようとするか',
      },
      {
        id: 't4_emotion_loneliness_loss',
        label: '感情（個性）: 寂しさ・喪失・孤独感',
        whatToWatch: '寂しさ・喪失感・孤独感が強く出やすいか',
      },
      {
        id: 't4_cognition_authentic_self',
        label: '認知（個性）: 本物らしさ',
        whatToWatch: '自分らしさ・本物らしさを基準に世界を理解するか',
      },
    ],

    // 5：調べる人
    '5': [
      {
        id: 't5_behavior_distance_research',
        label: '行動（探究）: 距離を取り情報収集',
        whatToWatch: '距離を取り、情報収集や分析に時間を使うか',
      },
      {
        id: 't5_emotion_inner_suppression',
        label: '感情（探究）: 感情表現が控えめ',
        whatToWatch: '感情表現が控えめで、内側に閉じやすいか',
      },
      {
        id: 't5_cognition_understanding_rationality',
        label: '認知（探究）: 理解・知識・合理性',
        whatToWatch: '理解・知識・合理性を基準に判断するか',
      },
    ],

    // 6：忠実な人
    '6': [
      {
        id: 't6_behavior_risk_precheck',
        label: '行動（忠実）: リスクの事前チェック',
        whatToWatch: 'リスクや不確実性を事前にチェックするか',
      },
      {
        id: 't6_emotion_anxiety_hypervigilance',
        label: '感情（忠実）: 不安→慎重さ/過警戒',
        whatToWatch:
          '不安が強く出ると、慎重さか過警戒に振れるか',
      },
      {
        id: 't6_cognition_safety_trust_predictability',
        label: '認知（忠実）: 安全・信頼・予測可能性',
        whatToWatch: '安全・信頼・予測可能性を基準に意思決定するか',
      },
    ],

    // 7：熱中する人
    '7': [
      {
        id: 't7_behavior_seek_novelty',
        label: '行動（熱中）: 新体験/刺激を追う',
        whatToWatch: '新しい体験や刺激を求めて行動が広がるか',
      },
      {
        id: 't7_emotion_avoid_negative',
        label: '感情（熱中）: ネガ感情を避け楽観で上書き',
        whatToWatch: 'ネガティブ感情を避け、楽観で上書きしやすいか',
      },
      {
        id: 't7_cognition_possibility_choices',
        label: '認知（熱中）: 可能性・楽しさ・選択肢',
        whatToWatch: '可能性・楽しさ・選択肢の多さを基準に判断するか',
      },
    ],

    // 8：挑戦する人
    '8': [
      {
        id: 't8_behavior_direct_leadership',
        label: '行動（挑戦）: 率直で強い態度/主導権',
        whatToWatch: '率直で強い態度を取り、主導権を握ろうとするか',
      },
      {
        id: 't8_emotion_anger_boundary_claim',
        label: '感情（挑戦）: 怒りが境界線の主張に',
        whatToWatch: '怒りが「境界線の主張」として表れやすいか',
      },
      {
        id: 't8_cognition_strength_autonomy',
        label: '認知（挑戦）: 強さ・自立・支配されないこと',
        whatToWatch: '強さ・自立・支配されないことを基準に判断するか',
      },
    ],

    // 9：平和を求める人
    '9': [
      {
        id: 't9_behavior_conflict_avoidance_adapt',
        label: '行動（平和）: 衝突回避＋周囲への合わせ',
        whatToWatch: '衝突を避け、周囲に合わせて行動するか',
      },
      {
        id: 't9_emotion_repressed_anger',
        label: '感情（平和）: 怒りが抑圧され表に出にくい',
        whatToWatch: '怒りが抑圧され、表に出にくいか',
      },
      {
        id: 't9_cognition_harmony_peace_stability',
        label: '認知（平和）: 安定・調和・平和',
        whatToWatch: '安定・調和・平和を基準に意思決定するか',
      },
    ],

  } as Record<string, ObservationPoint[]>,
};

// wing は最小構成のため、純タイプ（核タイプ）の観察ポイントを使い回す
const _wingBase = observationPointsDictionary.byType;
_wingBase['1w2'] = _wingBase['1'];
_wingBase['1w9'] = _wingBase['1'];
_wingBase['2w1'] = _wingBase['2'];
_wingBase['2w3'] = _wingBase['2'];
_wingBase['3w2'] = _wingBase['3'];
_wingBase['3w4'] = _wingBase['3'];
_wingBase['4w3'] = _wingBase['4'];
_wingBase['4w5'] = _wingBase['4'];
_wingBase['5w4'] = _wingBase['5'];
_wingBase['5w6'] = _wingBase['5'];
_wingBase['6w5'] = _wingBase['6'];
_wingBase['6w7'] = _wingBase['6'];
_wingBase['7w6'] = _wingBase['7'];
_wingBase['7w8'] = _wingBase['7'];
_wingBase['8w7'] = _wingBase['8'];
_wingBase['8w9'] = _wingBase['8'];
_wingBase['9w1'] = _wingBase['9'];
_wingBase['9w8'] = _wingBase['9'];

/**
 * type_inference 用：純タイプ1〜9の観察ポイント（3軸）
 * byType の whatToWatch から組み立てる。
 */
function axesFromByType(typeId: string): TypeObservationAxes {
  const points = observationPointsDictionary.byType[typeId] ?? [];
  const find = (axis: 'behavior' | 'emotion' | 'cognition') =>
    points.find((p) => p.id.includes(`_${axis}_`))?.whatToWatch ?? '';
  return {
    behavior: find('behavior'),
    emotion: find('emotion'),
    cognition: find('cognition'),
  };
}

export const observationPoints: Record<string, TypeObservationAxes> = {
  '1': axesFromByType('1'),
  '2': axesFromByType('2'),
  '3': axesFromByType('3'),
  '4': axesFromByType('4'),
  '5': axesFromByType('5'),
  '6': axesFromByType('6'),
  '7': axesFromByType('7'),
  '8': axesFromByType('8'),
  '9': axesFromByType('9'),
};

export const actionBasedQuestionsDictionary = {
  general: [
    '最近、うまくいかなかったとき、最初に何を考えましたか？',
    '約束が守れなかったとき、そのあとどうしましたか？',
    '誰かと意見が割れたとき、どう進めたいですか？',
  ],
  byType: {} as Record<string, string[]>,
};
