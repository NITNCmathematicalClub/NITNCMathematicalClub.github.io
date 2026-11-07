import { useMemo, useState } from "react";

export type Note = {
  date: string;
  content: string;
  author: string;
};

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function NoteCalendar({ notes }: { notes: Note[] }) {
  const [current, setCurrent] = useState(() => {
    const latest = [...notes].sort((a, b) => b.date.localeCompare(a.date))[0];
    return latest ? new Date(latest.date + "T00:00:00") : new Date();
  });
  const [selected, setSelected] = useState<string | null>(null);

  const noteDates = useMemo(() => new Set(notes.map((n) => n.date)), [notes]);
  const days = useMemo(() => {
    const year = current.getFullYear();
    const month = current.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const arr: (Date | null)[] = [];
    for (let i = 0; i < first.getDay(); i++) arr.push(null);
    for (let d = 1; d <= last.getDate(); d++) arr.push(new Date(year, month, d));
    return arr;
  }, [current]);

  const selectedNotes = selected ? notes.filter((n) => n.date === selected) : [];
  const move = (diff: number) => {
    setCurrent(new Date(current.getFullYear(), current.getMonth() + diff, 1));
    setSelected(null);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => move(-1)}
            className="px-3 py-1 text-navy hover:text-gold-text"
            aria-label="前の月"
          >
            ←
          </button>
          <p className="font-display text-lg font-bold text-navy">
            {current.getFullYear()}年 {current.getMonth() + 1}月
          </p>
          <button
            type="button"
            onClick={() => move(1)}
            className="px-3 py-1 text-navy hover:text-gold-text"
            aria-label="次の月"
          >
            →
          </button>
        </div>
        <div className="mt-3 grid grid-cols-7 text-center text-xs text-sub">
          {["日", "月", "火", "水", "木", "金", "土"].map((w) => (
            <span key={w} className="py-1">
              {w}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            if (!day) return <span key={`e-${i}`} />;
            const key = fmt(day);
            const has = noteDates.has(key);
            const isSel = selected === key;
            return (
              <button
                key={key}
                type="button"
                disabled={!has}
                onClick={() => setSelected(isSel ? null : key)}
                className={`relative m-0.5 aspect-square rounded-full text-sm ${
                  isSel
                    ? "bg-navy font-bold text-white"
                    : has
                      ? "font-bold text-navy hover:bg-band"
                      : "text-sub/50"
                }`}
              >
                {day.getDate()}
                {has && !isSel && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-navy">{selected ? `${selected} の雑記` : "雑記を選んでください"}</h3>
        <div className="mt-4 space-y-4">
          {selected &&
            (selectedNotes.length > 0 ? (
              selectedNotes.map((n, i) => (
                <article key={i} className="border-l-2 border-gold pl-4">
                  <p className="leading-relaxed">{n.content}</p>
                  <p className="mt-2 text-xs text-sub">{n.author}</p>
                </article>
              ))
            ) : (
              <p className="text-sm text-sub">この日の雑記はありません。</p>
            ))}
          {!selected && (
            <p className="text-sm leading-relaxed text-sub">
              ゴールドの点が付いた日に雑記があります。日付を選ぶと内容が表示されます。
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
