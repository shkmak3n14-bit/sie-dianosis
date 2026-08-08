import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { sieColors } from '../theme';
import { SIE_AVATAR } from './sieAvatar';

export type ChatBubbleProps = {
  text: string;
  /** 新チャットフロー用 */
  sender?: 'user' | 'sie';
  /** 既存リスト用（後方互換） */
  role?: 'character' | 'user';
  /** sie 発言時の人格（tone / wingCode） */
  persona?: {
    id: string;
    name: string;
    tone: 'gentle' | 'logical';
    wingCode?: string;
  };
};

export function ChatBubble({ sender, role, text, persona }: ChatBubbleProps) {
  const isUser = sender === 'user' || role === 'user';
  const isSie = !isUser;

  const sieToneStyle =
    isSie && persona?.id === 'sie'
      ? persona.tone === 'logical'
        ? styles.sieLogical
        : styles.sieGentle
      : isSie
        ? styles.sieGentle
        : null;

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.sieContainer,
      ]}
    >
      {isSie ? (
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>{SIE_AVATAR.icon}</Text>
        </View>
      ) : null}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.sieBubble,
          sieToneStyle,
        ]}
      >
        <Text style={[styles.text, isUser ? styles.userText : styles.sieText]}>
          {text}
        </Text>

        {isSie && persona?.wingCode ? (
          <Text style={styles.wingCode}>タイプ {persona.wingCode}</Text>
        ) : null}
      </View>
    </View>
  );
}

export default ChatBubble;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 6,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  sieContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    marginRight: 8,
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 20,
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  /** 従来通りのユーザー吹き出し */
  userBubble: {
    backgroundColor: sieColors.accent,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  sieBubble: {
    backgroundColor: SIE_AVATAR.color,
    alignSelf: 'flex-start',
  },
  /** tone: gentle（柔らかい色・丸み） */
  sieGentle: {
    backgroundColor: SIE_AVATAR.color,
    opacity: 0.9,
    borderRadius: 14,
  },
  /** tone: logical（落ち着いた色・直線的） */
  sieLogical: {
    backgroundColor: '#3E5C82',
    borderRadius: 6,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#ffffff',
  },
  sieText: {
    color: '#ffffff',
  },
  wingCode: {
    marginTop: 4,
    color: '#E0E8F0',
    fontSize: 12,
  },
});
