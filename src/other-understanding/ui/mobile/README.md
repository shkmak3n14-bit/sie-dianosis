# 他者理解モジュール — モバイルUI

Expo + React Native + TypeScript + React Native Paper

**レイヤー方針:** mobile は UI 専用。`core` の TS/TSX を直接 import しない。  
表示用は `templates/` と `data/`（`core/data` のコピー）を使う。  
詳細は [`../../LAYERING.md`](../../LAYERING.md)。

## 画面

1. `RelationshipInsightScreen` — 他者理解カード（Relationship Insight Card）

データは当面 `mocks/relationshipInsightMock.ts`（`data/enneagram` から組み立て）。  
後でホストアプリが core パッケージ結果を `toRelationshipInsightCard` に渡します。

## カード構造

- ヘッダー: `あなた {consultantType} × 相手 {otherType}`
- 関係性チップ: `relation`（親子・恋人・上司部下・友人など）
- 推測バッジ: `isOtherTypeInferred` + 確度
- ①〜⑧: エンジン出力をそのまま表示（③④は箇条書き）

## 起動

```bash
cd src/other-understanding/ui/mobile
npm install
npm run sync:data   # core/data の辞書をコピー
npm start
```

## 構成

```
mobile/
├── cards/
├── components/
├── screens/
├── templates/      # UI用テンプレート（core と同形のコピー）
├── data/           # 辞書コピー（type_summary / misalignment 等）
├── mocks/
├── scripts/sync-data.js
├── metro.config.js # core を watch しない
└── theme.ts
```
