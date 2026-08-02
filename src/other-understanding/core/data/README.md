# data / enneagram（他者理解）

`self-understanding/core/data/enneagram` と対になる辞書レイヤーです。

## 構成

| パス | 役割 |
|------|------|
| `schema.ts` / `SCHEMA.md` | **正式スキーマ（①）** 共通コア＋ other 拡張 |
| `FIELD_MAPPING.md` | **フィールド対応表（③）** self ↔ other ↔ 下書き |
| `profiles/` | `OtherTypeEntry` 正本（②以降で下書きから投入） |
| `center/` `types/` `wings/` `instincts/` | 基礎辞書（当面 self から流用・移行中） |
| `communication_style_for_other_dictionary.ts` | 相手への伝え方 |
| `reply_style_for_other_dictionary.ts` | 他者理解時のサイ返答スタイル |
| `observation_points_dictionary.ts` | ② 観察ポイント・質問案 |
| `observation_tags_dictionary.ts` | ② 特徴タグ（inference-ready） |
| `misalignment_patterns_dictionary.ts` | ③ 認知ズレパターン |
| `type_summary.ts` | 相手タイプ概要の短文 |
| `index.ts` | まとめて export |

## スキーマ方針（①）

- **共通コア** `EnneagramTypeCore` … self とフィールド名を揃える（一文）
- **拡張** `OtherTypeBehavior` … 観察・行動・伝え方（配列）
- **正本エントリ** `OtherTypeEntry` = code + コア + 拡張
- 詳細は [`enneagram/SCHEMA.md`](./enneagram/SCHEMA.md)
- 対応表は [`enneagram/FIELD_MAPPING.md`](./enneagram/FIELD_MAPPING.md)

## 流用方針（移行中）

`center` / `types` / `wings` / `instincts` は自己理解側と同一ソースを再エクスポート中。  
他者理解の厚い正本は `profiles/` に段階移行する。差分辞書は `*_for_other_*` および observation / misalignment。

## mobile との関係

本ディレクトリが **正本**。Expo UI は `ui/mobile/data/enneagram/` に静的コピーを持ちます（core 非 import）。
辞書を更新したら `ui/mobile` で `npm run sync:data` を実行してください。
詳細は `../../LAYERING.md`。
