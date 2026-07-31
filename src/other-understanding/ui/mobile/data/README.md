# mobile / data

UI 表示・プレビュー用の辞書コピーです。

## 方針

| 層 | 役割 |
|----|------|
| `core/data/` | **正本**（ロジック＋将来 npm パッケージの公開データ面） |
| `ui/mobile/data/` | Expo 用コピー（mobile から core を直接 import しない） |

将来 `core` を `@sie/other-understanding-core` として npm 化した後は、
アプリ本体がパッケージを依存し、mobile のコピー同期は段階的に縮小できます。
当面の Expo プレビューではコピー運用を維持します。

## 同期対象（正本 → コピー）

- `type_summary.ts`
- `misalignment_patterns_dictionary.ts`
- `communication_style_for_other_dictionary.ts`
- `observation_tags_dictionary.ts`

### mobile 専用（手動管理）

- `stress_patterns_dictionary.ts`
- `adjustment_tips_dictionary.ts`

```bash
cd src/other-understanding/ui/mobile
npm run sync:data
```

ロジック（engine / type_inference など）はコピーしません。  
カード表示に必要な静的データのみです。
