// response_engine/tone/detectToneLLM.ts
// 感情トーン判定（LLM版 + オフラインモック）

import { callLLM } from '../../../llm/llm_client';
import { detectTone, type ToneType } from '../tone_detector';

export type { ToneType };

/**
 * ユーザー発話の感情トーンを LLM で判定する。
 * エンドポイント未設定時は本物と同じ JSON 形式のモックを使う。
 * 失敗時・不正値時は calm にフォールバック。
 */
export async function detectToneLLM(userInput: string): Promise<ToneType> {
  const raw = !process.env.EXPO_PUBLIC_SIE_LLM_ENDPOINT
    ? mockToneJson(userInput)
    : await callLLMForTone(userInput);

  try {
    const parsed = JSON.parse(extractJson(raw)) as { tone?: string };
    if (
      parsed.tone === 'soft' ||
      parsed.tone === 'calm' ||
      parsed.tone === 'voice'
    ) {
      return parsed.tone;
    }
  } catch {
    // JSON parse error → fallback
  }

  return 'calm';
}

async function callLLMForTone(userInput: string): Promise<string> {
  const prompt = `
あなたはユーザーの発話から「感情トーン」を判定する分類器です。

判定するトーンは次の3つだけです：

- soft：不安・戸惑い・弱い否定・モヤモヤ
- calm：落ち着き・整理したい気持ち・ニュートラル
- voice：軽い相談・ゆるい気持ち・音声向けの軽い話し方

判定基準：
- 不安語（わからない／分からない／違う／モヤモヤ／不安）があれば soft
- 整理語（なるほど／気になった／もう少し）があれば calm
- 軽い語（うーん／そうなんだよね／ちょっと）があれば voice

返答は JSON のみで、次の形式にしてください：

{"tone": "soft"}

余計な文章は一切書かないでください。
`;

  return callLLM(prompt + `\n\nユーザー発話: ${userInput}`, {
    includePersona: false,
  });
}

/** オフライン用：本物と同じ JSON 形式で返す */
function mockToneJson(userInput: string): string {
  const tone = detectTone(userInput);
  return JSON.stringify({ tone });
}

/** 応答に説明文が混ざっても JSON 部分だけ取り出す */
function extractJson(raw: string): string {
  const trimmed = raw.trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) {
    return trimmed.slice(start, end + 1);
  }
  return trimmed;
}
