import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import type { MutualInsightCardData } from '../templates/mutual_insight_card';

type Props = {
  data: MutualInsightCardData;
};

export function MutualInsightCard({ data }: Props) {
  const sectionOrder = useMemo(
    () => data.sections.map((section) => section.id),
    [data.sections],
  );

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      sectionOrder.map((id) => [
        id,
        id === 'status_well' || id === 'status_not_well',
      ]),
    ),
  );

  const [expandedBullets, setExpandedBullets] = useState<Record<string, boolean>>(
    () => Object.fromEntries(sectionOrder.map((id) => [id, false])),
  );

  useEffect(() => {
    setOpenSections(
      Object.fromEntries(
        sectionOrder.map((id) => [
          id,
          id === 'status_well' || id === 'status_not_well',
        ]),
      ),
    );
    setExpandedBullets(Object.fromEntries(sectionOrder.map((id) => [id, false])));
  }, [sectionOrder]);

  const toggleSection = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleBullets = (id: string) =>
    setExpandedBullets((prev) => ({ ...prev, [id]: !prev[id] }));

  const initialLimitFor = (id: string) => {
    if (id === 'status_well' || id === 'status_not_well') return 3;
    return 2;
  };

  return (
    <View style={styles.card}>
      {data.sections.map((section) => (
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
            <Text variant="labelMedium" style={styles.toggle}>
              {openSections[section.id] ? '閉じる' : '開く'}
            </Text>
          </Pressable>

          {openSections[section.id] &&
            (section.bullets.length === 0 ? (
              <Text variant="bodySmall" style={styles.empty}>
                （辞書未投入）
              </Text>
            ) : (
              <>
                {(expandedBullets[section.id]
                  ? section.bullets
                  : section.bullets.slice(0, initialLimitFor(section.id))
                ).map((b, i) => (
                  <Text key={`${section.id}-${i}`} variant="bodyMedium">
                    ・{b}
                  </Text>
                ))}

                {section.bullets.length > initialLimitFor(section.id) && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${section.title}の項目を${
                      expandedBullets[section.id] ? '閉じる' : 'もっと見る'
                    }`}
                    onPress={() => toggleBullets(section.id)}
                    style={styles.moreRow}
                  >
                    <Text variant="labelMedium" style={styles.moreText}>
                      {expandedBullets[section.id] ? '閉じる' : 'もっと見る'}
                    </Text>
                  </Pressable>
                )}
              </>
            ))
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
  empty: {
    opacity: 0.5,
  },
});
