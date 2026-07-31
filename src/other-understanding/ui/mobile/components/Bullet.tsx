import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { sieColors } from '../theme';

type Props = {
  text: string;
};

/** 箇条書き1行（• + テキスト） */
export function Bullet({ text }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.mark}>•</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

type ListProps = {
  items: string[];
};

export function BulletList({ items }: ListProps) {
  if (items.length === 0) {
    return <Text style={styles.empty}>（未定義）</Text>;
  }

  return (
    <View style={styles.list}>
      {items.map((item) => (
        <Bullet key={item} text={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 6,
    paddingLeft: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingLeft: 4,
  },
  mark: {
    color: sieColors.accent,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    width: 12,
  },
  text: {
    flex: 1,
    color: sieColors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  empty: {
    color: sieColors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});
