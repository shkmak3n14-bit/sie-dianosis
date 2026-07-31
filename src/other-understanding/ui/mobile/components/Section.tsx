import { StyleSheet, View, type ReactNode } from 'react-native';
import { Text } from 'react-native-paper';
import { sieColors } from '../theme';

type Props = {
  title: string;
  titleEn?: string;
  children: ReactNode;
};

/** カード内セクション（H2 + 本文） */
export function Section({ title, titleEn, children }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        {title}
        {titleEn ? <Text style={styles.titleEn}>（{titleEn}）</Text> : null}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  title: {
    color: sieColors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  titleEn: {
    color: sieColors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
});
