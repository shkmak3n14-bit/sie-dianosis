# other-understanding（他者理解モジュール）

相談者と相手の関係を、エニアグラムの構造で整理する Context です。
ロジック（`core`）と UI（`ui/mobile`）を分離します。

層分離は self-understanding と同一ルール → [`LAYERING.md`](./LAYERING.md)

## 3本柱（入口分岐）

```
他者理解モジュール入口
    ├─ 相手が診断を受けてくれる → ① diagnosis_entry
    └─ 診断を受けてくれない → ② type_inference（＋ observation）
            ↓
        認知のズレ分析 → ③ misalignment → relationship_adjustment
```

| 柱 | 担当 | 目的 |
|----|------|------|
| ① | `diagnosis_entry` | 相手に診断を促し、価値観の対比表を作る |
| ② | `type_inference` / `observation` | エピソードからタイプ推測・確度・観察ポイント |
| ③ | `misalignment` / `relationship_adjustment` | 認知のズレ・境界線・関わり方の調整 |

## 構成

```
other-understanding/
├── LAYERING.md
├── core/                          # ロジック専用（@sie/other-understanding-core 予定）
│   ├── package.json
│   ├── diagnosis_entry/
│   ├── type_inference/
│   ├── observation/
│   ├── misalignment/
│   ├── relationship_adjustment/
│   ├── data/enneagram/            # 辞書の正本
│   └── templates/
└── ui/
    └── mobile/                    # UI 専用（core を直接 import しない）
        ├── cards/
        ├── components/
        ├── screens/
        ├── templates/             # UI 用（core 非依存）
        ├── data/enneagram/        # 辞書コピー（npm run sync:data）
        └── mocks/
```

詳細は `LAYERING.md` / `core/data/README.md` / `ui/mobile/README.md` を参照。

## 制約

- `core` はロジック専用（UI 非依存）。`ui/mobile` から core の TS/TSX を直接 import しない
- UI で必要な型・整形は `ui/mobile/templates/`、辞書は `ui/mobile/data/` に置き、`npm run sync:data` で正本と揃える
- 将来はホストアプリが `@sie/other-understanding-core` を依存してエンジン結果を UI に渡す
- 自己理解モジュール（`self-understanding`）の診断結果は読み取りのみ
- `center` / `types` / `wings` / `instincts` は self-understanding から流用（再エクスポート）
- 相手タイプが未確定のときは推測であることを明示する
