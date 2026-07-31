import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import type { RelationshipStackParamList } from '../flow/types';

type Props = NativeStackScreenProps<
  RelationshipStackParamList,
  'RelationshipEntry'
>;

/**
 * 相互理解入口（ワイヤー骨格）
 * 自分タイプ × 相手タイプを確認して洞察画面へ
 */
export function RelationshipEntryScreen({ navigation }: Props) {
  const [selfType, setSelfType] = useState('9');
  const [otherType, setOtherType] = useState('3');

  return (
    <View style={styles.root}>
      <Text variant="headlineSmall" style={styles.title}>
        相互理解
      </Text>
      <Text variant="bodyMedium" style={styles.lead}>
        自分と相手の関係の構造を見る（相手単体の他者理解とは別）
      </Text>

      <TextInput
        label="自分のタイプ"
        value={selfType}
        onChangeText={setSelfType}
        mode="outlined"
        style={styles.input}
        keyboardType="number-pad"
      />
      <TextInput
        label="相手のタイプ"
        value={otherType}
        onChangeText={setOtherType}
        mode="outlined"
        style={styles.input}
        keyboardType="number-pad"
      />

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('MutualInsight', {
            selfType,
            otherType,
          })
        }
      >
        関係を見る
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    marginTop: 8,
  },
  lead: {
    opacity: 0.75,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
  },
});
