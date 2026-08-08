/**
 * UI ↔ core bridge の入出力契約
 * - success: 正常な返答 → チャットにメッセージ表示
 * - failure: 入力不正など想定内の失敗 → エラーカード表示
 * - error: bridge / core の例外 → システムエラー表示
 */

export type SieRequest = {
  /** 相談者の入力テキスト */
  text: string;
  /** 診断結果（例: "9w8"）。未指定時はプレビュー既定を使う */
  wingCode?: string;
};

export type SiePersona = {
  /** 常に sie（S.I.E.） */
  id: 'sie';
  /** UI 表示用 */
  name: 'S.I.E.（サイ）';
  tone: 'gentle' | 'logical';
  /** 例: "9w8" / "2w1" */
  wingCode?: string;
};

export type SieSuccessResponse = {
  status: 'success';
  /** 例: "angerDelay" */
  type: string;
  /** UI 表示用ラベル */
  label: string;
  /** ステップ列 */
  flow: string[];
  /** 各ステップの文章 */
  messages: string[];
  persona: SiePersona;
};

export type SieFailureResponse = {
  status: 'failure';
  error: {
    code: 'INVALID_INPUT' | 'MISSING_FIELD' | 'UNKNOWN_TYPE';
    message: string;
    detail?: string;
  };
};

export type SieErrorResponse = {
  status: 'error';
  error: {
    code: 'BRIDGE_EXCEPTION' | 'CORE_EXCEPTION';
    message: string;
    detail?: string;
  };
};

export type SieResponse =
  | SieSuccessResponse
  | SieFailureResponse
  | SieErrorResponse;
