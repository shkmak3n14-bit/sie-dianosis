# relationship（相互理解モジュール）

自分 × 相手の**関係の構造**を理解し、改善する Context です。  
他者理解（相手単体の説明書）とは対象が異なります。

層分離は self / other と同一ルール → [`LAYERING.md`](./LAYERING.md)

## 他モジュールとの境界

| モジュール | 対象 | 一言 |
|---|---|---|
| `type-engine` | タイプ確定 | 診断 |
| `self-understanding` | 自分単体 | 自分の説明書 |
| `other-understanding` | 相手単体 | 相手の説明書 |
| **`relationship`** | **自分 × 相手** | **関係の説明書** |

- 自己理解・他者理解の結果は**読み取りのみ**（書き換えない）
- `other-understanding` の `relationship_adjustment` は「相手への関わり方」であり、本モジュールの関係構造分析とは別物

## 8本柱（①〜⑧）

```
相互理解モジュール入口
    ├─ ① status              関係の現状（うまくいっている／いない）
    ├─ ② vicious_cycle       悪循環の入口
    ├─ ③ cognitive_gap       認知のズレ（関係版：ズレ×ズレ）
    ├─ ④ virtuous_cycle      好循環への道筋
    ├─ ⑤ respect             相手を尊重する方法
    ├─ ⑥ responsibility      自分の問題か相手の問題か（責務分離）
    ├─ ⑦ defer               棚上げする決断ポイント
    └─ ⑧ communication       伝え方の工夫（自分×相手）
```

| # | 担当 | 辞書（正本: `core/data/enneagram/`） |
|---|------|--------------------------------------|
| ① | `status` | `pair_status_dictionary.ts` |
| ② | `vicious_cycle` | `vicious_cycle_patterns_dictionary.ts` |
| ③ | `cognitive_gap` | `cognitive_gap_pair_dictionary.ts` |
| ④ | `virtuous_cycle` | `virtuous_cycle_dictionary.ts` |
| ⑤ | `respect` | `respect_points_dictionary.ts` |
| ⑥ | `responsibility` | `responsibility_split_dictionary.ts` |
| ⑦ | `defer` | `defer_points_dictionary.ts` |
| ⑧ | `communication` | `communication_pair_dictionary.ts` |

## 構成

```
relationship/
├── LAYERING.md
├── core/                          # ロジック専用（@sie/relationship-core 予定）
│   ├── package.json
│   ├── status/
│   ├── vicious_cycle/
│   ├── cognitive_gap/
│   ├── virtuous_cycle/
│   ├── respect/
│   ├── responsibility/
│   ├── defer/
│   ├── communication/
│   ├── data/enneagram/            # 辞書の正本（タイプ×タイプ）
│   ├── templates/
│   ├── run_mutual_understanding.ts
│   └── index.ts
└── ui/
    └── mobile/                    # UI 専用（core を直接 import しない）
        ├── flow/
        ├── screens/
        ├── cards/
        ├── components/
        ├── bridge/
        ├── templates/
        ├── data/enneagram/        # 辞書コピー（npm run sync:data）
        └── mocks/
```

## 今後の進め方

1. **A** 全体構造 ← 本ディレクトリ（骨格）
2. **B** ①〜⑧の辞書スキーマ設計の精緻化
3. **C** 関係パターン辞書（タイプ×タイプ）の中身投入
4. **D** UI ワイヤーフレーム／画面実装

## 制約

- `core` はロジック専用（UI 非依存）。`ui/mobile` から core の TS を直接 import しない
- UI で必要な型・整形は `ui/mobile/templates/`、辞書は `ui/mobile/data/` に置き、`npm run sync:data` で正本と揃える
- 将来はホストアプリが `@sie/relationship-core` を依存してエンジン結果を UI に渡す
- 他 Context（`type-engine` / `self-understanding` / `other-understanding`）のファイルは変更しない
