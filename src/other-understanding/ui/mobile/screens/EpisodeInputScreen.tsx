import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Text, TextInput } from 'react-native-paper';
import {
  buildInsightCardFromInference,
  inferEpisodeType,
} from '../bridge';
import { PrimaryButton } from '../components/PrimaryButton';
import type { OtherUnderstandingStackParamList } from '../flow/types';
import { sieColors } from '../theme';

type Props = NativeStackScreenProps<
  OtherUnderstandingStackParamList,
  'EpisodeInput'
>;

const OBSERVATION_CATEGORIES = [
  {
    title: '仕事での行動',
    example: '締切への姿勢、効率重視か、慎重か、成果優先か',
  },
  {
    title: '人間関係の場面',
    example: '衝突時の反応、気遣いの度合い、距離感の取り方',
  },
  {
    title: '日常の選択',
    example: '買い物の仕方、時間の使い方、こだわりの強さ',
  },
  {
    title: '感情の動き',
    example: '怒るポイント、落ち込む場面、喜ぶ場面',
  },
] as const;

const INPUT_EXAMPLES = [
  '効率を重視して成果を出そうとする',
  '人の気持ちを優先して衝突を避ける',
  '自分のペースを乱されると不機嫌になる',
] as const;

/**
 * ② エピソード入力
 * 入力 → inferTypes（UIブリッジ）→ RelationshipInsight
 */
export function EpisodeInputScreen({ navigation, route }: Props) {
  const { name, relation } = route.params ?? {};
  const [episode, setEpisode] = useState('');
  const who = name?.trim() || '相手';

  const handleDiagnosis = () => {
    const text = episode.trim();
    if (!text) {
      Alert.alert(
        'エピソードが未入力です',
        '相手の行動がわかるエピソードを書いてから診断してください。',
      );
      return;
    }

    const result = inferEpisodeType(text);
    const cardData = buildInsightCardFromInference({
      result,
      episode: text,
      relation,
    });

    navigation.navigate('RelationshipInsight', {
      name: name?.trim() || undefined,
      relation,
      episode: text,
      result,
      cardData,
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
            相手の行動がわかるエピソードを教えてください
          </Text>
          <Text style={styles.sub}>
            {who}
            {relation ? `（${relation}）` : ''}
            のタイプを推測するために、以下のような場面のエピソードがあると精度が上がります。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>どんなエピソードが必要？</Text>
          {OBSERVATION_CATEGORIES.map((item) => (
            <View key={item.title} style={styles.category}>
              <Text style={styles.categoryTitle}>● {item.title}</Text>
              <Text style={styles.categoryExample}>例：{item.example}</Text>
            </View>
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
              <Text style={styles.exampleText}>「{example}」</Text>
              <Text style={styles.exampleHint}>タップで入力</Text>
            </Pressable>
          ))}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>エピソード</Text>
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={6}
            value={episode}
            onChangeText={setEpisode}
            placeholder="ここにエピソードを書いてください"
            outlineColor={sieColors.border}
            activeOutlineColor={sieColors.accent}
            style={styles.input}
            contentStyle={styles.inputContent}
          />
          <PrimaryButton
            label="診断する"
            onPress={handleDiagnosis}
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
    paddingBottom: 40,
  },
  header: {
    gap: 8,
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
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: sieColors.accentStrong,
    fontSize: 16,
    fontWeight: '700',
  },
  category: {
    gap: 2,
  },
  categoryTitle: {
    color: sieColors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryExample: {
    color: sieColors.muted,
    fontSize: 13,
    lineHeight: 18,
    paddingLeft: 14,
  },
  exampleChip: {
    backgroundColor: sieColors.surface,
    borderColor: sieColors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4,
  },
  exampleText: {
    color: sieColors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  exampleHint: {
    color: sieColors.accent,
    fontSize: 11,
    fontWeight: '600',
  },
  input: {
    backgroundColor: sieColors.surface,
    minHeight: 140,
  },
  inputContent: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  divider: {
    backgroundColor: sieColors.border,
  },
});
