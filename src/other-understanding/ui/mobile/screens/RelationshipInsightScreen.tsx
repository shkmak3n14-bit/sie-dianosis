import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { RelationshipInsightCard } from '../cards/RelationshipInsightCard';
import { toWingCode, formatWingInference } from '../bridge';
import { PrimaryButton } from '../components/PrimaryButton';
import type { OtherUnderstandingStackParamList } from '../flow/types';
import { relationshipInsightMock } from '../mocks/relationshipInsightMock';
import { sieColors } from '../theme';
import type { RelationshipInsightCardData } from '../templates/relationship_insight_card';

type Props = NativeStackScreenProps<
  OtherUnderstandingStackParamList,
  'RelationshipInsight'
>;

/** 他者理解カード画面（推論結果 or モックを表示） */
export function RelationshipInsightScreen({ navigation, route }: Props) {
  const { relation, result, cardData } = route.params ?? {};

  const data: RelationshipInsightCardData = cardData
    ? {
        ...cardData,
        relation: relation ?? cardData.relation,
      }
    : {
        ...relationshipInsightMock,
        relation: relation ?? relationshipInsightMock.relation,
        otherType: result ? toWingCode(result) : relationshipInsightMock.otherType,
        inferenceConfidence:
          result?.confidence ?? relationshipInsightMock.inferenceConfidence,
        isOtherTypeInferred: true,
      };

  const partnerTypeForDaily = (result
    ? String(result.type)
    : extractBaseType(data.otherType)) || '9';

  const openDailyAnalysis = () => {
    navigation.navigate('DailyEpisode', {
      partnerType: partnerTypeForDaily,
      relation,
      consultantType: data.consultantType,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
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
          {result ? (
            <Text style={styles.meta}>
              推論: {formatWingInference(result)} ／ タイプスコア{' '}
              {Math.round(result.score * 100)}% ／ 確度 {result.confidence}
              {result.wing != null
                ? ` ／ ウイング強度 ${Math.round(result.wing_strength * 100)}%`
                : ''}
            </Text>
          ) : null}
        </View>
        <RelationshipInsightCard data={data} />
        <View style={styles.cta}>
          <PrimaryButton label="日々の行動を分析する" mode="outlined" onPress={openDailyAnalysis} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function extractBaseType(typeCode: string): string {
  const base = typeCode.trim().charAt(0);
  return base >= '1' && base <= '9' ? base : '9';
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: sieColors.bg,
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
    alignItems: 'stretch',
  },
  header: {
    gap: 6,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  heading: {
    color: sieColors.textPrimary,
    fontWeight: '700',
  },
  sub: {
    color: sieColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  meta: {
    color: sieColors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  cta: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
});
