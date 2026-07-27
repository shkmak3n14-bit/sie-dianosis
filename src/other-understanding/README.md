# other-understanding（他者理解モジュール）

相談者と相手の関係を、エニアグラムの構造で整理する Context です。
ロジック（`core`）と UI（`ui`）を分離します。

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
├── core/                          # UI非依存のドメイン層
│   ├── diagnosis_entry/           # ① 入口・診断誘導・対比
│   ├── type_inference/            # ② エピソードからタイプ推測
│   ├── observation/               # ② 観察ポイント・質問案
│   ├── misalignment/              # ③ 認知のズレ分析
│   ├── relationship_adjustment/   # ③ 境界線・関わり調整
│   ├── data/enneagram/            # 辞書（self-understanding と対）
│   │   ├── schema.ts
│   │   ├── center/ types/ wings/ instincts/  # 流用
│   │   ├── communication_style_for_other_dictionary.ts
│   │   ├── reply_style_for_other_dictionary.ts
│   │   ├── observation_points_dictionary.ts
│   │   └── misalignment_patterns_dictionary.ts
│   └── templates/                 # 出力テンプレート
└── ui/
    ├── components/
    ├── screens/
    ├── cards/
    └── chat/
```

詳細は `core/data/README.md` を参照。

## 制約

- Core は UI 非依存
- 自己理解モジュール（`self-understanding`）の診断結果は読み取りのみ
- `center` / `types` / `wings` / `instincts` は self-understanding から流用（再エクスポート）
- 相手タイプが未確定のときは推測であることを明示する
