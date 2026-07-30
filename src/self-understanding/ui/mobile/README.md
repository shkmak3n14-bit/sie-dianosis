# 自己理解モジュール — モバイルUI

Expo + React Native + TypeScript + React Native Paper

**レイヤー方針:** mobile は UI 専用。`core` の TS を直接 import しない。  
詳細は [`../../LAYERING.md`](../../LAYERING.md)。

## 画面フロー

1. `ResultCardsScreen` — 診断結果カード（入口）
2. `ChatScreen` — 自由入力（下部サイ吹き出しから遷移）

関連画面: `CategoryItems` / `AskSaiTemplates` / `DeepDiveCards` / `AbstractWordExample`

チャットは当面 `bridge/` の preview 実装。本番ロジックはホスト経由で core に接続します。

## 起動

```bash
cd src/self-understanding/ui/mobile
npm install
npm run sync:data
npm start
```

## 構成

```
mobile/
├── screens/
├── cards/
├── character_view/
├── chat/
├── bridge/           # previewCoreApi（core 非 import）
├── templates/        # UI 用型（sai_conversation）
├── data/             # sai_persona 等のコピー
├── components/
├── flow/
├── mocks/
└── metro.config.js   # core を watch しない
```
