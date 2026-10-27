# データスキーマ（public/*.json の正本）

サイトのデータは `public/` 直下の JSON で管理します。
この文書が形式の正本です。実装側の型定義と食い違う場合は、まずここを疑ってください
（既知の食い違い: Issue #11）。

共通ルール:

- 文字コードは UTF-8、日付はすべて `"YYYY-MM-DD"` 形式の**文字列**
- 並び順は「新しい順」を基本とする（コード側のソートにも依存するため、記述順も守ること）
- 参照するファイル（画像・PDF）は、必ず実在するパスを書くこと

## news.json — お知らせ

表示場所: トップページ「お知らせ」（最新3件）

```json
[
  { "date": "2026-04-22", "text": "公式サイトをGitHub Pagesへ移動しました." }
]
```

| フィールド | 型 | 説明 |
|---|---|---|
| date | string | 日付 `YYYY-MM-DD` |
| text | string | お知らせ本文 |

## notes.json — 雑記帳

表示場所: `/note` のカレンダー（日付をクリックすると表示）

```json
[
  { "date": "2025-08-16", "content": "やっとできたー！！！", "author": "小野" }
]
```

| フィールド | 型 | 説明 |
|---|---|---|
| date | string | 日付 `YYYY-MM-DD` |
| content | string | 投稿内容 |
| author | string | 投稿者名 |

## exams.json — 過去問解説

表示場所: `/exams` の一覧。各項目が PDF へのリンクになる

```json
[
  { "name": "令和7(2025)年度 本試", "pdfUrl": "./docs/exams/20251.pdf" }
]
```

| フィールド | 型 | 説明 |
|---|---|---|
| name | string | 試験の名称 |
| pdfUrl | string | PDF のパス。実ファイルは `public/docs/exams/` に配置する |

ファイル名の規則: `YYYY` + 本試は `1` / 追試は `2`（例: 2025年度本試 = `20251.pdf`）。

## activities.json — 活動風景

表示場所: `/activities`（年度ごとにグルーピングして表示）

```json
[
  {
    "title": "ミニミニ体験授業",
    "date": "2025-05-11",
    "place": "沼津高専 総合メディアセンター 大教室",
    "description": "活動の説明...",
    "images": ["./img/Activities/2025-05-11-1.jpg"]
  }
]
```

| フィールド | 型 | 説明 |
|---|---|---|
| title | string | 活動名 |
| date | string | 日付 `YYYY-MM-DD` |
| place | string | 場所 |
| description | string | 活動の様子 |
| images | string[] | 画像パスの配列（最大3枚まで表示される） |

画像は `public/img/Activities/` に配置し、命名は **`YYYY-MM-DD-連番.拡張子`**
（例: `2025-05-11-1.jpg`）としてください。

## 変更時の注意

- JSON の文法ミス（カンマ漏れ等）があると、そのページのデータだけが
  読み込みエラーになります。編集後は対象ページをブラウザで必ず確認してください。
- 型や形式を変える変更は、利用側コード（fetch しているコンポーネント）と
  この文書を同時に更新してください。
