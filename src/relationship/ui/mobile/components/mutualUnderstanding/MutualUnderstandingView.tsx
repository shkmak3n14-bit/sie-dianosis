/**
 * MutualUnderstanding UI
 *
 * ワイヤー: カテゴリ → 項目 → 本文
 * - カテゴリボタン縦並び
 * - アコーディオン禁止 / モーダル禁止
 * - Tailwind 相当スタイル:
 *   ボタン: rounded-xl px-4 py-3 bg-gray-100 hover:bg-gray-200
 *   項目リスト: border-l-4 border-blue-400 pl-3 my-2
 *   本文: text-sm leading-relaxed text-gray-700
 */
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatDictionaryItemToUiText } from '../../logic/muUiFormat';
import type { MutualUnderstanding } from '../../templates/mutual_understanding';
import { buildMuCategories, parsePairKey } from './buildMuCategories';

export type MutualUnderstandingViewProps = {
  relation: MutualUnderstanding;
  /**
   * true のとき abstractToBehavior で抽象語置換する
   * 自然文モック表示時は false（default）
   */
  formatForUi?: boolean;
};

export function MutualUnderstandingView({
  relation,
  formatForUi = false,
}: MutualUnderstandingViewProps) {
  const { self, other } = parsePairKey(relation.pairKey);
  const categories = useMemo(() => {
    const built = buildMuCategories(relation, self, other);
    if (!formatForUi) return built;
    return built.map((category) => ({
      ...category,
      items: category.items.map((item) => ({
        ...item,
        bodies: item.bodies.map((body) => formatDictionaryItemToUiText(body)),
      })),
    }));
  }, [formatForUi, relation, self, other]);

  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const selectCategory = (key: string) => {
    if (activeCategoryKey === key) {
      setActiveCategoryKey(null);
      setActiveItemId(null);
      return;
    }
    setActiveCategoryKey(key);
    setActiveItemId(null);
  };

  const selectItem = (id: string) => {
    setActiveItemId((cur) => (cur === id ? null : id));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{`相互理解（${self} × ${other}）`}</Text>

      <View style={styles.categoryColumn}>
        {categories.map((category) => {
          const catOpen = category.key === activeCategoryKey;

          return (
            <View key={category.key} style={styles.categoryBlock}>
              {/* カテゴリボタン: rounded-xl px-4 py-3 bg-gray-100 */}
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: catOpen }}
                onPress={() => selectCategory(category.key)}
                style={({ pressed }) => [
                  styles.categoryButton,
                  catOpen && styles.categoryButtonSelected,
                  pressed && styles.categoryButtonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    catOpen && styles.categoryButtonTextSelected,
                  ]}
                >
                  {category.label}
                </Text>
              </Pressable>

              {/* 項目リスト: border-l-4 border-blue-400 pl-3 my-2 */}
              {catOpen ? (
                category.items.length === 0 ? (
                  <Text style={styles.empty}>（項目なし）</Text>
                ) : (
                  <View style={styles.itemList}>
                    {category.items.map((item) => {
                      const itemOpen = item.id === activeItemId;

                      return (
                        <View key={item.id} style={styles.itemBlock}>
                          <Pressable
                            accessibilityRole="button"
                            accessibilityState={{ selected: itemOpen }}
                            onPress={() => selectItem(item.id)}
                            style={({ pressed }) => [
                              styles.itemButton,
                              itemOpen && styles.itemButtonSelected,
                              pressed && styles.categoryButtonPressed,
                            ]}
                          >
                            <Text
                              style={[
                                styles.itemButtonText,
                                itemOpen && styles.itemButtonTextSelected,
                              ]}
                            >
                              {item.label}
                            </Text>
                          </Pressable>

                          {/* 本文: text-sm leading-relaxed text-gray-700 */}
                          {itemOpen ? (
                            <View style={styles.bodies}>
                              {item.bodies.map((body, index) => (
                                <View
                                  key={`${item.id}-${index}`}
                                  style={styles.bodyCard}
                                >
                                  <Text style={styles.bodyHeading}>
                                    {item.bodies.length > 1
                                      ? `${item.bodyLabel}：項目${index + 1}`
                                      : item.bodyLabel}
                                  </Text>
                                  {body.split('\n\n').map((block, blockIndex) => (
                                    <View
                                      key={`${item.id}-${index}-block-${blockIndex}`}
                                      style={styles.stageBlock}
                                    >
                                      {block.split('\n').filter(Boolean).map((line, lineIndex) => {
                                        const isLabel = line.startsWith('【') && line.endsWith('】');
                                        return (
                                          <Text
                                            key={`${item.id}-${index}-${blockIndex}-${lineIndex}`}
                                            style={isLabel ? styles.stageLabel : styles.bodyText}
                                          >
                                            {line}
                                          </Text>
                                        );
                                      })}
                                    </View>
                                  ))}
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
        <Text style={styles.empty}>（辞書未投入）</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 14,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  categoryColumn: {
    gap: 10,
  },
  categoryBlock: {
    gap: 8,
  },
  // rounded-xl px-4 py-3 bg-gray-100
  categoryButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#E5E7EB',
  },
  // hover:bg-gray-200
  categoryButtonPressed: {
    backgroundColor: '#E5E7EB',
  },
  categoryButtonText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'left',
  },
  categoryButtonTextSelected: {
    color: '#1D4ED8',
  },
  // border-l-4 border-blue-400 pl-3 my-2
  itemList: {
    borderLeftWidth: 4,
    borderLeftColor: '#60A5FA',
    paddingLeft: 12,
    marginVertical: 8,
    gap: 10,
  },
  itemBlock: {
    gap: 8,
  },
  itemButton: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 44,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
  },
  itemButtonSelected: {
    backgroundColor: '#DBEAFE',
  },
  itemButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#374151',
  },
  itemButtonTextSelected: {
    color: '#1D4ED8',
  },
  bodies: {
    gap: 8,
  },
  bodyCard: {
    gap: 10,
  },
  bodyHeading: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 2,
  },
  stageBlock: {
    gap: 4,
  },
  stageLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  // text-sm leading-relaxed text-gray-700
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
  empty: {
    fontSize: 14,
    lineHeight: 20,
    color: '#9CA3AF',
  },
});
