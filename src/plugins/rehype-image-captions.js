/**
 * 画像だけの段落を <figure> 化し、代替テキストをキャプションにする rehype プラグイン。
 *
 * Markdown には画像キャプションの標準記法がないため、記事本文では
 * 「画像だけを置いた段落」の代替テキスト（![ここの文](...)）を
 * 画像の下にキャプションとして表示する約束とする。
 * 文中に埋め込まれた画像や、代替テキストが空の画像は対象外。
 * 外部パッケージに頼らず、hast ツリーの走査だけで実装する。
 */

/**
 * 空白だけのテキストノードかどうか。
 * @param {object} node hast ノード。
 * @returns {boolean} 結果。
 */
const isIgnorable = (node) => node.type === "text" && node.value.trim() === "";

/**
 * 段落ノードが「画像だけの段落」なら figure ノードに変換する。
 * @param {object} node hast ノード。
 * @returns {object | null} figure ノード、対象外なら null。
 */
const toFigure = (node) => {
  if (node.type !== "element" || node.tagName !== "p") {
    return null;
  }

  const meaningful = (node.children ?? []).filter((child) => !isIgnorable(child));

  if (meaningful.length !== 1) {
    return null;
  }

  const img = meaningful[0];

  if (img.type !== "element" || img.tagName !== "img") {
    return null;
  }

  const alt = typeof img.properties?.alt === "string" ? img.properties.alt.trim() : "";

  if (!alt) {
    return null;
  }

  return {
    type: "element",
    tagName: "figure",
    properties: {},
    children: [
      img,
      {
        type: "element",
        tagName: "figcaption",
        properties: {},
        children: [{ type: "text", value: alt }],
      },
    ],
  };
};

/**
 * ツリーを再帰的にたどり、対象の段落を置き換える。
 * @param {object} node hast ノード。
 */
const visit = (node) => {
  if (!node || !Array.isArray(node.children)) {
    return;
  }

  node.children = node.children.map((child) => {
    visit(child);

    return toFigure(child) ?? child;
  });
};

/**
 * rehype プラグイン本体。
 * @returns {(tree: object) => void} hast ツリーの変換関数。
 */
export default function rehypeImageCaptions() {
  return (tree) => {
    visit(tree);
  };
}
