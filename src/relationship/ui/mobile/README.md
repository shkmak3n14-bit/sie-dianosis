# 相互理解モジュール — モバイルUI

Expo + React Native + TypeScript + React Native Paper

**レイヤー方針:** mobile は UI 専用。`core` の TS/TSX を直接 import しない。  
詳細は [`../../LAYERING.md`](../../LAYERING.md)。

## 画面（ワイヤー骨格）

1. `RelationshipEntryScreen` — 入口（自分タイプ × 相手タイプの確認）
2. `MutualInsightScreen` — 相互理解カード（①〜⑧）

辞書は `bridge/` 経由で `mobile/data` を読む想定。core は直接 import しません。

## 起動

```bash
cd src/relationship/ui/mobile
npm install
npm run sync:data
npm start
```

## 構成

```
mobile/
├── flow/             # ナビゲーション
├── screens/          # Entry / MutualInsight
├── cards/
├── components/
├── templates/
├── data/enneagram/   # 辞書コピー
├── bridge/
├── mocks/
├── config/
└── scripts/sync-data.js
```
