# self-understanding（自己理解モジュール）

タイプ診断結果を踏まえた自己理解を担当する Context です。
**スマホ利用を前提**とし、ロジック（`core`）とモバイルUI（`ui/mobile`）を分離しています。

層分離の詳細は [`LAYERING.md`](./LAYERING.md)（other-understanding と同ルール）。

## 役割

- 自己のパターン・動機の深掘り
- タイプ診断結果との連携（読み取りのみ）
- キャラクター／チャット形式での自己理解フロー

## 構成

```
self-understanding/
├── LAYERING.md
├── core/                 # ロジック専用（@sie/self-understanding-core 予定）
│   ├── logic/
│   ├── data/
│   ├── character/
│   ├── questions/
│   ├── diagnosis_engine/
│   └── package.json
└── ui/
    └── mobile/           # UI 専用（core を直接 import しない）
        ├── screens/
        ├── cards/
        ├── character_view/
        ├── chat/
        ├── bridge/       # preview API（Expo 用スタブ）
        ├── templates/    # UI 用型
        ├── data/         # 静的コピー（sai_persona 等）
        ├── components/
        ├── flow/
        └── mocks/
```

## 制約

- `ui/mobile` から `core` の TS を直接 import しない
- 必要なテンプレート／静的データは `templates/`・`data/` に置き `npm run sync:data` で揃える
- チャットの本番ロジックは将来ホスト経由で core パッケージを接続する（当面は `bridge/` preview）
- 他 Context（`type-engine` 等）のファイルは変更しない
