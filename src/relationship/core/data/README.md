# data / enneagram（相互理解）

自分タイプ × 相手タイプの**関係辞書**レイヤーです。  
他者理解の「相手単体辞書」とは別物です。

## 正本（⑤）

| パス | 役割 |
|------|------|
| `{n}x{m}.ts`（81） | **正本** — `MutualUnderstanding` まるごと |
| `pair_registry.ts` | pairKey → 正本 |
| `CANONICAL.md` | 正本運用ルール |
| `pair_key.ts` / `pair_template.ts` | キー・空テンプレ |

入口: `runMutualUnderstanding("9x3")` → registry。

## 補助（④）

変換は `../../convert/`（`buildRelationship`）。単純結合しない。  
詳細: [`../../convert/CONVERSION_RULES.md`](../../convert/CONVERSION_RULES.md)

## 柱別の旧辞書（骨格・移行中）

| ファイル | 柱 |
|----------|----|
| `pair_status_dictionary.ts` | ① |
| `vicious_cycle_patterns_dictionary.ts` | ② |
| `cognitive_gap_pair_dictionary.ts` | ③ |
| `virtuous_cycle_dictionary.ts` | ④ |
| `respect_points_dictionary.ts` | ⑤ |
| `responsibility_split_dictionary.ts` | ⑥ |
| `defer_points_dictionary.ts` | ⑦ |
| `communication_pair_dictionary.ts` | ⑧ |

現在の運用単位は **NxM.ts（MutualUnderstanding）**。柱別は将来導出または廃止。

## キー規約

- ペアキーは `"{selfType}x{otherType}"`（例: `"9x3"`）
- 対称でない（`9x3` ≠ `3x9`）

## mobile との関係

本ディレクトリが **正本**。UI は sync コピーまたはホスト経由。
