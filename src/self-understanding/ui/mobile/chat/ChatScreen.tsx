import { useEffect, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SelfUnderstandingStackParamList } from '../flow/types';
import { selfUnderstandingMock } from '../mocks/selfUnderstandingMock';
import { sieColors } from '../theme';
import { ChatMessageList } from './ChatMessageList';
import { FixedCharacterHeader } from './FixedCharacterHeader';
import InputBox from './InputBox';
import { SIE_AVATAR } from './sieAvatar';
import { useChatFlow, type ChatFlowMessage } from './useChatFlow';

type Props = NativeStackScreenProps<SelfUnderstandingStackParamList, 'Chat'>;

export default function ChatScreen({ route }: Props) {
  const wingCode = selfUnderstandingMock.resultCard.wingCode;
  const { messages, sendMessage, sendVoiceMessage } = useChatFlow({
    enneagramType: wingCode,
  });
  const listRef = useRef<FlatList<ChatFlowMessage>>(null);
  const didSendTemplateRef = useRef(false);

  useEffect(() => {
    const templateText = route.params?.templateText?.trim();
    if (!templateText || didSendTemplateRef.current) {
      return;
    }
    didSendTemplateRef.current = true;
    void sendMessage(templateText);
  }, [route.params?.templateText, sendMessage]);

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <FixedCharacterHeader name={SIE_AVATAR.name} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        <ChatMessageList
          messages={messages}
          listRef={listRef}
          defaultWingCode={wingCode}
        />

        <InputBox onSend={sendMessage} onVoiceRecorded={sendVoiceMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: sieColors.bg,
  },
  flex: {
    flex: 1,
  },
});
