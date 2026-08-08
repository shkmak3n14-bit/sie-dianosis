import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { sieColors } from '../theme';
import { SIE_AVATAR } from './sieAvatar';

type Props = {
  /** 省略時は SIE_AVATAR.name */
  name?: string;
  subtitle?: string;
};

/** 画面上部に固定する sie ヘッダー */
export function FixedCharacterHeader({
  name = SIE_AVATAR.name,
  subtitle = '自己理解チャット',
}: Props) {
  return (
    <View style={styles.header}>
      <View style={[styles.avatar, { backgroundColor: SIE_AVATAR.color }]}>
        <Text style={styles.icon}>{SIE_AVATAR.icon}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={[styles.name, { color: SIE_AVATAR.color }]}>{name}</Text>
        <Text style={styles.sub}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: sieColors.surfaceSoft,
    borderBottomWidth: 1,
    borderBottomColor: sieColors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  meta: {
    gap: 2,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  sub: {
    color: sieColors.muted,
    fontSize: 12,
  },
});
