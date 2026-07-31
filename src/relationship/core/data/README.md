# data / enneagram（相互理解）

自分タイプ × 相手タイプの**関係辞書**レイヤーです。  
他者理解の「相手単体辞書」とは別物です。

## 構成（①〜⑧）

| ファイル | 柱 | キーの考え方 |
|----------|----|--------------|
| `pair_status_dictionary.ts` | ① 関係の現状 | `self×other` |
| `vicious_cycle_patterns_dictionary.ts` | ② 悪循環の入口 | `self×other` 関係パターン |
| `cognitive_gap_pair_dictionary.ts` | ③ 認知のズレ（関係版） | ズレ×ズレの相互作用 |
| `virtuous_cycle_dictionary.ts` | ④ 好循環への道筋 | 関係改善パターン |
| `respect_points_dictionary.ts` | ⑤ 尊重 | 主に相手タイプ（＋組み合わせ補足） |
| `responsibility_split_dictionary.ts` | ⑥ 責務分離 | `self×other` |
| `defer_points_dictionary.ts` | ⑦ 棚上げ | `self×other` |
| `communication_pair_dictionary.ts` | ⑧ 伝え方 | `self×other` |
| `index.ts` | — | まとめて export |

## キー規約

- ペアキーは `"{selfType}x{otherType}"`（例: `"9x3"`）
- タイプ番号は文字列 `"1"`〜`"9"`（翼・本能は後続拡張）
- 対称でない組み合わせは方向を持つ（`9x3` ≠ `3x9`）

## 他モジュールとの関係

- `center` / `types` / `wings` / `instincts` は本モジュールでは持たない（自己理解・他者理解を参照）
- 他者理解の `misalignment_patterns` は「相手へのズレ説明」；本モジュールの③は「関係上の相互作用」

## mobile との関係

本ディレクトリが **正本**。Expo UI は `ui/mobile/data/enneagram/` に静的コピーを持ちます。  
辞書を更新したら `ui/mobile` で `npm run sync:data` を実行してください。
