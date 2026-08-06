/**
 * ワイヤーフレーム:
 * カテゴリボタン → 項目リスト（ラベルのみ）→ 項目押下で本文展開
 * アコーディオン／モーダルなし
 */
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { sieColors } from '../../theme';
import { TopicChoiceButton } from '../TopicChoiceButton';
import type { HierarchyCategory } from './hierarchyTypes';

type Props = {
  title: string;
  categories: HierarchyCategory[];
};

export function HierarchySectionLayout({ title, categories }: Props) {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const openCategory = (categoryKey: string) => {
    if (activeCategoryKey === categoryKey) {
      setActiveCategoryKey(null);
      setActiveItemId(null);
      return;
    }
    setActiveCategoryKey(categoryKey);
    setActiveItemId(null);
  };

  const openItem = (itemId: string) => {
    setActiveItemId((current) => (current === itemId ? null : itemId));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{title}</Text>

      <View style={styles.list}>
        {categories.map((category) => {
          const categorySelected = category.key === activeCategoryKey;

          return (
            <View key={category.key} style={styles.categoryBlock}>
              <TopicChoiceButton
                label={category.label}
                selected={categorySelected}
                onPress={() => openCategory(category.key)}
              />

              {categorySelected ? (
                category.items.length === 0 ? (
                  <Text style={styles.emptyText}>（項目なし）</Text>
                ) : (
                  <View style={styles.itemsBlock}>
                    {category.items.map((item) => {
                      const itemSelected = item.id === activeItemId;
                      const bodyPrefix = item.bodyLabel ?? item.label;

                      return (
                        <View key={item.id} style={styles.itemBlock}>
                          <TopicChoiceButton
                            label={item.label}
                            selected={itemSelected}
                            onPress={() => openItem(item.id)}
                          />

                          {itemSelected ? (
                            <View style={styles.bodiesBlock}>
                              {item.bodies.map((body, index) => (
                                <View
                                  key={`${item.id}-body-${index}`}
                                  style={styles.bodyCard}
                                >
                                  <Text style={styles.bodyHeading}>
                                    {item.bodies.length > 1
                                      ? `${bodyPrefix}：項目${index + 1}`
                                      : bodyPrefix}
                                  </Text>
                                  <Text style={styles.bodyText}>{body}</Text>
                                </View>
                              ))}
                            </View>
                          ) : null}
                        </View>
                      );
                    })}
                  </View>
                )
              ) : null}
            </View>
          );
        })}
      </View>

      {categories.length === 0 ? (
        <Text style={styles.emptyText}>（辞書未投入）</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
    backgroundColor: sieColors.bg,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: sieColors.textPrimary,
    marginBottom: 4,
  },
  list: {
    gap: 10,
  },
  categoryBlock: {
    gap: 10,
  },
  itemsBlock: {
    gap: 10,
    marginLeft: 4,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: sieColors.border,
  },
  itemBlock: {
    gap: 8,
  },
  bodiesBlock: {
    gap: 8,
    paddingLeft: 4,
  },
  bodyCard: {
    backgroundColor: sieColors.surface,
    borderWidth: 1,
    borderColor: sieColors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  bodyHeading: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: sieColors.accentStrong,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: sieColors.textSecondary,
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    color: sieColors.muted,
  },
});
