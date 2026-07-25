# other-understanding（他者理解モジュール）

他者のタイプ・傾向を理解する支援を担当する Context です。  
スマホ利用を前提とした構成です。

## 役割

- 他者理解のための観点・ヒント提供
- 観察・タイプ推定・すれ違い検出・関係調整
- タイプ知識との連携（読み取りのみ）

## 構成

```
src/other-understanding/
  core/
    data/
      enneagram/
        communication_style_dictionary.ts   # 伝え方ガイド
        observation_points_dictionary.ts    # 観察ポイント
        misalignment_patterns_dictionary.ts # すれ違いパターン
    modules/
      diagnosis_entry.ts                    # フロー入口
      type_inference_engine.ts              # タイプ推定
      observation_engine.ts                 # 観察分析
      misalignment_engine.ts                # すれ違い検出
      relationship_adjustment_engine.ts     # 関係調整提案
    templates/
      other_understanding_output_template.ts # 出力整形
  ui/
    mobile/
      components/   # 共通 UI 部品
      cards/        # 結果カード等
      chat/         # チャット UI
```

他 Context（`type-engine` / `self-understanding` 等）のファイルは変更しません。
