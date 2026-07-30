import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import {
  buildRelationshipInsightSections,
  type RelationshipInsightCardData,
  type RelationshipInsightSection,
} from '../templates/relationship_insight_card';
import { InferenceBadge } from '../components/InferenceBadge';
import { RelationChip } from '../components/RelationChip';
import { sieColors } from '../theme';

type Props = {
  data: RelationshipInsightCardData;
};

function SectionBody({ section }: { section: RelationshipInsightSection }) {
  if (section.displayMode === 'bullets' && section.bullets.length > 0) {
    return (
      <View style={styles.bullets}>
        {section.bullets.map((line) => (
          <View key={line} style={styles.bulletRow}>
            <Text style={styles.bullet}>・</Text>
            <Text style={styles.body}>{line}</Text>
          </View>
        ))}
      </View>
    );
  }

  return <Text style={styles.body}>{section.content || '（未定義）'}</Text>;
}

/**
 * 他者理解カード（Relationship Insight Card）
 * 8項目＋タイプ情報。エンジン出力をそのまま表示する。
 */
export function RelationshipInsightCard({ data }: Props) {
  const sections = buildRelationshipInsightSections(data);

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content style={styles.content}>
        <View style={styles.headerRow}>
          <Text variant="titleMedium" style={styles.title}>
            他者理解カード
          </Text>
          {data.relation ? <RelationChip label={data.relation} /> : null}
        </View>

        <Text style={styles.pair}>
          あなた {data.consultantType || '—'} × 相手 {data.otherType || '—'}
        </Text>

        {data.isOtherTypeInferred ? (
          <InferenceBadge confidence={data.inferenceConfidence} />
        ) : null}

        <Divider style={styles.divider} />

        {sections.map((section, index) => (
          <View key={section.id} style={styles.section}>
            {index > 0 ? <Divider style={styles.sectionDivider} /> : null}
            <Text style={styles.sectionTitle}>
              {section.number}. {section.title}
              {section.titleEn ? (
                <Text style={styles.sectionTitleEn}>（{section.titleEn}）</Text>
              ) : null}
            </Text>
            <SectionBody section={section} />
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: sieColors.surface,
    borderRadius: 16,
    borderColor: sieColors.border,
  },
  content: {
    gap: 12,
    paddingVertical: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  title: {
    color: sieColors.accentStrong,
    fontWeight: '700',
  },
  pair: {
    color: sieColors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    backgroundColor: sieColors.border,
    marginTop: 2,
  },
  section: {
    gap: 8,
  },
  sectionDivider: {
    backgroundColor: sieColors.border,
    marginBottom: 4,
  },
  sectionTitle: {
    color: sieColors.accentStrong,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitleEn: {
    color: sieColors.muted,
    fontSize: 12,
    fontWeight: '500',
  },
  body: {
    color: sieColors.muted,
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  bullets: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 2,
  },
  bullet: {
    color: sieColors.accent,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
});
