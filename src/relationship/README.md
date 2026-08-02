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

## 正本と補助（④⑤）

| もの | 役割 |
|------|------|
| `data/enneagram/1x1.ts`〜`9x9.ts` | **正本（⑤）** |
| `pair_registry` + `runMutualUnderstanding` | 正本を返す入口 |
| `convert/buildRelationship` | **補助（④）** 変換生成。単純結合しない |
| [`convert/CONVERSION_RULES.md`](./core/convert/CONVERSION_RULES.md) | 変換ルール |
| [`data/enneagram/CANONICAL.md`](./core/data/enneagram/CANONICAL.md) | 正本運用 |

## 8本柱（①〜⑧）

`MutualUnderstanding` 型に集約。正本ファイル（NxM.ts）が柱すべてを持つ。

```
相互理解モジュール入口
    ├─ status / viciousCycle / cognitiveGap / virtuousCycle
    └─ respect / responsibility / defer / communication
```

## 構成

```
relationship/
├── LAYERING.md
├── core/
│   ├── convert/                   # ④ 変換（補助）
│   ├── types/                     # MutualUnderstanding / Seed
│   ├── data/enneagram/            # ⑤ 正本 81 + registry
│   ├── run_mutual_understanding.ts
│   └── index.ts
└── ui/mobile/
```

## 制約

- `core` はロジック専用。`ui/mobile` から core の TS を直接 import しない
- 本番は正本レジストリを読む。`buildRelationship` で正本を黙って上書きしない
- 他 Context のファイルは変更しない
