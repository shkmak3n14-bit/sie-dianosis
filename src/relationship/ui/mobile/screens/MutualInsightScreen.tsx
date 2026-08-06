import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { MutualUnderstandingView } from '../components/mutualUnderstanding/MutualUnderstandingView';
import type { RelationshipStackParamList } from '../flow/types';
import { hierarchyPreviewRelation } from '../mocks/hierarchyPreviewMock';

type Props = NativeStackScreenProps<
  RelationshipStackParamList,
  'MutualInsight'
>;

/**
 * 「関係を見る」→ MutualUnderstanding UI
 * カテゴリ → 項目 → 本文
 */
export function MutualInsightScreen({ route }: Props) {
  const { selfType, otherType } = route.params;

  const relation = {
    ...hierarchyPreviewRelation,
    pairKey: `${selfType}x${otherType}`,
  };

  return (
    <View style={styles.root}>
      <MutualUnderstandingView relation={relation} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
