# `_drafts` — 観察・分析ノート（下書き）

このディレクトリは **正本ではない**。

| 場所 | 役割 |
|------|------|
| `_drafts/wings/` | ウイング18の観察・物語・仮説（生ノート） |
| `_drafts/wings/_TEMPLATE.md` | 全ウイング共通のまとめ項目 |
| `core/data/enneagram/schema.ts` | **他者理解の正式スキーマ（①）** |
| `core/data/enneagram/profiles/` | other 正本（`OtherTypeEntry`・②以降） |
| `self-understanding/core/data/enneagram/` | 自己理解の正本 |
| `relationship/core/data/enneagram/` | 相互理解の正本（ペア辞書） |

## 運用

1. **書く** → `_drafts/wings/type{N}w{M}.md`（正本は触らない）
2. **整形する** → A+B を `profiles/` の `OtherTypeEntry` へ（②・別指示）
3. **関係化する** → C を relationship の変換／81へ（④⑤・別指示・体験談は入れない）

- ユーザー向けUI・エンジンから **直接 import しない**
- キャラ名・体験談・応力ケースは下書きに残してよい
- 正本へ上げるときは「昇格用まとめ」だけを使う

## まとめ項目 → 昇格先

| 下書きセクション | 型 / 昇格先 |
|------------------|------------|
| A. 自己理解コア | `EnneagramTypeCore` → self 正本／other コア部 |
| B. 他者理解・行動 | `OtherTypeBehavior` → `profiles/` |
| C. 相互理解シード | relationship 変換ルール／ペア辞書（本スキーマの外） |
| 観察（日常／応力） | 下書き専用 |
| 象徴・出典 | 下書き専用 |

スキーマ詳細: [`../core/data/enneagram/SCHEMA.md`](../core/data/enneagram/SCHEMA.md)  
対応表（③）: [`../core/data/enneagram/FIELD_MAPPING.md`](../core/data/enneagram/FIELD_MAPPING.md)

## ウイング枠

`wings/type{N}w{M}.md`（18ファイル）— いずれも `_TEMPLATE.md` と同型。
