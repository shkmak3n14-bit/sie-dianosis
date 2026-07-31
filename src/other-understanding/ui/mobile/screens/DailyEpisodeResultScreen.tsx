import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Text } from 'react-native-paper';
import { BulletList } from '../components/Bullet';
import { Section } from '../components/Section';
import type { OtherUnderstandingStackParamList } from '../flow/types';
import { sieColors } from '../theme';

type Props = NativeStackScreenProps<
  OtherUnderstandingStackParamList,
  'DailyEpisodeResult'
>;

/**
 * ④ 日々の行動分析（出力画面）
 * 1. 行動の背景
 * 2. 認知のズレの可能性
 * 3. 関係調整のヒント
 * 4. 安全な伝え方
 * 5. 避けるべき伝え方
 */
export function DailyEpisodeResultScreen({ route }: Props) {
  const { partnerType, relation, episode, analysis } = route.params;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.heading}>
              行動分析結果
            </Text>
            <Text style={styles.sub}>
              相手タイプ {partnerType}
              {relation ? `（${relation}）` : ''} ／ エピソード: {truncate(episode, 48)}
            </Text>
          </View>

          <Divider style={styles.divider} />
          <Section title="1. 行動の背景（推論）">
            <Paragraph text={analysis.background} />
          </Section>

          <Divider style={styles.divider} />
          <Section title="2. 認知のズレの可能性">
            <Paragraph text={analysis.misalignment} />
          </Section>

          <Divider style={styles.divider} />
          <Section title="3. 関係調整のヒント">
            <BulletList items={analysis.adjustment} />
          </Section>

          <Divider style={styles.divider} />
          <Section title="4. 安全な伝え方">
            <Paragraph text={analysis.communication_safe} />
          </Section>

          <Divider style={styles.divider} />
          <Section title="5. 避けるべき伝え方">
            <Paragraph text={analysis.communication_avoid} />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Paragraph({ text }: { text: string }) {
  const lines = text
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return <Text style={styles.body}>（未定義）</Text>;
  }

  return (
    <View style={styles.paragraphs}>
      {lines.map((line) => (
        <Text key={line} style={styles.body}>
          {line}
        </Text>
      ))}
    </View>
  );
}

function truncate(text: string, max: number): string {
  const one = text.replace(/\s+/g, ' ').trim();
  return one.length > max ? `${one.slice(0, max)}…` : one;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: sieColors.bg,
  },
  scroll: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  container: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: sieColors.border,
    padding: 16,
  },
  header: {
    gap: 6,
  },
  heading: {
    color: sieColors.textPrimary,
    fontWeight: '700',
  },
  sub: {
    color: sieColors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  divider: {
    marginVertical: 24,
    backgroundColor: sieColors.border,
  },
  paragraphs: {
    gap: 8,
  },
  body: {
    color: sieColors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});
