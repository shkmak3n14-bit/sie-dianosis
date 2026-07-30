# data / enneagram（他者理解）

`self-understanding/core/data/enneagram` と対になる辞書レイヤーです。

## 構成

| パス | 役割 |
|------|------|
| `schema.ts` | 共通型（self-understanding と同構造） |
| `center/` `types/` `wings/` `instincts/` | 基礎辞書（self-understanding から流用） |
| `communication_style_for_other_dictionary.ts` | 相手への伝え方 |
| `reply_style_for_other_dictionary.ts` | 他者理解時のサイ返答スタイル |
| `observation_points_dictionary.ts` | ② 観察ポイント・質問案 |
| `observation_tags_dictionary.ts` | ② 特徴タグ（inference-ready） |
| `misalignment_patterns_dictionary.ts` | ③ 認知ズレパターン |
| `type_summary.ts` | 相手タイプ概要の短文 |
| `index.ts` | まとめて export |

## 流用方針

`center` / `types` / `wings` / `instincts` は自己理解側と同一ソースを再エクスポートします。
他者理解専用の差分は `*_for_other_*` および observation / misalignment に置きます。

## mobile との関係

本ディレクトリが **正本**。Expo UI は `ui/mobile/data/enneagram/` に静的コピーを持ちます（core 非 import）。
辞書を更新したら `ui/mobile` で `npm run sync:data` を実行してください。
詳細は `../../LAYERING.md`。
