import { ScrollView, StyleSheet } from 'react-native';
import type {
  MutualUnderstandingView,
  OtherUnderstandingEntry,
  SelfUnderstandingEntry,
} from '../templates/hierarchy_entries';
import { OtherUnderstandingSection } from './OtherUnderstandingSection';
import { RelationshipSection } from './RelationshipSection';
import { SelfUnderstandingSection } from './SelfUnderstandingSection';
import { sieColors } from '../theme';

export type { SelfUnderstandingEntry, OtherUnderstandingEntry };

export type SieHierarchyViewProps = {
  self: SelfUnderstandingEntry;
  other: OtherUnderstandingEntry;
  relation: MutualUnderstandingView;
};

/**
 * self / other / relationship を同じ表示パターンで縦に並べる
 * （TopicChoiceButton: カテゴリ → 項目(label+body)）
 */
export function SieHierarchyView({ self, other, relation }: SieHierarchyViewProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}
    >
      <SelfUnderstandingSection entry={self} />
      <OtherUnderstandingSection entry={other} />
      <RelationshipSection relation={relation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 28,
    backgroundColor: sieColors.bg,
  },
});
