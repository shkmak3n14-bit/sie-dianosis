import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { sieColors } from '../theme';

type Props = {
  label: string;
};

/** 関係性タグ（親子・恋人・上司部下・友人など） */
export function RelationChip({ label }: Props) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: sieColors.chip,
    borderColor: sieColors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    color: sieColors.accentStrong,
    fontSize: 13,
    fontWeight: '600',
  },
});
