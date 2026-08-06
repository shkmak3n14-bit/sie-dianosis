import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import type { MutualInsightCardData } from '../templates/mutual_insight_card';

type Props = {
  data: MutualInsightCardData;
};

const STATUS_BLOCK_ID = 'status_current';

export function MutualInsightCard({ data }: Props) {
  const statusWellSection = useMemo(
    () => data.sections.find((section) => section.id === 'status_well'),
    [data.sections],
  );
  const statusNotWellSection = useMemo(
    () => data.sections.find((section) => section.id === 'status_not_well'),
    [data.sections],
  );

  const displaySections = useMemo(
    () => [
      ...(statusWellSection || statusNotWellSection
        ? [
            {
              id: STATUS_BLOCK_ID,
              title: '現状',
              bullets: [
                ...(statusWellSection?.bullets ?? []),
                ...(statusNotWellSection?.bullets ?? []),
              ],
            },
          ]
        : []),
      ...data.sections
        .filter(
          (section) =>
            section.id !== 'status_well' && section.id !== 'status_not_well',
        )
        .map((section) => ({
          id: section.id,
          title: section.title,
          bullets: section.bullets,
        })),
    ],
    [data.sections, statusNotWellSection, statusWellSection],
  );

  const sectionOrder = useMemo(
    () => displaySections.map((section) => section.id),
    [displaySections],
  );

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      sectionOrder.map((id) => [id, id === STATUS_BLOCK_ID]),
    ),
  );

  const [expandedBullets, setExpandedBullets] = useState<Record<string, boolean>>(
    () => Object.fromEntries(sectionOrder.map((id) => [id, false])),
  );

  useEffect(() => {
    setOpenSections(
      Object.fromEntries(sectionOrder.map((id) => [id, id === STATUS_BLOCK_ID])),
    );
    setExpandedBullets(Object.fromEntries(sectionOrder.map((id) => [id, false])));
  }, [sectionOrder]);

  const toggleSection = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleBullets = (id: string) =>
    setExpandedBullets((prev) => ({ ...prev, [id]: !prev[id] }));

  const initialLimitFor = (id: string) => {
    if (id === STATUS_BLOCK_ID) return 3;
    return 2;
  };

  const renderBullets = (sectionId: string, bullets: string[]) => (
    <>
      {(expandedBullets[sectionId]
        ? bullets
        : bullets.slice(0, initialLimitFor(sectionId))
      ).map((b, i) => (
        <Text key={`${sectionId}-${i}`} variant="bodyMedium">
          ・{b}
        </Text>
      ))}

      {bullets.length > initialLimitFor(sectionId) && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${sectionId}の項目を${
            expandedBullets[sectionId] ? '閉じる' : 'もっと見る'
          }`}
          onPress={() => toggleBullets(sectionId)}
          style={styles.moreRow}
        >
          <Text variant="labelMedium" style={styles.moreText}>
            {expandedBullets[sectionId] ? '閉じる' : 'もっと見る'}
          </Text>
        </Pressable>
      )}
    </>
  );

  return (
    <View style={styles.card}>
      {displaySections.map((section) => (
        <View key={section.id} style={styles.section}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${section.title}を${
              openSections[section.id] ? '閉じる' : '開く'
            }`}
            onPress={() => toggleSection(section.id)}
            style={styles.headerRow}
          >
            <Text variant="titleSmall" style={styles.title}>
              {section.title}
            </Text>
            <View style={styles.headerRight}>
              <Text variant="labelSmall" style={styles.count}>
                {section.bullets.length}件
              </Text>
              <Text variant="labelMedium" style={styles.toggle}>
                {openSections[section.id] ? '閉じる' : '開く'}
              </Text>
            </View>
          </Pressable>

          {openSections[section.id] &&
            (section.bullets.length === 0 ? (
              <Text variant="bodySmall" style={styles.empty}>
                （辞書未投入）
              </Text>
            ) : section.id === STATUS_BLOCK_ID ? (
              <View style={styles.statusGroup}>
                <Text variant="labelLarge" style={styles.subhead}>
                  うまくいっている状態
                </Text>
                {statusWellSection && statusWellSection.bullets.length > 0 ? (
                  renderBullets(section.id, statusWellSection.bullets)
                ) : (
                  <Text variant="bodySmall" style={styles.empty}>
                    （項目なし）
                  </Text>
                )}

                <Text variant="labelLarge" style={styles.subhead}>
                  うまくいっていない状態
                </Text>
                {statusNotWellSection &&
                statusNotWellSection.bullets.length > 0 ? (
                  renderBullets(section.id, statusNotWellSection.bullets)
                ) : (
                  <Text variant="bodySmall" style={styles.empty}>
                    （項目なし）
                  </Text>
                )}
              </View>
            ) : (
              renderBullets(section.id, section.bullets)
            ))}

          {!openSections[section.id] && section.bullets.length > 0 && (
            <Text variant="bodySmall" style={styles.preview} numberOfLines={1}>
              ・{section.bullets[0]}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  section: {
    gap: 4,
  },
  headerRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    paddingRight: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  count: {
    opacity: 0.6,
  },
  toggle: {
    opacity: 0.75,
  },
  moreRow: {
    marginTop: 4,
    minHeight: 36,
    justifyContent: 'center',
  },
  moreText: {
    color: '#3366CC',
  },
  statusGroup: {
    gap: 4,
  },
  subhead: {
    marginTop: 4,
    opacity: 0.85,
  },
  empty: {
    opacity: 0.5,
  },
  preview: {
    opacity: 0.65,
  },
});
