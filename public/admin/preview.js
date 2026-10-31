/* global window */
// Sveltia CMS のプレビュー改良（Issue #53）
//
// やっていること:
// 1. プレビュースタイルの登録（KaTeX の CSS と public/admin/preview.css）
// 2. articles / news / reports 共通のカスタムプレビューテンプレートの登録
//    （記事詳細ページに寄せて「日付 → タイトル → 著者・タグ → 表紙画像 → 本文」）
// 3. 本文は widgetFor() の描画に任せず、テンプレート側で直接レンダリングする。
//    CMS 標準の本文プレビューは描画の完了が非同期で、後段に KaTeX 変換を
//    つなぐ方式では数式がそのまま残ってしまう問題があったため（実機確認で判明）。
//    手順は本番サイト（remark-math + rehype-katex）の考え方に寄せて:
//    a. コードブロック・コード範囲を除き、$...$ / $$...$$ を一旦プレースホルダへ退避
//       （Markdown 変換で _ や * が強調に化けるのを防ぐ）
//    b. marked で Markdown → HTML に変換し、DOMPurify で無害化する
//    c. プレースホルダを KaTeX の描画結果（renderToString）に置き換える
//    ライブラリが読み込めなかった場合は、従来どおり widgetFor('body') に倒す。
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

  // 本文レンダリング用ライブラリ（public/admin/index.html で読み込む）
  var markedLib = window.marked || null;
  var purifyLib = window.DOMPurify || null;
  var katexLib = window.katex || null;
  if (markedLib && typeof markedLib.setOptions === "function") {
    // 本番（Astro の Markdown）は改行を <br> にしないので breaks は false。
    // 表などの GFM 拡張は本番でも有効なので gfm は true
    markedLib.setOptions({ gfm: true, breaks: false });
  }

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

  // Markdown ソースから数式を取り出し、プレースホルダに置き換える。
  // フェンス付きコードブロックの中とインラインコードの中は対象にしない。
  // 戻り値: { text: 置換後のソース, maths: [{ token, tex, display }] }
  function extractMath(source) {
    var maths = [];

    function pushMath(tex, display) {
      var token = "XSVELTIAMATH" + maths.length + "X";
      maths.push({ token: token, tex: tex, display: display });
      return token;
    }

    // コードブロック以外の範囲を処理する（インラインコードと数式を見る）
    function processText(text) {
      var out = "";
      var i = 0;
      var n = text.length;
      while (i < n) {
        var ch = text.charAt(i);
        if (ch === "`") {
          var runMatch = /^`+/.exec(text.slice(i));
          var run = runMatch ? runMatch[0] : "`";
          var close = text.indexOf(run, i + run.length);
          if (close === -1) {
            out += run;
            i += run.length;
          } else {
            out += text.slice(i, close + run.length);
            i = close + run.length;
          }
          continue;
        }
        if (ch === "\\" && text.charAt(i + 1) === "$") {
          out += "\\$";
          i += 2;
          continue;
        }
        if (ch === "$") {
          if (text.charAt(i + 1) === "$") {
            var endDisplay = text.indexOf("$$", i + 2);
            if (endDisplay !== -1) {
              var texDisplay = text.slice(i + 2, endDisplay);
              if (texDisplay.trim()) {
                // 別行立ては単独の段落になるよう前後に空行を置く
                out += "\n\n" + pushMath(texDisplay.trim(), true) + "\n\n";
                i = endDisplay + 2;
                continue;
              }
            }
            out += "$$";
            i += 2;
            continue;
          }
          var lineEnd = text.indexOf("\n", i);
          if (lineEnd === -1) {
            lineEnd = n;
          }
          var endInline = text.indexOf("$", i + 1);
          if (endInline !== -1 && endInline < lineEnd) {
            var texInline = text.slice(i + 1, endInline);
            var nextChar = text.charAt(endInline + 1);
            // remark-math に寄せた簡単な判定: 中身の両端が空白でなく、
            // 閉じた直後が数字でないものだけを数式とみなす（金額表記との衝突回避）
            if (
              texInline &&
              !/^\s/.test(texInline) &&
              !/\s$/.test(texInline) &&
              !/[0-9]/.test(nextChar)
            ) {
              out += pushMath(texInline, false);
              i = endInline + 1;
              continue;
            }
          }
          out += "$";
          i += 1;
          continue;
        }
        out += ch;
        i += 1;
      }
      return out;
    }

    // フェンス付きコードブロックを行単位で切り分け、中身はそのまま通す
    var lines = source.split("\n");
    var result = "";
    var buffer = "";
    var fenceMarker = null;

    function flushBuffer() {
      if (buffer) {
        result += processText(buffer);
        buffer = "";
      }
    }

    lines.forEach(function (line, index) {
      var suffix = index < lines.length - 1 ? "\n" : "";
      var fenceMatch = /^\s*(`{3,}|~{3,})/.exec(line);
      if (fenceMarker) {
        result += line + suffix;
        if (
          fenceMatch &&
          fenceMatch[1].charAt(0) === fenceMarker.charAt(0) &&
          fenceMatch[1].length >= fenceMarker.length
        ) {
          fenceMarker = null;
        }
        return;
      }
      if (fenceMatch) {
        flushBuffer();
        fenceMarker = fenceMatch[1];
        result += line + suffix;
        return;
      }
      buffer += line + suffix;
    });
    flushBuffer();

    return { text: result, maths: maths };
  }

  // 本文 Markdown を HTML 文字列にする。ライブラリ不足や変換に失敗したときは
  // null を返し、呼び出し側が widgetFor の標準プレビューに倒す
  function renderBodyHtml(body) {
    if (typeof body !== "string" || !body.trim()) {
      return "";
    }
    if (!markedLib || !purifyLib || !katexLib) {
      return null;
    }
    var extracted = extractMath(body);
    var rawHtml;
    try {
      rawHtml = markedLib.parse(extracted.text);
    } catch {
      return null;
    }
    if (typeof rawHtml !== "string") {
      return null;
    }
    var clean = purifyLib.sanitize(rawHtml);
    extracted.maths.forEach(function (math) {
      var rendered;
      try {
        rendered = katexLib.renderToString(math.tex, {
          displayMode: math.display,
          throwOnError: false,
        });
      } catch {
        rendered = math.display
          ? "$$" + math.tex + "$$"
          : "$" + math.tex + "$";
      }
      if (math.display) {
        clean = clean.split("<p>" + math.token + "</p>").join(rendered);
      }
      clean = clean.split(math.token).join(rendered);
    });
    return clean;
  }

  // 本文の描画コンポーネント。自前レンダリングできるときは innerHTML で流し込み、
  // 画像は getAsset でプレビュー用 URL に差し替える（未保存のアップロードも見えるように）
  var BodyPreview = function (props) {
    var bodyRef = useRef(null);
    var content = renderBodyHtml(props.body);

    useEffect(
      function () {
        var element = bodyRef.current;
        if (!element || content === null) {
          return;
        }
        element.innerHTML = content;
        if (typeof props.getAsset === "function") {
          var images = element.querySelectorAll("img");
          images.forEach(function (image) {
            var src = image.getAttribute("src") || "";
            if (!src || /^(https?:|data:|blob:)/.test(src)) {
              return;
            }
            try {
              var asset =
                props.getAsset(src) || props.getAsset(src.replace(/^\//, ""));
              if (asset && asset.url) {
                image.setAttribute("src", asset.url);
              }
            } catch {
              // 画像 URL の解決に失敗してもプレビュー自体は表示する
            }
          });
        }
      },
      [content],
    );

    if (content === null) {
      return html`<div className="article-body">${props.fallback}</div>`;
    }
    return html`<div
      className="article-body"
      data-key-path="body"
      ref=${bodyRef}
    ></div>`;
  };

  var EntryPreview = function (props) {
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
    var body = entry.getIn(["data", "body"]) || "";

    return html`
      <article className="preview-article">
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
        <${BodyPreview}
          body=${body}
          getAsset=${props.getAsset}
          fallback=${props.widgetFor("body")}
        />
      </article>
    `;
  };

  // 3コレクションともフィールド構成が同じ（src/content.config.ts の共通スキーマ）
  // なので、同じテンプレートを登録する
  CMS.registerPreviewTemplate("articles", EntryPreview);
  CMS.registerPreviewTemplate("news", EntryPreview);
  CMS.registerPreviewTemplate("reports", EntryPreview);
})();
