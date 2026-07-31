import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Text, TextInput } from 'react-native-paper';
import { analyzeDailyEpisode } from '../bridge';
import { PrimaryButton } from '../components/PrimaryButton';
import type { OtherUnderstandingStackParamList } from '../flow/types';
import { sieColors } from '../theme';

type Props = NativeStackScreenProps<OtherUnderstandingStackParamList, 'DailyEpisode'>;

const OBSERVATION_CATEGORIES = [
  '仕事での行動（締切への姿勢、効率重視か慎重か）',
  '人間関係の場面（衝突時の反応、気遣いの度合い）',
  '日常の選択（買い物・時間の使い方）',
  '感情の動き（怒る・喜ぶ・落ち込む）',
] as const;

const INPUT_EXAMPLES = [
  '効率を重視して成果を出そうとする',
  '人の気持ちを優先して衝突を避ける',
  '自分のペースを乱されると不機嫌になる',
] as const;

function normalizeType(typeCode?: string): string {
  if (!typeCode) return '9';
  const base = typeCode.trim().charAt(0);
  return base >= '1' && base <= '9' ? base : '9';
}

/**
 * ④ 日々の行動分析（入力画面）
 * DailyEpisodeScreen -> dailyAnalysis.ts -> DailyEpisodeResultScreen
 */
export function DailyEpisodeScreen({ navigation, route }: Props) {
  const [episode, setEpisode] = useState('');
  const partnerType = normalizeType(route.params?.partnerType);
  const relation = route.params?.relation;
  const consultantType = normalizeType(route.params?.consultantType);

  const handleAnalyze = () => {
    const text = episode.trim();
    if (!text) {
      Alert.alert(
        '出来事が未入力です',
        '今日の出来事を入力してから「行動を分析する」を押してください。',
      );
      return;
    }

    const analysis = analyzeDailyEpisode(text, partnerType, consultantType);
    navigation.navigate('DailyEpisodeResult', {
      partnerType,
      relation,
      episode: text,
      analysis,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.heading}>
            今日の出来事を教えてください
          </Text>
          <Text style={styles.sub}>
            相手タイプ {partnerType}
            {relation ? `（${relation}）` : ''} の行動背景を分析します。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>観察ポイント例</Text>
          {OBSERVATION_CATEGORIES.map((text) => (
            <Text key={text} style={styles.item}>
              ● {text}
            </Text>
          ))}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>入力例</Text>
          {INPUT_EXAMPLES.map((example) => (
            <Pressable
              key={example}
              onPress={() => setEpisode(example)}
              style={styles.exampleChip}
            >
              <Text style={styles.exampleText}>- {example}</Text>
            </Pressable>
          ))}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日の出来事</Text>
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={7}
            value={episode}
            onChangeText={setEpisode}
            placeholder="複数行で入力できます"
            outlineColor={sieColors.border}
            activeOutlineColor={sieColors.accent}
            style={styles.input}
            contentStyle={styles.inputContent}
          />
          <PrimaryButton
            label="行動を分析する"
            onPress={handleAnalyze}
            disabled={!episode.trim()}
          />
        </View>
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
    gap: 20,
    paddingBottom: 32,
  },
  header: {
    gap: 8,
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
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: sieColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  item: {
    color: sieColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  exampleChip: {
    backgroundColor: sieColors.surface,
    borderColor: sieColors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  exampleText: {
    color: sieColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    backgroundColor: sieColors.surface,
    minHeight: 150,
  },
  inputContent: {
    minHeight: 130,
    textAlignVertical: 'top',
  },
  divider: {
    backgroundColor: sieColors.border,
  },
});
