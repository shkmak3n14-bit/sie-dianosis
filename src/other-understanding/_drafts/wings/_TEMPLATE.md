# ウイング観察ノート — 共通テンプレート

新ノート作成時・追記時は、この項目順に埋める。  
空欄は `（未記入）` のまま残してよい。

---

## メタ

- **wing:** （例: 2w1）
- **base / wing影響:** （例: 2の愛・必要性 ＋ 1の正しさ・義務）
- **偏りメモ:** （平均像か／応力端か／サンプル数）
- **出典:** （観察・作品・推定など）

---

## 観察（下書き専用・正本に出さない）

### 日常ケース

（穏やか〜通常時の振る舞い）

### 応力ケース

（喪失・否認・力・義務が最大化したときの振る舞い）

### 象徴・物語（任意）

（キャラ名・固有名詞はここに閉じる）

---

## A. 自己理解コア → `EnneagramTypeCore`（self と同名）

正式スキーマ: `other-understanding/core/data/enneagram/schema.ts`  
self 正本: `self-understanding/.../EnneagramTypeEntry` と同フィールド。

| 項目 | 正本フィールド | 書き方 |
|------|----------------|--------|
| coreFear | `coreFear` | 一文（恐れの核） |
| coreDesire | `coreDesire` | 一文（欲求の核） |
| stressPattern | `stressPattern` | 一文（ストレス時の要約） |
| growthDirection | `growthDirection` | 一文（成長の方向） |
| conflictStyle | `conflictStyle` | 一文（衝突の出方） |
| blindSpot | `blindSpot` | 一文（本人が見落としやすい点） |

### coreFear

（未記入）

### coreDesire

（未記入）

### stressPattern

（未記入）

### growthDirection

（未記入）

### conflictStyle

（未記入）

### blindSpot

（未記入）

---

## B. 他者理解・行動 → `OtherTypeBehavior` / `OtherTypeEntry`

正式スキーマ: `OtherTypeEntry` = code + `EnneagramTypeCore` + 本欄。  
昇格先: `core/data/enneagram/profiles/type{N}w{M}.ts`  
詳細: `core/data/enneagram/SCHEMA.md`

観察・伝え方・行動分析向け。配列で厚く書いてよい（昇格時に整形）。

| 項目 | 用途 |
|------|------|
| coreMotivation | 動機の箇条（coreDesire の展開） |
| strengths | 外から見える強み |
| blindspots | 外から見えるズレ（core の blindSpot の複数展開） |
| stressPatternDetail | 応力時の段階・兆候 |
| growthPoints | 関わり・成長のヒント |
| behaviorExamples | 観察可能な行動例（推論・タグ材料） |
| observationTags | 特徴タグ候補（type_inference 用） |
| communicationDo | 相手がこのタイプのときの伝え方 |
| communicationAvoid | 避ける伝え方 |
| communicationExamples | 言い回し例 |

### coreMotivation

-

### strengths

-

### blindspots

-

### stressPatternDetail

-

### growthPoints

-

### behaviorExamples

-

### observationTags

-

### communicationDo

-

### communicationAvoid

-

### communicationExamples

-

---

## C. 相互理解シード → `relationship`（変換ルール／81正本）

**単タイプの種**。ペア合成は昇格時に変換ルールで行う（ここでは結合しない）。

| 項目 | MutualUnderstanding への主な行き先 |
|------|-------------------------------------|
| strengthAxes | `status.good`（補完の材料） |
| frictionAxes | `status.bad`（衝突の材料） |
| viciousTriggers | `viciousCycle.triggers` |
| viciousLoopHints | `viciousCycle.loop` / `typePatterns` |
| cognitiveGapSelf | `cognitiveGap.selfGap` または `otherGap` |
| respectNeeds | `respect.forOther` / `forSelf` |
| overAdaptation | `responsibility.self` / `other` |
| boundaryHints | `responsibility.boundary` |
| deferTopics | `defer.reasons` / `conditions` |
| deferRisks | `defer.risks` |
| reassurance | `virtuousCycle.reassurance` |
| adjustments | `virtuousCycle.adjustments` / `actions` |

### strengthAxes

（このタイプが関係に持ち込む強みの軸。例: 献身 × 使命感）

-

### frictionAxes

（関係で衝突しやすい軸。例: 義務化された愛 × 相手の自律）

-

### viciousTriggers

-

### viciousLoopHints

（認知→感情→行動のヒント）

-

### cognitiveGapSelf

（このタイプ側のズレ一文〜数点）

-

### respectNeeds

-

### overAdaptation

-

### boundaryHints

-

### deferTopics

-

### deferRisks

-

### reassurance

-

### adjustments

-

---

## 昇格チェック（書く人用）

- [ ] 観察欄の固有名詞が、A/B/C に漏れていない
- [ ] A は一文中心（self の string フィールド向け）
- [ ] B は行動・観察として外から見える
- [ ] C は「関係の種」であり、特定の相手タイプ名で埋めない（相手は変換時に決まる）
- [ ] 応力ケースだけで平均像を代表させていない（偏りメモあり）
