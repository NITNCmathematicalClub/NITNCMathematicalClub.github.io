import { useState } from "react";

type NavItem = { href: string; label: string };

export default function MobileMenu({ items, current }: { items: NavItem[]; current: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="メニューを開閉する"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-navy"
      >
        <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-line bg-base/95 backdrop-blur-md">
          <ul className="mx-auto max-w-6xl px-5 py-3">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current === item.href ? "page" : undefined}
                  className={`block py-2.5 text-sm ${
                    current === item.href ? "font-bold text-navy" : "text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
