import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { buildMutualInsightPreview } from '../bridge';
import { MutualInsightCard } from '../cards/MutualInsightCard';
import type { RelationshipStackParamList } from '../flow/types';

type Props = NativeStackScreenProps<
  RelationshipStackParamList,
  'MutualInsight'
>;

/**
 * 相互理解カード画面（ワイヤー骨格）
 * ①〜⑧セクションを表示。辞書投入後に中身が埋まる。
 */
export function MutualInsightScreen({ route }: Props) {
  const { selfType, otherType, otherIsInferred } = route.params;

  const card = useMemo(
    () =>
      buildMutualInsightPreview({
        selfType,
        otherType,
        otherIsInferred,
      }),
    [selfType, otherType, otherIsInferred],
  );

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text variant="titleMedium" style={styles.pair}>
        自分 {selfType} × 相手 {otherType}
        {otherIsInferred ? '（推測）' : ''}
      </Text>
      <MutualInsightCard data={card} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    gap: 12,
  },
  pair: {
    marginBottom: 4,
  },
});
