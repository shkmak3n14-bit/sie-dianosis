import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { RelationshipInsightCard } from '../cards/RelationshipInsightCard';
import { relationshipInsightMock } from '../mocks/relationshipInsightMock';
import { sieColors } from '../theme';
import type { RelationshipInsightCardData } from '../templates/relationship_insight_card';

type Props = {
  data?: RelationshipInsightCardData;
};

/** 他者理解カードのプレビュー画面 */
export function RelationshipInsightScreen({
  data = relationshipInsightMock,
}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.heading}>
            他者理解
          </Text>
          <Text style={styles.sub}>
            認知のズレから伝え方まで、関係改善のヒントを整理します。
          </Text>
        </View>
        <RelationshipInsightCard data={data} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: sieColors.bg,
  },
  scroll: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  header: {
    gap: 6,
  },
  heading: {
    color: sieColors.accentStrong,
    fontWeight: '700',
  },
  sub: {
    color: sieColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
