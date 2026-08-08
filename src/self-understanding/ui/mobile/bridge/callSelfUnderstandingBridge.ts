import { buildPromptWithPersona } from '../data/sie_persona';
import type { SieRequest, SieResponse } from './sieResponse';

const SIE_PERSONA_NAME = 'S.I.E.（サイ）' as const;

const ANGER_DELAY_FLOW = [
  '状況の具体化',
  '怒りが遅れて立ち上がる構造の説明',
  '嫌いになる前に気づくための手がかり',
] as const;

function isAngerDelayTheme(text: string): boolean {
  return (
    text.includes('怒りに気がつくのが遅くて') ||
    (text.includes('怒り') && text.includes('気がつくのが遅'))
  );
}

function buildAngerDelayFallbackMessages(wingCode: string): string[] {
  return [
    'まず状況を少し具体化したいんだ。どんな場面で「気づいたら嫌いになっていた」が起きやすい？',
    `タイプ${wingCode}の傾向として、怒りは「我慢 → スルー → 平和優先」のあとにまとめて出てくることが多いんだ。だから、怒りよりも「小さな違和感」を早めにキャッチすることが大事になるよ。`,
    '嫌いになる前に気づくためには、過去の場面を振り返って「その少し前にどんなサインがあったか」を言語化するのが役に立つんだ。次のやりとりでは、そのサインを一緒に見つけていこう。',
  ];
}

function buildAngerDelayTaskPrompt(userText: string, wingCode: string): string {
  return [
    'テーマ: angerDelay（怒りに気がつくのが遅い）',
    `ユーザー入力: ${userText.trim()}`,
    `診断タイプ: ${wingCode}`,
    '',
    '以下の3ステップで返答してください。各ステップは1〜3文。ステップ番号や見出しは付けず、段落を空行で区切ってください。',
    `1. ${ANGER_DELAY_FLOW[0]}（状況を具体化する質問）`,
    `2. ${ANGER_DELAY_FLOW[1]}（タイプ傾向を踏まえた説明）`,
    `3. ${ANGER_DELAY_FLOW[2]}（次に一緒に探す手がかり）`,
  ].join('\n');
}

function parseStepMessages(reply: string): string[] | null {
  const parts = reply
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length < ANGER_DELAY_FLOW.length) {
    return null;
  }
  return parts.slice(0, ANGER_DELAY_FLOW.length);
}

async function fetchSieLlmReply(prompt: string): Promise<string | null> {
  const endpoint = process.env.EXPO_PUBLIC_SIE_LLM_ENDPOINT;
  if (!endpoint) {
    return null;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`SIE_LLM_HTTP_${response.status}`);
  }

  const data = (await response.json()) as { reply?: string; text?: string };
  const reply = data.reply ?? data.text;
  if (!reply?.trim()) {
    throw new Error('SIE_LLM_EMPTY_REPLY');
  }
  return reply.trim();
}

/**
 * self-understanding bridge 入口（preview）
 * 当面は怒りの遅延認知テーマのみ扱う。
 */
export async function callSelfUnderstandingBridge(
  req: SieRequest,
): Promise<SieResponse> {
  try {
    if (!req.text || req.text.trim().length === 0) {
      return {
        status: 'failure',
        error: {
          code: 'MISSING_FIELD',
          message: '入力テキストが空です。',
        },
      };
    }

    if (!isAngerDelayTheme(req.text)) {
      return {
        status: 'failure',
        error: {
          code: 'UNKNOWN_TYPE',
          message: 'このテーマはまだプレビュー対象外です。',
        },
      };
    }

    const wingCode = req.wingCode ?? '9w8';
    const flow = [...ANGER_DELAY_FLOW];
    const fallbackMessages = buildAngerDelayFallbackMessages(wingCode);

    const taskPrompt = buildAngerDelayTaskPrompt(req.text, wingCode);
    const prompt = buildPromptWithPersona(taskPrompt, {
      wingCode: req.wingCode,
    });

    let messages = fallbackMessages;
    try {
      const llmReply = await fetchSieLlmReply(prompt);
      const parsed = llmReply ? parseStepMessages(llmReply) : null;
      if (parsed) {
        messages = parsed;
      }
    } catch {
      // API 未設定・一時失敗時はプレビュー定型文へフォールバック
      messages = fallbackMessages;
    }

    return {
      status: 'success',
      type: 'angerDelay',
      label: '怒りに気づくタイミングの整理（診断結果反映）',
      flow,
      messages,
      persona: {
        id: 'sie',
        name: SIE_PERSONA_NAME,
        tone: 'gentle',
        wingCode: req.wingCode,
      },
    };
  } catch (e: unknown) {
    return {
      status: 'error',
      error: {
        code: 'BRIDGE_EXCEPTION',
        message: 'bridge 内部で例外が発生しました。',
        detail: String(e),
      },
    };
  }
}
