# 相互理解 — 変換ルール（④）

## 位置づけ

| もの | 役割 |
|------|------|
| `data/enneagram/{n}x{m}.ts`（81） | **正本（⑤）** — 本番が読む |
| `buildRelationship` | **補助** — 下書き生成・再生成・差分の種 |
| `runMutualUnderstanding` | 正本レジストリを返す（無ければ補助生成にフォールバック可） |

## 禁止事項

- self 配列と other 配列の **単純連結**を最終出力にしない  
  例（禁止）: `good: [...self.strengths, ...other.strengths]`
- 体験談・キャラ名・固有名詞を入れない

## 変換の原則

1. **補完** … 強み軸どうしを `A × B の補完` に合成 → `status.good`
2. **衝突** … 摩擦軸どうしを関係の衝突文に合成 → `status.bad`
3. **位置依存** … 同じフィールドでも self/other で行き先が変わる  
   - `respectNeeds` → 相手の分は `respect.forOther`、自分の分は `forSelf`  
   - `cognitiveGapSelf` → 自分なら `selfGap`、相手なら `otherGap`  
   - `communicationDo` → **相手向けを主**に `communication.do`
4. **役割ラベル** … トリガー等は「自分側／相手側」を付けて区別（連結ではなく配置）
5. **相互作用** … `interaction` は両シードから一文を**新規生成**する

## フィールド対応（シード → MutualUnderstanding）

| RelationshipTypeSeed | 変換先 | ルール要約 |
|----------------------|--------|------------|
| `strengthAxes` | `status.good` | 先頭軸どうしを補完文に |
| `frictionAxes` | `status.bad` | 先頭軸どうしを衝突文に |
| `viciousTriggers` | `viciousCycle.triggers` | 自分側／相手側に配置 |
| `viciousLoopHints` | `loop` / `typePatterns` | 連鎖・ペアパターン文を生成 |
| `cognitiveGapSelf` | `selfGap` / `otherGap` | 位置で振り分け |
| （両ギャップ） | `interaction` | 優先差・相互刺激の文を生成 |
| `adjustments` / `reassurance` | `virtuousCycle` | ラベル付きで両側記載 |
| `respectNeeds` | `respect` | other→forOther, self→forSelf |
| `overAdaptation` / `boundaryHints` | `responsibility` | 自分側抑制／相手側課題／境界 |
| `deferTopics` / `deferRisks` | `defer` | 理由・リスク・条件を関係文に |
| `communication*` | `communication` | 相手向け do を主、自分の癖は avoid 側 |

## 正本への反映手順（⑤運用）

1. `buildRelationshipFromCodes(self, other)` で下書き生成
2. 人手で関係の精度を磨く
3. `data/enneagram/{self}x{other}.ts` に反映（正本）
4. `pair_registry` 経由で `runMutualUnderstanding` が正本を返す

## 実装

- `convert/type_seeds.ts` … 純タイプ1〜9シード
- `convert/buildRelationship.ts` … 変換関数
- `types/relationship_type_seed.ts` … シード型
