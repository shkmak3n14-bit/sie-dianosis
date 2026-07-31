import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import type { MutualInsightCardData } from '../templates/mutual_insight_card';

type Props = {
  data: MutualInsightCardData;
};

export function MutualInsightCard({ data }: Props) {
  return (
    <View style={styles.card}>
      {data.sections.map((section) => (
        <View key={section.id} style={styles.section}>
          <Text variant="titleSmall">{section.title}</Text>
          {section.bullets.length === 0 ? (
            <Text variant="bodySmall" style={styles.empty}>
              （辞書未投入）
            </Text>
          ) : (
            section.bullets.map((b, i) => (
              <Text key={`${section.id}-${i}`} variant="bodyMedium">
                ・{b}
              </Text>
            ))
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  section: {
    gap: 4,
  },
  empty: {
    opacity: 0.5,
  },
});
