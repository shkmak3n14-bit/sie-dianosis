import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { sieColors } from '../theme';

type Confidence = 'high' | 'medium' | 'low';

type Props = {
  confidence?: Confidence;
};

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

/** 相手タイプが推測であることのバッジ */
export function InferenceBadge({ confidence = 'low' }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>
        相手タイプは推測（確度: {CONFIDENCE_LABEL[confidence]}）
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: sieColors.warnSoft,
    borderColor: sieColors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    color: sieColors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
});
