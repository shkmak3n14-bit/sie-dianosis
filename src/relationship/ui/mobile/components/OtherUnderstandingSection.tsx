import { useMemo } from 'react';
import type { OtherUnderstandingEntry } from '../templates/hierarchy_entries';
import { HierarchySectionLayout } from './shared/HierarchySectionLayout';
import {
  itemFromString,
  itemsFromField,
  normalizeItems,
  type HierarchyCategory,
} from './shared/hierarchyTypes';

export type { OtherUnderstandingEntry };

export type OtherUnderstandingSectionProps = {
  entry: OtherUnderstandingEntry;
  typeName?: string;
};

function resolveTypeName(entry: OtherUnderstandingEntry, typeName?: string): string {
  return typeName ?? entry.typeName ?? entry.label ?? entry.code ?? '—';
}

function buildOtherCategories(entry: OtherUnderstandingEntry): HierarchyCategory[] {
  const coreFields: Array<{ key: string; label: string; value: string }> = [
    { key: 'coreFear', label: '核となる恐れ', value: entry.coreFear },
    { key: 'coreDesire', label: '核となる欲求', value: entry.coreDesire },
    { key: 'stressPattern', label: 'ストレスパターン', value: entry.stressPattern },
    { key: 'growthDirection', label: '成長の方向', value: entry.growthDirection },
    { key: 'conflictStyle', label: '衝突の出方', value: entry.conflictStyle },
    { key: 'blindSpot', label: '盲点', value: entry.blindSpot },
  ];

  const arrayFields: Array<{ key: string; label: string; values: string[] }> = [
    { key: 'coreMotivation', label: '動機', values: normalizeItems(entry.coreMotivation) },
    { key: 'strengths', label: '強み', values: normalizeItems(entry.strengths) },
    { key: 'blindspots', label: '盲点（観察）', values: normalizeItems(entry.blindspots) },
    {
      key: 'stressPatternDetail',
      label: 'ストレス詳細',
      values: normalizeItems(entry.stressPatternDetail),
    },
    { key: 'growthPoints', label: '成長ポイント', values: normalizeItems(entry.growthPoints) },
    {
      key: 'behaviorExamples',
      label: '行動例',
      values: normalizeItems(entry.behaviorExamples),
    },
    {
      key: 'communicationDo',
      label: '伝えること',
      values: normalizeItems(entry.communicationDo),
    },
    {
      key: 'communicationAvoid',
      label: '避けること',
      values: normalizeItems(entry.communicationAvoid),
    },
    {
      key: 'communicationExamples',
      label: '言い回し例',
      values: normalizeItems(entry.communicationExamples),
    },
  ];

  const coreCategories: HierarchyCategory[] = coreFields.map(({ key, label, value }) => {
    const item = itemFromString(key, label, value);
    return { key, label, items: item ? [item] : [] };
  });

  const behaviorCategories: HierarchyCategory[] = arrayFields.map(
    ({ key, label, values }) => ({
      key,
      label,
      items: itemsFromField(key, key, label, values),
    }),
  );

  return [...coreCategories, ...behaviorCategories];
}

export function OtherUnderstandingSection({
  entry,
  typeName,
}: OtherUnderstandingSectionProps) {
  const categories = useMemo(() => buildOtherCategories(entry), [entry]);
  const subtitle = resolveTypeName(entry, typeName);

  return (
    <HierarchySectionLayout
      title={`他者理解（${subtitle}）`}
      categories={categories}
    />
  );
}
