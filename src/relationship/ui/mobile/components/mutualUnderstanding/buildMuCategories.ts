export type MuItem = {
  id: string;
  label: string;
  bodyLabel: string;
  bodies: string[];
};

export type MuCategory = {
  key: string;
  label: string;
  items: MuItem[];
};

function trim(value: string | undefined): string {
  return (value ?? '').trim();
}

function clean(values: Array<string | undefined>): string[] {
  return values.map(trim).filter((v) => v.length > 0);
}

function group(
  id: string,
  labelBase: string,
  bodies: string[],
  withCount = false,
): MuItem | null {
  const list = clean(bodies);
  if (list.length === 0) return null;
  return {
    id,
    label: withCount ? `${labelBase}（${list.length}件）` : labelBase,
    bodyLabel: labelBase,
    bodies: list,
  };
}

function keep(items: Array<MuItem | null>): MuItem[] {
  return items.filter((x): x is MuItem => x != null);
}

function matchAny(values: string[], patterns: RegExp[]): string[] {
  return values.filter((t) => patterns.some((re) => re.test(t)));
}

function matchNone(values: string[], patterns: RegExp[]): string[] {
  return values.filter((t) => !patterns.some((re) => re.test(t)));
}

export function parsePairKey(pairKey: string): { self: string; other: string } {
  const m = trim(pairKey).match(/^(\d)\s*[x×]\s*(\d)$/i);
  if (m) return { self: m[1], other: m[2] };
  return { self: '自分', other: '相手' };
}

function sidePatterns(type: string): RegExp[] {
  return [
    new RegExp(`${type}側`),
    new RegExp(`タイプ${type}`),
    new RegExp(`Type\\s*${type}`, 'i'),
  ];
}

/**
 * ワイヤーフレーム固定の カテゴリ → 項目 構造を組み立てる
 */
export function buildMuCategories(
  relation: {
    pairKey: string;
    status: { good: string[]; bad: string[] };
    viciousCycle: { triggers: string[]; loop: string[] };
    cognitiveGap: {
      selfGap: string[];
      otherGap: string[];
      interaction: string[];
    };
    virtuousCycle: {
      actions: string[];
      adjustments: string[];
      reassurance: string[];
    };
    respect: { forOther: string[]; forSelf: string[] };
    responsibility: { self: string[]; other: string[] };
    defer: { reasons: string[] };
    communication: { do: string[]; avoid: string[] };
  },
  selfType?: string,
  otherType?: string,
): MuCategory[] {
  const pair = parsePairKey(relation.pairKey);
  const self = selfType ?? pair.self;
  const other = otherType ?? pair.other;

  const triggers = clean(relation.viciousCycle.triggers);
  const selfRe = sidePatterns(self);
  const otherRe = sidePatterns(other);
  const selfTriggers = matchAny(triggers, selfRe);
  const otherTriggers = matchAny(triggers, otherRe);
  const unclassified = matchNone(triggers, [...selfRe, ...otherRe]);

  const adjustments = clean(relation.virtuousCycle.adjustments);
  const reassurance = clean(relation.virtuousCycle.reassurance);

  return [
    {
      key: 'status',
      label: '状態（うまくいっている／いない）',
      items: keep([
        group('status.good', 'うまくいっている状態', relation.status.good, true),
        group('status.bad', 'うまくいっていない状態', relation.status.bad, true),
      ]),
    },
    {
      key: 'viciousCycle',
      label: '悪循環（入口・連鎖）',
      items: keep([
        group(`vc.trigger.${self}`, `引き金（${self}側）`, [
          ...selfTriggers,
          ...unclassified,
        ]),
        group(`vc.trigger.${other}`, `引き金（${other}側）`, otherTriggers),
        group('vc.loop', '連鎖（認知・感情・行動）', relation.viciousCycle.loop),
      ]),
    },
    {
      key: 'cognitiveGap',
      label: '認知のズレ',
      items: keep([
        group('cg.self', '自分側のズレ', relation.cognitiveGap.selfGap),
        group('cg.other', '相手側のズレ', relation.cognitiveGap.otherGap),
        group('cg.interaction', '相互作用', relation.cognitiveGap.interaction),
      ]),
    },
    {
      key: 'virtuousCycle',
      label: '好循環への道筋',
      items: keep([
        group(
          'vr.adj.self',
          `タイプ${self}の調整`,
          matchAny(adjustments, [
            new RegExp(`タイプ${self}の調整`),
            new RegExp(`${self}の調整`),
          ]),
        ),
        group(
          'vr.adj.other',
          `タイプ${other}の調整`,
          matchAny(adjustments, [
            new RegExp(`タイプ${other}の調整`),
            new RegExp(`${other}の調整`),
          ]),
        ),
        group('vr.adj.both', '双方の調整', matchAny(adjustments, [/双方/])),
        group('vr.actions', '行動', relation.virtuousCycle.actions),
        group(
          'vr.re.self',
          `安心（${self}）`,
          matchAny(reassurance, [
            new RegExp(`タイプ${self}の安心`),
            new RegExp(`${self}の安心`),
          ]),
        ),
        group(
          'vr.re.other',
          `安心（${other}）`,
          matchAny(reassurance, [
            new RegExp(`タイプ${other}の安心`),
            new RegExp(`${other}の安心`),
          ]),
        ),
      ]),
    },
    {
      key: 'respect',
      label: '尊重（相手／自分）',
      items: keep([
        group('respect.other', '相手尊重', relation.respect.forOther),
        group('respect.self', '自己尊重', relation.respect.forSelf),
      ]),
    },
    {
      key: 'responsibility',
      label: '責務（自分の問題／相手の問題）',
      items: keep([
        group('resp.self', '自分側の責務', relation.responsibility.self),
        group('resp.other', '相手側の責務', relation.responsibility.other),
      ]),
    },
    {
      key: 'defer',
      label: '棚上げポイント',
      items: keep([group('defer.points', '棚上げポイント', relation.defer.reasons)]),
    },
    {
      key: 'communication',
      label: '伝え方の工夫',
      items: keep([
        group('comm.do', '有効な伝え方', relation.communication.do),
        group('comm.avoid', '避けるべき伝え方', relation.communication.avoid),
      ]),
    },
  ];
}
