import {
  adjustmentTips,
  communicationStyles,
  misalignmentPatterns,
  observationTags,
  stressPatterns,
} from '../data/enneagram';

export type DailyAnalysisResult = {
  background: string;
  misalignment: string;
  adjustment: string[];
  communication_safe: string;
  communication_avoid: string;
  tagHits: string[];
};

function normalizeType(typeCode: string): string {
  const t = typeCode.trim();
  const base = t.charAt(0);
  return base >= '1' && base <= '9' ? base : '9';
}

function inferBackground(
  tagHits: string[],
  stress:
    | {
        trigger: string;
        signs: string[];
        recovery_hint: string;
      }
    | undefined,
  misalign:
    | {
        cognitive_gap: string;
      }
    | undefined,
): string {
  const hitText =
    tagHits.length > 0
      ? `一致した特徴タグ: ${tagHits.join(' / ')}`
      : '一致した特徴タグは少なめ';
  const signs = stress?.signs?.slice(0, 2).join(' / ') ?? 'ストレス兆候は限定的';
  const trigger = stress?.trigger ?? '状況要因の影響が考えられる';
  const gap = misalign?.cognitive_gap ?? '認知のズレ情報は限定的';

  return [
    `${hitText} から、相手は「${trigger}」に反応している可能性があります。`,
    `ストレス時には「${signs}」が出やすい傾向です。`,
    `背景には「${gap}」の見方の違いが影響していると推測されます。`,
  ].join('\n');
}

function inferMisalignment(
  episodeText: string,
  misalign:
    | {
        cognitive_gap: string;
        friction_points: string;
      }
    | undefined,
): string {
  const firstFriction =
    misalign?.friction_points
      ?.split('\n')
      .map((v) => v.trim())
      .filter(Boolean)[0] ?? '';

  if (!misalign) {
    return '認知のズレ情報が不足しているため、追加エピソードが必要です。';
  }

  const cue =
    episodeText.length > 40
      ? `今回の出来事（${episodeText.slice(0, 40)}…）`
      : `今回の出来事（${episodeText}）`;

  return [
    `${cue}では「${misalign.cognitive_gap}」がズレとして出ている可能性があります。`,
    firstFriction ? `特に「${firstFriction}」が摩擦化しやすい点です。` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * 日々の出来事を分析し、背景・ズレ・調整ヒントを返す。
 * partnerType は 1..9 または wing（例: 9w8）を受け付ける。
 */
export function analyzeDailyEpisode(
  episodeText: string,
  partnerType: string,
  consultantType = '9',
): DailyAnalysisResult {
  const other = normalizeType(partnerType);
  const consultant = normalizeType(consultantType);

  const tags = observationTags[other] ?? [];
  const stress = stressPatterns[other];
  const tips = adjustmentTips[other] ?? [];
  const comm = communicationStyles[other];
  const misalign = misalignmentPatterns[consultant]?.[other];

  const source = episodeText.toLowerCase();
  const tagHits = tags.filter((tag) => source.includes(tag.toLowerCase()));

  const background = inferBackground(tagHits, stress, misalign);
  const misalignment = inferMisalignment(episodeText, misalign);

  return {
    background,
    misalignment,
    adjustment: tips.slice(0, 3),
    communication_safe: comm?.safe ?? '',
    communication_avoid: comm?.avoid ?? '',
    tagHits,
  };
}
