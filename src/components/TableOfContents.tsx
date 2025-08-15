import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, "-");

const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3");
    const tocItems: TocItem[] = [];

    headings.forEach((el) => {
      const text = el.textContent || "";
      const id = slugify(text);

      // idが未設定なら自動でつける
      if (!el.id) el.id = id;

      tocItems.push({
        id,
        text,
        level: el.tagName === "H1" ? 1 : 2,
      });
    });

    setItems(tocItems);
  }, []);

  return (
    <aside className="hidden lg:block w-1/5 pl-6 sticky top-20 text-sm font-sans border-t border-gray-white pt-6">
      <h4 className="font-extrabold mb-3 text-text-accent">目次</h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.text} className={item.level === 1 ? "ml-4" : ""}>
            <a
              href={`#${item.id}`}
              className="hover:underline text-gray block font-bold"
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
