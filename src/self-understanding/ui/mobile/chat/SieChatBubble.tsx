import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import type { SiePersona } from '../bridge/sieResponse';
import { sieColors } from '../theme';
import { SIE_AVATAR } from './sieAvatar';

type Props = {
  speaker: 'sie';
  tone: SiePersona['tone'];
  wingCode?: string;
  /** flow のステップ名（任意表示） */
  stepLabel?: string;
  children: ReactNode;
};

/**
 * sie のメッセージ描画。
 * 人格は常に sie。tone / wingCode は見た目と補助ラベルに反映する。
 */
export function SieChatBubble({
  speaker: _speaker,
  tone,
  wingCode,
  stepLabel,
  children,
}: Props) {
  const isLogical = tone === 'logical';

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.avatar,
          { backgroundColor: SIE_AVATAR.color },
        ]}
      >
        <Text style={styles.avatarIcon}>{SIE_AVATAR.icon}</Text>
      </View>

      <View style={styles.column}>
        <View style={styles.metaRow}>
          <Text style={[styles.name, { color: SIE_AVATAR.color }]}>
            {SIE_AVATAR.name}
          </Text>
          {wingCode ? (
            <Text style={styles.wing}>参照: {wingCode}</Text>
          ) : null}
        </View>

        {stepLabel ? <Text style={styles.step}>{stepLabel}</Text> : null}

        <View
          style={[
            styles.bubble,
            isLogical ? styles.bubbleLogical : styles.bubbleGentle,
          ]}
        >
          <Text
            style={[
              styles.text,
              isLogical ? styles.textLogical : styles.textGentle,
            ]}
          >
            {children}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 18,
  },
  column: {
    flex: 1,
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
  },
  wing: {
    fontSize: 11,
    color: sieColors.muted,
  },
  step: {
    fontSize: 11,
    color: sieColors.muted,
  },
  bubble: {
    maxWidth: '100%',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
  },
  bubbleGentle: {
    backgroundColor: sieColors.surface,
    borderColor: sieColors.border,
  },
  bubbleLogical: {
    backgroundColor: '#eef2f8',
    borderColor: '#c5d0e0',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  textGentle: {
    color: sieColors.text,
  },
  textLogical: {
    color: '#243247',
  },
});
