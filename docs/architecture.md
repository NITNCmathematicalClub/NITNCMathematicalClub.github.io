# アーキテクチャ

## 全体像

```
ブラウザ
  └─ index.html → src/main.tsx → src/App.tsx（BrowserRouter）
       ├─ ページ枠: src/pages/*.tsx
       │    ├─ PageTitle（見出し＋背景画像）
       │    ├─ TableOfContents（.h2-style を走査して目次を生成）
       │    └─ 本文: src/contents/*.tsx
       └─ データ: fetch("/xxx.json") → public/*.json（ビルド時に dist へ複製）
```

- SPA（Single Page Application）。サーバー側の処理はなく、GitHub Pages が
  `dist/` の静的ファイルを配信する。
- だからこそ、トップ以外のURLを直接開くと Pages の404になる（Issue #4 で対策中）。

## ルーティング

`src/App.tsx` の `<Routes>` が正本。現行のルートは以下の通り。

| パス | ページ (src/pages) | 本文 (src/contents) | 主なデータ |
|---|---|---|---|
| `/` | Home.tsx | （ページ内に実装） | news.json |
| `/introduce` | Introduce.tsx | IntroduceContents.tsx | —（部員構成の円グラフ含む） |
| `/activities` | Activities.tsx | ActivitiesContents.tsx | activities.json |
| `/clubmagazine` | ClubMagazine.tsx | ClubMagazineContents.tsx | — |
| `/exams` | Exams.tsx | ExamsContents.tsx | exams.json |
| `/contact` | Contact.tsx | （ページ内に実装） | — |
| `/note` | Note.tsx | （ページ内に実装）※ | notes.json |

※ Note ページの本文は Note.tsx 内にあり、カレンダーは `src/components/NoteCalendar.tsx`。

## 共通コンポーネント（src/components）

| ファイル | 役割 |
|---|---|
| Navbar.tsx | ヘッダーとナビゲーション（PC/モバイル両対応） |
| Footer.tsx | フッター |
| PageTitle.tsx | 各ページの見出しと背景画像（`imageUrl` 省略時は Introduce の写真） |
| TableOfContents.tsx | `.h2-style` の見出しから目次を自動生成（日本語IDの既知問題あり、Issue #12） |
| HeroSlider.tsx | トップのスライダー（keen-slider、5秒自動送り） |
| ActivityCard.tsx | 活動報告のカード表示 |
| PieChartByGakka.tsx | 学科別構成の円グラフ（recharts） |
| NoteCalendar.tsx | 雑記帳のカレンダー（インラインスタイルで実装） |

## 使用ライブラリの要点

- ルーティング: react-router-dom v7（BrowserRouter）
- スタイル: Tailwind CSS v4（`@tailwindcss/vite`）。色・フォントは `src/index.css` の `@theme`
- 数式: KaTeX（react-katex の `InlineMath`）。CSS は main.tsx で読み込み
- グラフ: recharts（PieChartByGakka のみ）
- スライダー: keen-slider（HeroSlider のみ）
- アイコン: react-icons（Contact ページ）

## ビルドとデプロイ

- `npm run build` = `tsc -b && vite build`。型チェックを通過しないとビルドできない。
- PR では `.github/workflows/ci.yml` が lint + build を検証する。
- main へマージされると `.github/workflows/deploy.yml` が `dist/` を
  GitHub Pages へデプロイする。公開URLは https://math.nitnc.club/ 。
- デプロイやドメインなど運用面の詳細は [operations.md](operations.md) を参照。
