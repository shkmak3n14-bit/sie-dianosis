# 他者理解スキーマ案（① 確定版）

## 方針

1. **self と意味が同じ項目はフィールド名を揃える**（`EnneagramTypeCore`）
2. **他者理解固有は拡張として持つ**（`OtherTypeBehavior` → 配列可）
3. **正本に象徴・体験談・キャラ名は入れない**（`_drafts` 専用）
4. **既存の self 再エクスポート（wings/types）は当面維持**し、新正本は `profiles/` に段階投入（②）

## 型一覧

| 型 | 役割 |
|----|------|
| `EnneagramTypeCore` | self と同名コア（一文） |
| `EnneagramTypeEntry` | コアの互換エイリアス |
| `OtherTypeBehavior` | 観察・行動・伝え方の拡張 |
| `OtherTypeEntry` | 他者理解のタイプ／ウイング正本（コア＋拡張） |

## フィールド対応

**正本は [`FIELD_MAPPING.md`](./FIELD_MAPPING.md)（③）**。要約のみ下表。

| self / Core | other 拡張 | 関係 |
|-------------|------------|------|
| コア6フィールド | 同名コア | 同一 |
| `coreDesire` 等 | `coreMotivation[]` 等 | 展開 |
| — | `strengths` / tags / communication* | 片側専用 |

## 正本の置き場

```
data/enneagram/
  schema.ts          … 型
  SCHEMA.md          … 本ドキュメント（①）
  FIELD_MAPPING.md   … 対応表（③）
  profiles/          … OtherTypeEntry の正本（②以降）
  wings/*.ts         … 当面 self 再エクスポート（移行中）
```

## 下書きとの対応

`_drafts/wings/` の **A欄 → Core**、**B欄 → Behavior**。  
C欄は relationship（④⑤）。詳細は FIELD_MAPPING §3・§5。

## 次のステップ

- **②** `_drafts` → `profiles/` … **全18翼完了**（2026-08: 1w2/2w1/2w3/3w2/4w3 底上げ、**4w5・3w4・5w4・7w6・6w7・3w2・8w9・1w9・2w1・2w3・7w8を日常／健全〜平均主軸で再昇格**、共通識別メモをテンプレ化）
- **④⑤** relationship … 着手済み（変換ルール／81正本）
- self コア同期や observation 辞書へのタグ連携は任意の後続
- 未着手の厚み: 本能バリアント本格化、統合／崩壊矢印、C欄の関係正本への流し込み
