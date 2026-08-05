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
## 厚み上げログ

優先ペアの観察反映:

- [`_ENRICH_8x9.md`](./_ENRICH_8x9.md) … `8x9` / `9x8`
- [`_ENRICH_9x1.md`](./_ENRICH_9x1.md) … `9x1` / `1x9`
- [`_ENRICH_9x3.md`](./_ENRICH_9x3.md) … `9x3` / `3x9`
- [`_ENRICH_8x3.md`](./_ENRICH_8x3.md) … `8x3` / `3x8`
- [`_ENRICH_9x9.md`](./_ENRICH_9x9.md) … `9x9`
- [`_ENRICH_8x8.md`](./_ENRICH_8x8.md) … `8x8`
- [`_ENRICH_1x1.md`](./_ENRICH_1x1.md) … `1x1`
- [`_ENRICH_2x2.md`](./_ENRICH_2x2.md) … `2x2`
- [`_ENRICH_3x3.md`](./_ENRICH_3x3.md) … `3x3`
- [`_ENRICH_4x4.md`](./_ENRICH_4x4.md) … `4x4`
- [`_ENRICH_5x5.md`](./_ENRICH_5x5.md) … `5x5`
- [`_ENRICH_6x6.md`](./_ENRICH_6x6.md) … `6x6`
- [`_ENRICH_7x7.md`](./_ENRICH_7x7.md) … `7x7`
- [`_ENRICH_9x5.md`](./_ENRICH_9x5.md) … `9x5` / `5x9`
- [`_ENRICH_4x5.md`](./_ENRICH_4x5.md) … `4x5` / `5x4`
- [`_ENRICH_3x4.md`](./_ENRICH_3x4.md) … `3x4` / `4x3`
- [`_ENRICH_7x6.md`](./_ENRICH_7x6.md) … `7x6` / `6x7`
- [`_ENRICH_6x5.md`](./_ENRICH_6x5.md) … `6x5` / `5x6`
- [`_ENRICH_3x2.md`](./_ENRICH_3x2.md) … `3x2` / `2x3`
- [`_ENRICH_1x2.md`](./_ENRICH_1x2.md) … `1x2` / `2x1`
- [`_ENRICH_1x4.md`](./_ENRICH_1x4.md) … `1x4` / `4x1`
- [`_ENRICH_1x3.md`](./_ENRICH_1x3.md) … `1x3` / `3x1`
- [`_ENRICH_1x5.md`](./_ENRICH_1x5.md) … `1x5` / `5x1`
- [`_ENRICH_1x6.md`](./_ENRICH_1x6.md) … `1x6` / `6x1`
- [`_ENRICH_1x7.md`](./_ENRICH_1x7.md) … `1x7` / `7x1`
- [`_ENRICH_1x8.md`](./_ENRICH_1x8.md) … `1x8` / `8x1`
- [`_ENRICH_2x6.md`](./_ENRICH_2x6.md) … `2x6` / `6x2`
- [`_ENRICH_2x7.md`](./_ENRICH_2x7.md) … `2x7` / `7x2`
- [`_ENRICH_2x8.md`](./_ENRICH_2x8.md) … `2x8` / `8x2`
- [`_ENRICH_2x9.md`](./_ENRICH_2x9.md) … `2x9` / `9x2`
- [`_ENRICH_3x7.md`](./_ENRICH_3x7.md) … `3x7` / `7x3`
- [`_ENRICH_7x8.md`](./_ENRICH_7x8.md) … `7x8` / `8x7`
- [`_ENRICH_7x9.md`](./_ENRICH_7x9.md) … `7x9` / `9x7`
- [`_ENRICH_6x9.md`](./_ENRICH_6x9.md) … `6x9` / `9x6`
- [`_ENRICH_6x8.md`](./_ENRICH_6x8.md) … `6x8` / `8x6`
- [`_ENRICH_5x8.md`](./_ENRICH_5x8.md) … `5x8` / `8x5`
- [`_ENRICH_5x7.md`](./_ENRICH_5x7.md) … `5x7` / `7x5`
- [`_ENRICH_3x6.md`](./_ENRICH_3x6.md) … `3x6` / `6x3`
- [`_ENRICH_4x6.md`](./_ENRICH_4x6.md) … `4x6` / `6x4`
- [`_ENRICH_4x7.md`](./_ENRICH_4x7.md) … `4x7` / `7x4`
- [`_ENRICH_4x8.md`](./_ENRICH_4x8.md) … `4x8` / `8x4`
- [`_ENRICH_4x9.md`](./_ENRICH_4x9.md) … `4x9` / `9x4`
- [`_ENRICH_3x5.md`](./_ENRICH_3x5.md) … `3x5` / `5x3`
- [`_ENRICH_2x5.md`](./_ENRICH_2x5.md) … `2x5` / `5x2`
- [`_ENRICH_2x4.md`](./_ENRICH_2x4.md) … `2x4` / `4x2`
