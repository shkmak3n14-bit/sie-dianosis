import { useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Text, TextInput } from 'react-native-paper';
import { PrimaryButton } from '../components/PrimaryButton';
import {
  getTypeEngineDiagnosisUrl,
} from '../config/urls';
import {
  OTHER_RELATIONS,
  type OtherRelation,
  type OtherUnderstandingStackParamList,
} from '../flow/types';
import { sieColors } from '../theme';

type Props = NativeStackScreenProps<OtherUnderstandingStackParamList, 'Entry'>;

/**
 * ① 他者理解の入口
 * 相手を登録し、診断依頼 or エピソード入力へ分岐する。
 */
export function OtherUnderstandingEntryScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState<OtherRelation | null>(null);

  const openTypeEngineDiagnosis = async () => {
    const url = getTypeEngineDiagnosisUrl();
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        '開けませんでした',
        `診断画面を開けませんでした。\n${url}`,
      );
    }
  };

  const goEpisodeInput = () => {
    navigation.navigate('EpisodeInput', {
      name: name.trim() || undefined,
      relation: relation ?? undefined,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.heading}>
            他者理解のはじまり
          </Text>
          <Text style={styles.sub}>
            理解したい相手を登録し、診断してもらうか、エピソードから推測するかを選びます。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>相手の基本情報</Text>
          <TextInput
            mode="outlined"
            label="名前（任意）"
            value={name}
            onChangeText={setName}
            placeholder="例：山田さん"
            outlineColor={sieColors.border}
            activeOutlineColor={sieColors.accent}
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>関係性</Text>
          <View style={styles.chipRow}>
            {OTHER_RELATIONS.map((item) => {
              const selected = relation === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setRelation(item)}
                  style={[styles.chip, selected && styles.chipSelected]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>相手に診断してもらう</Text>
          <Text style={styles.sectionBody}>
            相手本人がエニアグラム診断を受けると、価値観の対比がより正確になります。
          </Text>
          <PrimaryButton
            label="相手にもタイプ診断をお願いする"
            onPress={openTypeEngineDiagnosis}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>診断できない場合</Text>
          <Text style={styles.sectionBody}>
            相手に頼めない・わからないときは、行動エピソードからタイプを推測します。
          </Text>
          <PrimaryButton
            label="診断してもらえない / わからない"
            mode="outlined"
            onPress={goEpisodeInput}
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
    gap: 12,
  },
  sectionTitle: {
    color: sieColors.accentStrong,
    fontSize: 16,
    fontWeight: '700',
  },
  sectionBody: {
    color: sieColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  fieldLabel: {
    color: sieColors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: sieColors.surface,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: sieColors.surface,
    borderColor: sieColors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: sieColors.chip,
    borderColor: sieColors.accent,
  },
  chipText: {
    color: sieColors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: sieColors.accentStrong,
  },
  divider: {
    backgroundColor: sieColors.border,
  },
});
