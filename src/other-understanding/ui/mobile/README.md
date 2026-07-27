# 他者理解モジュール — モバイルUI

Expo + React Native + TypeScript + React Native Paper

## 画面

1. `RelationshipInsightScreen` — 他者理解カード（Relationship Insight Card）

データは当面 `mocks/relationshipInsightMock.ts`。  
後で `runRelationshipDiagnosis` の結果を `toRelationshipInsightCard` 経由で接続します。

## カード構造

- ヘッダー: `あなた {consultantType} × 相手 {otherType}`
- 関係性チップ: `relation`（親子・恋人・上司部下・友人など）
- 推測バッジ: `isOtherTypeInferred` + 確度
- ①〜⑧: エンジン出力をそのまま表示（③④は箇条書き）

## 起動

```bash
cd src/other-understanding/ui/mobile
npm install
npm start
```

## 構成

```
mobile/
├── cards/          # RelationshipInsightCard
├── components/     # RelationChip / InferenceBadge
├── screens/        # RelationshipInsightScreen
├── mocks/          # ダミーデータ
└── theme.ts
```
