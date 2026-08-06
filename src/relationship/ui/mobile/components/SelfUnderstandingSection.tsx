import { useMemo } from 'react';
import type { SelfUnderstandingEntry } from '../templates/hierarchy_entries';
import { HierarchySectionLayout } from './shared/HierarchySectionLayout';
import { itemFromString, type HierarchyCategory } from './shared/hierarchyTypes';

export type { SelfUnderstandingEntry };

export type SelfUnderstandingSectionProps = {
  entry: SelfUnderstandingEntry;
  typeName?: string;
};

function resolveTypeName(entry: SelfUnderstandingEntry, typeName?: string): string {
  return typeName ?? entry.typeName ?? entry.label ?? entry.code ?? '—';
}

function buildSelfCategories(entry: SelfUnderstandingEntry): HierarchyCategory[] {
  const fields: Array<{ key: string; label: string; value: string }> = [
    { key: 'coreFear', label: '核となる恐れ', value: entry.coreFear },
    { key: 'coreDesire', label: '核となる欲求', value: entry.coreDesire },
    { key: 'stressPattern', label: 'ストレスパターン', value: entry.stressPattern },
    { key: 'growthDirection', label: '成長の方向', value: entry.growthDirection },
    { key: 'conflictStyle', label: '衝突の出方', value: entry.conflictStyle },
    { key: 'blindSpot', label: '盲点', value: entry.blindSpot },
  ];

  return fields.map(({ key, label, value }) => {
    const item = itemFromString(key, label, value);
    return {
      key,
      label,
      items: item ? [item] : [],
    };
  });
}

export function SelfUnderstandingSection({
  entry,
  typeName,
}: SelfUnderstandingSectionProps) {
  const categories = useMemo(() => buildSelfCategories(entry), [entry]);
  const subtitle = resolveTypeName(entry, typeName);

  return (
    <HierarchySectionLayout
      title={`自己理解（${subtitle}）`}
      categories={categories}
    />
  );
}
