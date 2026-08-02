# フィールド対応表（③）

自己理解（self）↔ 他者理解（other）↔ 下書き（`_drafts`）の対応を定義する。  
スキーマ本体は [`schema.ts`](./schema.ts) / [`SCHEMA.md`](./SCHEMA.md)。

## 対応の種類

| 記号 | 意味 |
|------|------|
| **同一** | フィールド名・意味とも同じ（コピー可） |
| **展開** | 一文 → 配列（詳細化）。要約はコア側に残す |
| **派生** | 意味は近いが 1:1 ではない。昇格時に人手で振り分け |
| **片側専用** | 対応なし。無理に埋めない |
| **既存辞書連携** | 別ファイルの辞書と後で同期しうる |

---

## 1. self コア ↔ other コア（同一）

self: `EnneagramTypeEntry`  
other: `EnneagramTypeCore`（＝`OtherTypeEntry` のコア部）

| self | other (Core) | 関係 | 昇格ルール |
|------|--------------|------|------------|
| `coreFear` | `coreFear` | 同一 | 同文でよい。other 視点の言い換え可 |
| `coreDesire` | `coreDesire` | 同一 | 同上 |
| `stressPattern` | `stressPattern` | 同一 | 一文の要約のみ |
| `growthDirection` | `growthDirection` | 同一 | 一文の要約のみ |
| `conflictStyle` | `conflictStyle` | 同一 | 一文の要約のみ |
| `blindSpot` | `blindSpot` | 同一 | 一文の要約のみ |

**注意:** 既存 `other/.../wings/*.ts` は当面 self 再エクスポート。新正本は `profiles/` の `OtherTypeEntry`。

---

## 2. self / Core ↔ other 拡張（展開・派生）

other: `OtherTypeBehavior`（`OtherTypeEntry` の拡張部）

| self / Core | other (Behavior) | 関係 | 昇格ルール |
|-------------|------------------|------|------------|
| `coreDesire` | `coreMotivation[]` | 展開 | 欲求を動機の箇条に分解。コア一文は残す |
| `blindSpot` | `blindspots[]` | 展開 | 単数の盲点を、外から見える影の複数に展開 |
| `stressPattern` | `stressPatternDetail[]` | 展開 | 応力の段階・兆候。コアは要約のまま |
| `growthDirection` | `growthPoints[]` | 展開 | 成長の具体ヒント。コアは方向の一文 |
| `conflictStyle` | `behaviorExamples[]` の一部 | 派生 | 衝突の出方に対応する行動例を抽出 |
| — | `strengths[]` | 片側専用 | other のみ（外から見える強み） |
| — | `behaviorExamples[]` | 片側専用 | 観察可能な行動（推論材料） |
| — | `observationTags[]` | 片側専用 | 特徴タグ候補 |
| — | `communicationDo[]` | 片側専用 | 相手向けの伝え方 |
| — | `communicationAvoid[]` | 片側専用 | 避ける伝え方 |
| — | `communicationExamples[]` | 片側専用 | 言い回し例 |

### 命名差（意図的）

| Core | Behavior | 理由 |
|------|----------|------|
| `blindSpot`（単数・一文） | `blindspots`（複数） | コア要約 vs 観察用の列挙を区別する |

対応表を読むときは **「同義の展開」** であり、別概念ではない。

---

## 3. 下書き A/B ↔ スキーマ

下書き: `_drafts/wings/type{N}w{M}.md`

| 下書き | スキーマ | 関係 |
|--------|----------|------|
| A. `coreFear` … `blindSpot` | `EnneagramTypeCore` | 同一（A＝コア原稿） |
| B. `coreMotivation` … | `OtherTypeBehavior` | 同一（B＝拡張原稿） |
| 観察（日常／応力／象徴） | — | 片側専用（正本に出さない） |
| C. 相互理解シード | — | 本表の外 → ④ |

昇格（②）の流れ:

