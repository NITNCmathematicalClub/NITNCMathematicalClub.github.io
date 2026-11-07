---
# 記事の執筆テンプレート。
# 使い方: このファイルをコピーして、種類に応じたフォルダへ入れます。
#   数学記事 … src/content/articles/
#   お知らせ … src/content/news/
#   活動報告 … src/content/reports/
# ファイル名を記事のスラッグ（英小文字とハイフン）に変え、下の項目を書き換えてください。
# 詳しくは docs/content-guide.md を参照。
title: 記事タイトル
date: 2026-11-01 # 公開日（YYYY-MM-DD）
author:
  department: 制御情報工学科 # 著者の学科
  grade: 3 # 著者の学年（1〜5）
  github: your-github-id # 内部連携用。サイトには表示されません
# 数学記事の tags は、定義済みの25種から slug で選びます（複数指定可、0〜5個）。
# 定義外の slug を書くとビルドエラーになります。一覧は docs/content-guide.md を参照。
#   数学: information, theory-of-computation, programming, algebra, geometry,
#         analysis, probability-and-statistics, set-theory-and-logic
#   物理: mechanics, electromagnetism, thermodynamics, statistical-mechanics,
#         quantum-mechanics, relativity, waves, optics, fluid-mechanics,
#         condensed-matter-physics
#   化学: inorganic-chemistry, organic-chemistry, physical-chemistry,
#         analytical-chemistry, biochemistry, chemical-engineering, polymer-chemistry
# お知らせ・活動報告の tags は自由な文字列で構いません。
tags: [analysis]
draft: true # 下書きの間は true。公開時に false
description: 一覧に出す1〜2文の要約
---

## はじめに

記事の本文はここから書きます。見出しは `##`（h2）から使ってください（目次は自動で作られます）。

## 数式の書き方

インライン数式は $x^2 + y^2 = z^2$ のように `$` で囲みます。

ブロック数式は `$$` で囲みます。

$$
\int_0^1 x^2 \, dx = \left[ \frac{x^3}{3} \right]_0^1 = \frac{1}{3}
$$

## 過去問解説の記事を書く場合

- 置くフォルダは通常の記事と同じ `articles/` です。タグには内容に合う分野（例: `analysis`）を付けてください
- 見出しに問題番号を入れてください（例: `## 大問1 小問(2)`）
- 問題文は引用（`>`）で示し、解答と解説を分けて書いてください

## まとめ

まとめを書きます。
