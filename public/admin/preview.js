/* global window */
// Sveltia CMS のプレビュー改良（Issue #53）
//
// やっていること:
// 1. プレビュースタイルの登録（KaTeX の CSS と public/admin/preview.css）
// 2. articles / news / reports 共通のカスタムプレビューテンプレートの登録
//    （記事詳細ページに寄せて「日付 → タイトル → 著者・タグ → 表紙画像 → 本文」）
// 3. テンプレートの描画後に KaTeX の auto-render を適用し、
//    $...$（文中）/ $$...$$（別行立て）を数式として描く
//
// API の根拠（@sveltia/cms 0.238.1 の公式ドキュメントと型定義で確認）:
// - CMS.registerPreviewStyle(filePath) / (cssString, { raw: true })
//   https://sveltiacms.app/en/docs/api/preview-styles
// - CMS.registerPreviewTemplate(name, component)
//   https://sveltiacms.app/en/docs/api/preview-templates
//   component は React コンポーネントで、props として entry（Immutable Map、
//   entry.getIn(['data', フィールド名]) で読む）/ widgetFor / widgetsFor /
//   getAsset / getCollection / fieldsMetaData / document / window を受け取る。
//   プレビューは sandboxed iframe で描画され、管理画面のスタイルは継承されない。
// - CDN 読み込み時は window.CMS のほかに window.html（HTM）/ window.h /
//   window.createClass が公開される。Hooks は CMS.React から取る
//   （同梱の React でないと動かないため）。
// - 要素に data-key-path 属性を付けると、プレビューと編集欄の
//   スクロール同期・クリックでのハイライトが効く。
(function () {
  "use strict";

  var CMS = window.CMS;
  if (!CMS) {
    return;
  }

  // KaTeX のバージョンはサイト本体の依存（package.json の katex）に合わせる
  var KATEX_VERSION = "0.19.1";
  var KATEX_CSS_URL =
    "https://cdn.jsdelivr.net/npm/katex@" +
    KATEX_VERSION +
    "/dist/katex.min.css";

  // スタイルは登録順に適用される。KaTeX を先に読み、preview.css で上書きできるようにする
  CMS.registerPreviewStyle(KATEX_CSS_URL);
  CMS.registerPreviewStyle("/admin/preview.css");

  var html = window.html;
  var React = CMS.React;
  if (!html || !React) {
    return;
  }
  var useEffect = React.useEffect;
  var useRef = React.useRef;

  // 記事タグの slug → 日本語ラベル対応表。
  // 正本は src/content/tags.ts の ARTICLE_TAGS で、これはその転記。
  // タグを増減したときは両方を直すこと。
  var TAG_LABELS = {
    information: "情報",
    "theory-of-computation": "計算理論",
    programming: "プログラミング",
    algebra: "代数",
    geometry: "幾何",
    analysis: "解析",
    "probability-and-statistics": "確率/統計",
    "set-theory-and-logic": "集合/論理",
    mechanics: "力学",
    electromagnetism: "電磁気学",
    thermodynamics: "熱力学",
    "statistical-mechanics": "統計力学",
    "quantum-mechanics": "量子力学",
    relativity: "相対性理論",
    waves: "波動",
    optics: "光学",
    "fluid-mechanics": "流体力学",
    "condensed-matter-physics": "物性物理学",
    "inorganic-chemistry": "無機化学",
    "organic-chemistry": "有機化学",
    "physical-chemistry": "物理化学",
    "analytical-chemistry": "分析化学",
    biochemistry: "生物化学",
    "chemical-engineering": "化学工学",
    "polymer-chemistry": "高分子化学",
  };

  // tags の値を文字列の配列にそろえる。
  // articles は slug の配列、お知らせ・活動報告は自由入力の文字列。
  // CMS 内の表現（Immutable List / { tag: ... } の形）がどちらでも読めるようにする
  function normalizeTags(raw) {
    if (!raw) {
      return [];
    }
    var list = typeof raw.toJS === "function" ? raw.toJS() : raw;
    if (!Array.isArray(list)) {
      return [];
    }
    var tags = [];
    list.forEach(function (item) {
      if (typeof item === "string") {
        tags.push(item);
      } else if (item && typeof item === "object") {
        if (typeof item.tag === "string") {
          tags.push(item.tag);
        } else if (typeof item.get === "function" && item.get("tag")) {
          tags.push(item.get("tag"));
        }
      }
    });
    return tags;
  }

  // 日付は YYYY-MM-DD の先頭10文字だけを使う（記事詳細の fmtISO と同じ表示）
  function formatDate(raw) {
    if (!raw) {
      return "";
    }
    var text = String(raw);
    return text.length >= 10 ? text.slice(0, 10) : text;
  }

  var EntryPreview = function (props) {
    var rootRef = useRef(null);

    // 描画のたびに（マウント時と本文の更新時）数式を描き直す
    useEffect(function () {
      var element = rootRef.current;
      if (!element || typeof window.renderMathInElement !== "function") {
        return;
      }
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        });
      } catch {
        // 数式の描画に失敗してもプレビュー自体は表示する
      }
    });

    var entry = props.entry;
    var title = entry.getIn(["data", "title"]) || "";
    var date = formatDate(entry.getIn(["data", "date"]));
    var department = entry.getIn(["data", "author", "department"]) || "";
    var grade = entry.getIn(["data", "author", "grade"]);
    // 著者は公開ページの仕様どおり「学科＋学年」だけを出す（GitHub アカウントは出さない）
    var authorText = grade ? department + " " + grade + "年" : department;
    var tags = normalizeTags(entry.getIn(["data", "tags"]));
    var imagePath = entry.getIn(["data", "image"]);
    var imageAsset =
      imagePath && typeof props.getAsset === "function"
        ? props.getAsset(imagePath)
        : null;

    return html`
      <article className="preview-article" ref=${rootRef}>
        ${date &&
        html`<p className="preview-date" data-key-path="date">${date}</p>`}
        <h1 className="preview-title" data-key-path="title" tabIndex=${0}>
          ${title}
        </h1>
        <p className="preview-meta">
          ${authorText &&
          html`<span data-key-path="author">${authorText}</span>`}
          ${tags.map(function (tag) {
            return html`<span
              className="preview-tag"
              data-key-path="tags"
              key=${tag}
              >#${TAG_LABELS[tag] || tag}</span
            >`;
          })}
        </p>
        ${imageAsset
          ? html`<img className="preview-cover" src=${imageAsset.url} alt="" />`
          : html`<div
              className="preview-cover preview-cover-empty"
              aria-hidden="true"
            ></div>`}
        <div className="article-body">${props.widgetFor("body")}</div>
      </article>
    `;
  };

  // 3コレクションともフィールド構成が同じ（src/content.config.ts の共通スキーマ）
  // なので、同じテンプレートを登録する
  CMS.registerPreviewTemplate("articles", EntryPreview);
  CMS.registerPreviewTemplate("news", EntryPreview);
  CMS.registerPreviewTemplate("reports", EntryPreview);
})();
