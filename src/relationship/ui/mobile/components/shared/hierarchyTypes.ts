export type HierarchyItem = {
  id: string;
  /** 項目リストに出すラベル（例: うまくいっている状態（6件）） */
  label: string;
  /** 項目押下で展開する本文（複数可 → 項目1, 項目2…） */
  bodies: string[];
  /** 本文見出しの接頭辞（例: うまくいっている状態）未指定時は label から件数を除く */
  bodyLabel?: string;
};

export type HierarchyCategory = {
  key: string;
  label: string;
  items: HierarchyItem[];
};

export function normalizeText(value: string | undefined): string {
  return (value ?? '').trim();
}

export function normalizeItems(values: Array<string | undefined>): string[] {
  return values.map(normalizeText).filter((text) => text.length > 0);
}

/** 件数付きグループ項目を1つ作る */
export function groupItem(
  id: string,
  labelBase: string,
  bodies: string[],
): HierarchyItem | null {
  const cleaned = normalizeItems(bodies);
  if (cleaned.length === 0) return null;
  return {
    id,
    label: `${labelBase}（${cleaned.length}件）`,
    bodyLabel: labelBase,
    bodies: cleaned,
  };
}

/** 固定ラベルのグループ */
export function namedGroupItem(
  id: string,
  label: string,
  bodies: string[],
  options?: { showCount?: boolean },
): HierarchyItem | null {
  const cleaned = normalizeItems(bodies);
  if (cleaned.length === 0) return null;
  const showCount = options?.showCount ?? false;
  return {
    id,
    label: showCount ? `${label}（${cleaned.length}件）` : label,
    bodyLabel: label,
    bodies: cleaned,
  };
}

export function filterByAny(values: string[], patterns: RegExp[]): string[] {
  return values.filter((text) => patterns.some((re) => re.test(text)));
}

export function filterByNone(values: string[], patterns: RegExp[]): string[] {
  return values.filter((text) => !patterns.some((re) => re.test(text)));
}

/** Self / Other セクション用: 単本文項目 */
export function itemFromString(
  id: string,
  label: string,
  value: string | undefined,
): HierarchyItem | null {
  const body = normalizeText(value);
  if (!body) return null;
  return { id, label, bodyLabel: label, bodies: [body] };
}

/** Self / Other セクション用: 配列を複数項目に展開 */
export function itemsFromField(
  categoryKey: string,
  fieldKey: string,
  fieldLabel: string,
  values: string[],
): HierarchyItem[] {
  const cleaned = normalizeItems(values);
  if (cleaned.length === 0) return [];
  if (cleaned.length === 1) {
    return [
      {
        id: `${categoryKey}.${fieldKey}`,
        label: fieldLabel,
        bodyLabel: fieldLabel,
        bodies: [cleaned[0]],
      },
    ];
  }
  return cleaned.map((body, index) => ({
    id: `${categoryKey}.${fieldKey}-${index}`,
    label: `${fieldLabel} ${index + 1}`,
    bodyLabel: `${fieldLabel} ${index + 1}`,
    bodies: [body],
  }));
}
