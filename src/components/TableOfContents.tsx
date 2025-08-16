import { useEffect, useState, type FC } from "react";

// 目次アイテムの型定義
interface TocItem {
  id: string;
  text: string;
  level: number;
}

// テキストをURLに適した形式に変換するヘルパー関数
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, "-");

// 目次コンポーネント
const TableOfContents: FC = () => {
  // 目次アイテムの状態管理
  const [items, setItems] = useState<TocItem[]>([]);

  // コンポーネントがマウントされたときに実行
  useEffect(() => {
    // コンポーネントのレンダリングが完了するまで待機
    const timer = setTimeout(() => {
      // classNameが"h2-style"の要素をすべて取得
      const headings = document.querySelectorAll(".h2-style");
      const tocItems: TocItem[] = [];

      // 取得した要素ごとに処理
      headings.forEach((el) => {
        // テキストとIDを取得
        const text = el.textContent || "";
        const id = slugify(text);

        // IDが未設定なら自動でつける
        if (!el.id) el.id = id;

        // 目次アイテムのリストに追加
        tocItems.push({
          id,
          text,
          // ここではすべての要素がh2-styleなので、レベルを2に固定
          level: 2,
        });
      });

      // 状態を更新
      setItems(tocItems);
    }, 500); // 500ミリ秒待機

    // クリーンアップ関数
    return () => clearTimeout(timer);
  }, []); // 依存配列が空なので、一度だけ実行

  // スムーズスクロールを処理する関数
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // デフォルトのアンカーリンクの動作を停止

    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    const targetId = href.substring(1); // '#' を削除してIDを取得
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const navBarHeight = 70; // ナビゲーションバーの高さを設定 (例: 70px)

      // スムーズスクロールを実行
      window.scrollTo({
        top: offsetTop - navBarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="hidden lg:block w-1/5 pl-6 sticky top-20 text-sm font-sans border-t border-gray-white pt-6">
      <h4 className="font-extrabold mb-3 text-text-accent">目次</h4>
      <ul className="space-y-1">
        {items.map((item) => (
          // 目次アイテムをリストとして表示
          <li key={item.text} className={item.level === 1 ? "ml-4" : ""}>
            <a
              href={`#${item.id}`}
              className="hover:underline text-gray block font-bold"
              onClick={handleAnchorClick} // クリックイベントを追加
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TableOfContents;
