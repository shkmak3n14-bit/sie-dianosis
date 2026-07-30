# レイヤー設計（npm 化前提）

self-understanding / other-understanding **共通ルール**。

```
モジュール/
├── LAYERING.md
├── core/                 # ロジック専用（将来 npm）
│   └── package.json      # @sie/<module>-core
└── ui/
    └── mobile/           # UI 専用（Expo）
        ├── templates/    # 表示用型・整形（core 非依存）
        ├── data/         # 静的データのコピー
        ├── bridge/       # （self）preview API。core 非 import
        └── metro.config  # core を watch しない
```

## ルール

1. **正本は `core/`**
2. **`ui/mobile` は UI 専用** — core の TS を直接 import しない
3. **Metro は core を watch しない**
4. **必要なテンプレート・辞書は UI 側にコピー**（`npm run sync:data`）
5. **将来** — ホストが `@sie/*-core` を依存し、結果を UI に渡す

## 同期

```bash
cd src/<module>/ui/mobile
npm run sync:data
```
