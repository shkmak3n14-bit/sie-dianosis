# ペア辞書の正本運用（⑤）

## 正本

`relationship/core/data/enneagram/{self}x{other}.ts`（81ファイル）が **本番の正本**。

| API | 挙動 |
|-----|------|
| `runMutualUnderstanding("9x3")` | `pair_registry` から `MU_9_3` を返す |
| `runMutualUnderstandingForTypes("9","3")` | 同上 |
| `buildRelationship` / `buildRelationshipFromCodes` | **補助**（下書き生成・再生成用）。正本を上書きしない |

## 運用

1. 読む → 常に正本（registry）
2. 直す → 該当 `NxM.ts` を編集
3. 一括の種が欲しい → `buildRelationshipFromCodes` で生成し、差分レビュー後に正本へ反映
4. UI は core を直接 import せず、ホスト経由または sync 済み data を使う

## レジストリ

`pair_registry.ts` が 81 エントリを `pairKey` で保持する。  
ペアファイルを増やしたらレジストリを再生成すること。

## 柱別の旧辞書ファイルについて

`pair_status_dictionary.ts` 等は骨格時代の分割辞書。  
現在の正本単位は **`MutualUnderstanding` まるごと 1 ファイル（NxM.ts）**。  
柱別辞書は将来、正本から導出するか廃止する。
