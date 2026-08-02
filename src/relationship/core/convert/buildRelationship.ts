/**
 * ④ buildRelationship — シード×シード → MutualUnderstanding（下書き生成）
 *
 * 原則: 配列の単純連結を最終出力にしない。
 * 役割付き変換（補完・衝突・位置依存）を行う。
 *
 * ⑤: 本番の正本は pair 辞書（1x1.ts …）。本関数は補助（再生成・差分の種）。
 */

import type { MutualUnderstanding } from '../types/mutual_understanding';
import type { RelationshipTypeSeed } from '../types/relationship_type_seed';
import { toPairKey } from '../data/enneagram/pair_key';
import { getTypeSeed } from './type_seeds';

function first(list: string[], fallback = ''): string {
  return list.find((s) => s.trim().length > 0) ?? fallback;
}

function take(list: string[], n: number): string[] {
  return list.filter((s) => s.trim().length > 0).slice(0, n);
}

/**
 * 2つのシードから関係構造を変換生成する（補助）
 */
export function buildRelationship(
  selfSeed: RelationshipTypeSeed,
  otherSeed: RelationshipTypeSeed,
): MutualUnderstanding {
  const pairKey = toPairKey(selfSeed.code, otherSeed.code);
  const same = selfSeed.code === otherSeed.code;

  const selfStrength = first(selfSeed.strengthAxes, selfSeed.label);
  const otherStrength = first(otherSeed.strengthAxes, otherSeed.label);
  const selfFriction = first(selfSeed.frictionAxes, selfSeed.label);
  const otherFriction = first(otherSeed.frictionAxes, otherSeed.label);

  const statusGood = same
    ? [
        `${selfStrength}を共有し、同じ価値軸で支え合える`,
        `${selfSeed.label}同士として意図のすれ違いが起きにくい面がある`,
      ]
    : [
        `${selfStrength} × ${otherStrength} の補完`,
        `${selfSeed.label}の軸と${otherSeed.label}の軸が組み合わさり、視点が広がる`,
      ];

  const statusBad = same
    ? [
        `同じズレ（${selfFriction}）が重なり、同型の摩擦が起きやすい`,
        `${selfSeed.label}同士で基準差が「同族嫌悪」になりやすい`,
      ]
    : [
        `${selfFriction}と${otherFriction}の優先差が衝突しやすい`,
        `${selfSeed.label}の防御が${otherSeed.label}のズレを刺激しやすい`,
      ];

  const summary = same
    ? `${selfSeed.label}同士：強みの共有と、同型ズレの重複が同時に起きやすい。`
    : `${selfSeed.label}×${otherSeed.label}：${selfStrength}と${otherStrength}の補完と、摩擦軸の衝突が構造的に同居する。`;

  return {
    pairKey,
    summary,
    status: {
      good: statusGood,
      bad: statusBad,
      summary,
    },
    viciousCycle: {
      triggers: same
        ? [
            `${first(selfSeed.viciousTriggers)}が双方で同時に発火しやすい`,
            `同じ過敏点が刺激され、反応がエスカレートしやすい`,
          ]
        : [
            `自分（${selfSeed.label}）側：${first(selfSeed.viciousTriggers)}`,
            `相手（${otherSeed.label}）側：${first(otherSeed.viciousTriggers)}`,
          ],
      loop: [
        `認知：${selfSeed.label}の軸と${otherSeed.label}の軸で解釈差が生じる`,
        `感情：${first(selfSeed.cognitiveGapSelf)}と${first(otherSeed.cognitiveGapSelf)}が刺激される`,
        `行動：${first(selfSeed.viciousLoopHints)}と${first(otherSeed.viciousLoopHints)}が連鎖する`,
      ],
      typePatterns: same
        ? [`${first(selfSeed.viciousLoopHints)}が双方で同期し、膠着しやすい`]
        : [
            `${selfSeed.label}の${first(selfSeed.viciousLoopHints)} × ${otherSeed.label}の${first(otherSeed.viciousLoopHints)}`,
          ],
    },
    cognitiveGap: {
      selfGap: take(selfSeed.cognitiveGapSelf, 3),
      otherGap: take(otherSeed.cognitiveGapSelf, 3),
      interaction: same
        ? [
            `同じズレが鏡写しになり、違いを「相手の問題」と誤認しやすい`,
          ]
        : [
            `${selfSeed.label}の優先と${otherSeed.label}の優先のあいだで、正しさの定義がずれる`,
            `${first(selfSeed.cognitiveGapSelf)}への防御が、相手の${first(otherSeed.cognitiveGapSelf)}を刺激しやすい`,
          ],
    },
    virtuousCycle: {
      actions: same
        ? [
            first(selfSeed.adjustments),
            `共通の強み軸（${selfStrength}）を「共有基準」として言語化する`,
          ].filter(Boolean)
        : [
            `自分は${first(selfSeed.adjustments)}`,
            `相手には${first(otherSeed.adjustments)}を促しやすい関わりを取る`,
          ].filter(Boolean),
      adjustments: [
        `${selfSeed.label}の調整：${first(selfSeed.adjustments)}`,
        `${otherSeed.label}の調整：${first(otherSeed.adjustments)}`,
      ].filter((s) => !s.endsWith('：')),
      reassurance: [
        `${selfSeed.label}の安心：${first(selfSeed.reassurance)}`,
        `${otherSeed.label}の安心：${first(otherSeed.reassurance)}`,
      ].filter((s) => !s.endsWith('：')),
    },
    respect: {
      // 相手を尊重＝相手の respectNeeds／自分の尊重＝自分の respectNeeds
      forOther: take(otherSeed.respectNeeds, 3),
      forSelf: take(selfSeed.respectNeeds, 3),
    },
    responsibility: {
      self: [
        ...take(selfSeed.overAdaptation, 2).map(
          (s) => `${s}傾向を自覚し、自分側で抑える`,
        ),
        ...take(selfSeed.boundaryHints, 1),
      ],
      other: [
        ...take(otherSeed.overAdaptation, 1).map(
          (s) => `${s}傾向は相手側の課題として扱う`,
        ),
        `${otherSeed.label}の強み軸を奪わず、裁量を残す`,
      ],
      boundary: [
        ...take(selfSeed.boundaryHints, 1),
        ...take(otherSeed.boundaryHints, 1),
        `自分が変えられるのは自分の行動まで、相手のタイプ構造そのものは対象外`,
      ],
    },
    defer: {
      reasons: [
        `${first(selfSeed.deferTopics)}は、関係の安全が低いときに悪化しやすい`,
        `${first(otherSeed.deferTopics)}も、準備不足のまま扱うと摩擦が固定化しやすい`,
      ],
      risks: [
        ...take(selfSeed.deferRisks, 1),
        ...take(otherSeed.deferRisks, 1),
      ],
      conditions: [
        `双方の安心条件（${first(selfSeed.reassurance)}／${first(otherSeed.reassurance)}）が一定満たされてから扱う`,
        `話題を小さく分割し、勝敗ではなく理解を目的にする`,
      ],
    },
    communication: {
      // 相手に刺さる言い方を主にし、自分側の癖は避ける側に回す
      do: [
        ...take(otherSeed.communicationDo, 2).map(
          (s) => `相手（${otherSeed.label}）へ：${s}`,
        ),
        ...take(selfSeed.communicationDo, 1).map(
          (s) => `自分（${selfSeed.label}）の軸：${s}`,
        ),
      ],
      avoid: [
        ...take(otherSeed.communicationAvoid, 2).map(
          (s) => `相手へ避けたい：${s}`,
        ),
        ...take(selfSeed.communicationAvoid, 1).map(
          (s) => `自分側で陥りやすい：${s}`,
        ),
      ],
      examples: [
        ...take(otherSeed.communicationExamples, 1).map(
          (s) => `相手向け例：${s}`,
        ),
        ...take(selfSeed.communicationExamples, 1).map(
          (s) => `自分の意図表明例：${s}`,
        ),
      ],
    },
  };
}

/**
 * 純タイプコードから補助生成（正本レジストリが無い／差分確認用）
 */
export function buildRelationshipFromCodes(
  selfCode: string,
  otherCode: string,
): MutualUnderstanding | null {
  const selfSeed = getTypeSeed(selfCode);
  const otherSeed = getTypeSeed(otherCode);
  if (!selfSeed || !otherSeed) return null;
  return buildRelationship(selfSeed, otherSeed);
}
