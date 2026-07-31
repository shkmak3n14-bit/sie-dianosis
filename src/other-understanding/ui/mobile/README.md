# 他者理解モジュール — モバイルUI

Expo + React Native + TypeScript + React Native Paper

**レイヤー方針:** mobile は UI 専用。`core` の TS/TSX を直接 import しない。  
詳細は [`../../LAYERING.md`](../../LAYERING.md)。

## 画面

1. `OtherUnderstandingEntryScreen` — 入口（相手登録・診断/エピソード分岐）
2. `EpisodeInputScreen` — エピソード入力 → `inferTypes` → カード
3. `RelationshipInsightScreen` — 他者理解カード（推論結果表示）
4. `DailyEpisodeScreen` — 日々の出来事入力 → `dailyAnalysis`
5. `DailyEpisodeResultScreen` — 行動分析結果（背景/ズレ/調整/伝え方）

エピソード推論は `bridge/inferTypes.ts`（`mobile/data` の特徴タグ）。  
行動分析は `bridge/dailyAnalysis.ts`（`misalignmentPatterns` / `communicationStyles` / `stressPatterns` / `adjustmentTips` を使用）。  
質問診断（HTML）は type-engine。core は直接 import しません。

## 起動

```bash
cd src/other-understanding/ui/mobile
npm install
npm run sync:data
npm start
```

type-engine 診断 URL（デフォルトは GitHub Pages）:

- サイト: https://shkmak3n14-bit.github.io/sie-dianosis/
- 診断: https://shkmak3n14-bit.github.io/sie-dianosis/diagnosis.html

上書きする場合:

```bash
EXPO_PUBLIC_TYPE_ENGINE_DIAGNOSIS_URL=https://your-host/diagnosis.html
```

## 構成

```
mobile/
├── flow/             # ナビゲーション
├── screens/          # Entry / EpisodeInput / Insight / DailyEpisode / DailyEpisodeResult
├── cards/
├── components/
├── templates/
├── data/
├── mocks/
├── config/urls.ts
└── metro.config.js
```
