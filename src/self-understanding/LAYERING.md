# レイヤー設計（npm 化前提）

self-understanding / other-understanding **共通ルール**。

```
┌─────────────────────────────────────────────┐
│  ui/mobile（Expo）                           │
│  - screens / cards / chat / templates / data │
│  - bridge（preview）。core を直接 import しない │
└──────────────────▲──────────────────────────┘
                   │ 当面: 静的コピー + preview bridge
                   │ 将来: ホストが npm core を依存
┌──────────────────┴──────────────────────────┐
│  @sie/self-understanding-core（予定）        │
│  = 現 core/                                  │
└─────────────────────────────────────────────┘
```

## ルール

1. **正本は `core/`**
2. **mobile は UI 専用** — エンジンをバンドルしない
3. **Metro は core を watch しない**
4. **必要な型・静的データは `templates/` / `data/` にコピー**
5. **呼び出しは `bridge/`** — 当面 preview、将来はホスト注入

## 同期

```bash
cd src/self-understanding/ui/mobile
npm run sync:data
```
