// chatHistoryStorage.ts
// チャット吹き出し履歴の永続化（直近10件）

import AsyncStorage from '@react-native-async-storage/async-storage';

export type ChatFlowMessage = {
  sender: 'user' | 'sie';
  text: string;
};

const CHAT_HISTORY_KEY = 'sai_chat_history';
const MAX_HISTORY = 10;

export async function saveChatHistory(
  history: ChatFlowMessage[]
): Promise<void> {
  try {
    const trimmed = history.slice(-MAX_HISTORY);
    await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(trimmed));
  } catch {
    // 保存失敗しても会話自体は止めない
  }
}

export async function loadChatHistory(): Promise<ChatFlowMessage[]> {
  try {
    const raw = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
    if (!raw) {
      return [];
    }
    return normalizeChatHistory(JSON.parse(raw));
  } catch {
    return [];
  }
}

export async function clearChatHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
  } catch {
    // ignore
  }
}

function normalizeChatHistory(raw: unknown): ChatFlowMessage[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .filter((item): item is ChatFlowMessage => {
      if (!item || typeof item !== 'object') {
        return false;
      }
      const msg = item as Partial<ChatFlowMessage>;
      return (
        (msg.sender === 'user' || msg.sender === 'sie') &&
        typeof msg.text === 'string'
      );
    })
    .slice(-MAX_HISTORY);
}
