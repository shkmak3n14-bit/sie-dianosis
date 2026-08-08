import { useEffect, useRef, type RefObject } from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';
import { ChatBubble } from './ChatBubble';
import { SIE_AVATAR } from './sieAvatar';
import type { ChatFlowMessage } from './useChatFlow';

type Props = {
  messages: ChatFlowMessage[];
  listRef?: RefObject<FlatList<ChatFlowMessage> | null>;
  /** persona 未設定の sie 発言に付ける参照タイプ */
  defaultWingCode?: string;
};

export function ChatMessageList({
  messages,
  listRef,
  defaultWingCode,
}: Props) {
  return (
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(_, index) => String(index)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <AnimatedMessage item={item} defaultWingCode={defaultWingCode} />
      )}
      onContentSizeChange={() =>
        listRef?.current?.scrollToEnd({ animated: true })
      }
    />
  );
}

function AnimatedMessage({
  item,
  defaultWingCode,
}: {
  item: ChatFlowMessage;
  defaultWingCode?: string;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  const persona =
    item.sender === 'sie'
      ? {
          id: item.persona?.id ?? 'sie',
          name: item.persona?.name ?? SIE_AVATAR.name,
          tone:
            item.persona?.tone === 'logical'
              ? ('logical' as const)
              : ('gentle' as const),
          wingCode: item.persona?.wingCode ?? defaultWingCode,
        }
      : undefined;

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        marginVertical: 4,
      }}
    >
      <ChatBubble sender={item.sender} text={item.text} persona={persona} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexGrow: 1,
  },
});