```
下書き A → OtherTypeEntry のコア6フィールド
下書き B → OtherTypeEntry の Behavior 配列
観察・象徴 → 捨てる or 内部メモのみ（ユーザー非表示）
```

---

## 4. other 拡張 ↔ 既存 other 辞書（連携）

| OtherTypeBehavior | 既存辞書 | 関係 |
|-------------------|----------|------|
| `observationTags[]` | `observation_tags_dictionary.ts` | 既存辞書連携（タグ語彙の供給源になりうる） |
| `communicationDo` | `communication_style_for_other` の `safe` | 既存辞書連携（翼→純タイプ要約時に集約しうる） |
| `communicationAvoid` | 同 `avoid` | 同上 |
| `communicationExamples` | 同 `tip` の材料 | 派生 |
| `behaviorExamples` | observation / dailyAnalysis | 既存辞書連携 |
| `growthPoints` | misalignment の `adjustment_tips` 材料 | 派生 |

**ルール:** `profiles/` が厚くなったら、純タイプ辞書は profiles を集約して更新する（逆流で profiles を薄くしない）。

---

## 5. ④向け参考 — 下書き C ↔ MutualUnderstanding

③の本体外。変換ルール設計（④）の入力対応。

| 下書き C | `MutualUnderstanding` | 関係 |
|----------|----------------------|------|
| `strengthAxes` | `status.good` | 変換材料（相手の軸と組み合わせ） |
| `frictionAxes` | `status.bad` | 変換材料 |
| `viciousTriggers` | `viciousCycle.triggers` | 変換材料 |
| `viciousLoopHints` | `viciousCycle.loop` / `typePatterns` | 変換材料 |
| `cognitiveGapSelf` | `cognitiveGap.selfGap` または `otherGap` | 役割は self/other 位置で決まる |
| `respectNeeds` | `respect.forSelf` / `forOther` | 位置依存 |
| `overAdaptation` | `responsibility.self` / `other` | 位置依存 |
| `boundaryHints` | `responsibility.boundary` | 変換材料 |
| `deferTopics` | `defer.reasons` / `conditions` | 変換材料 |
| `deferRisks` | `defer.risks` | 変換材料 |
| `reassurance` | `virtuousCycle.reassurance` | 変換材料 |
| `adjustments` | `virtuousCycle.adjustments` / `actions` | 変換材料 |
| B.`communication*` | `communication.do/avoid/examples` | 変換材料（相手向けは other 側） |

**禁止:** self 配列と other 配列の単純連結を最終出力にしない（④の原則）。

変換ルールの実装: `relationship/core/convert/CONVERSION_RULES.md`  
正本運用: `relationship/core/data/enneagram/CANONICAL.md`

---

## 6. 昇格時チェックリスト

- [ ] コア6フィールドは一文（配列にしない）
- [ ] `blindSpot`（一文）と `blindspots[]`（複数）の両方を埋めたか、意図的に片方空か
- [ ] `coreDesire` と `coreMotivation[]` が矛盾していない
- [ ] 観察欄の固有名詞が Core / Behavior に漏れていない
- [ ] C欄を `OtherTypeEntry` に無理に押し込んでいない

---

## 関連ドキュメント

| 文書 | 内容 |
|------|------|
| [`SCHEMA.md`](./SCHEMA.md) | ① スキーマ方針 |
| [`schema.ts`](./schema.ts) | 型定義 |
| [`profiles/README.md`](./profiles/README.md) | 正本置き場 |
| [`../../../_drafts/README.md`](../../../_drafts/README.md) | 下書き運用 |
| [`../../../../relationship/core/convert/CONVERSION_RULES.md`](../../../../relationship/core/convert/CONVERSION_RULES.md) | ④ 変換ルール |
| [`../../../../relationship/core/data/enneagram/CANONICAL.md`](../../../../relationship/core/data/enneagram/CANONICAL.md) | ⑤ 正本運用 |
