import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import {
  buildRelationshipInsightSections,
  type RelationshipInsightCardData,
  type RelationshipInsightSection,
} from '../templates/relationship_insight_card';
import { BulletList } from '../components/Bullet';
import { InferenceBadge } from '../components/InferenceBadge';
import { RelationChip } from '../components/RelationChip';
import { Section } from '../components/Section';
import { sieColors } from '../theme';

type Props = {
  data: RelationshipInsightCardData;
};

const WING_LABEL_JA = {
  weak: '弱',
  mid: '中',
  strong: '強',
} as const;

function SectionBody({ section }: { section: RelationshipInsightSection }) {
  if (section.displayMode === 'bullets' && section.bullets.length > 0) {
    return <BulletList items={section.bullets} />;
  }

  const text = section.content?.trim();
  if (!text) {
    return <Text style={styles.body}>（未定義）</Text>;
  }

  // 複数行テキストも読みやすく段落表示
  const lines = text.split('\n').filter(Boolean);
  if (lines.length > 1) {
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

  return <Text style={styles.body}>{text}</Text>;
}

/**
 * 他者理解カード（Relationship Insight Card）
 * 情報量の多い8項目を、区切り・余白・見出し階層で読みやすくする。
 */
export function RelationshipInsightCard({ data }: Props) {
  const sections = buildRelationshipInsightSections(data);
  const wingLabelJa = data.wingLabel ? WING_LABEL_JA[data.wingLabel] : null;

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content style={styles.content}>
        {/* ヘッダー：タイトル＋ウイング / RelationChip 右上 */}
        <View style={styles.headerTop}>
          <View style={styles.titleBlock}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>他者理解カード</Text>
              {wingLabelJa ? (
                <View style={styles.wingChip}>
                  <Text style={styles.wingChipText}>ウイング{wingLabelJa}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.pair}>
              あなた {data.consultantType || '—'} × 相手 {data.otherType || '—'}
            </Text>
            {typeof data.wingStrength === 'number' && data.wingLabel ? (
              <Text style={styles.wingStrength}>
                強度 {Math.round(data.wingStrength * 100)}%
              </Text>
            ) : null}
          </View>
          {data.relation ? <RelationChip label={data.relation} /> : null}
        </View>

        {/* InferenceBadge 右下 */}
        {data.isOtherTypeInferred ? (
          <View style={styles.badgeRow}>
            <InferenceBadge confidence={data.inferenceConfidence} />
          </View>
        ) : null}

        {sections.map((section) => (
          <View key={section.id}>
            <Divider style={styles.sectionDivider} />
            <Section
              title={`${section.number}. ${section.title}`}
              titleEn={section.titleEn}
            >
              <SectionBody section={section} />
            </Section>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: sieColors.surface,
    borderRadius: 16,
    borderColor: sieColors.border,
  },
  content: {
    padding: 16,
    gap: 0,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 6,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardTitle: {
    color: sieColors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  wingChip: {
    backgroundColor: sieColors.surfaceSoft,
    borderColor: sieColors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  wingChipText: {
    color: sieColors.accentStrong,
    fontSize: 12,
    fontWeight: '700',
  },
  pair: {
    color: sieColors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  wingStrength: {
    color: sieColors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  badgeRow: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  sectionDivider: {
    backgroundColor: sieColors.border,
    marginVertical: 16,
  },
  body: {
    color: sieColors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  paragraphs: {
    gap: 8,
  },
});
