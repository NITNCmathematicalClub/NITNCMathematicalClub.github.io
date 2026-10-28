// 日付表示のヘルパー。front-matter の日付は UTC 基準で保持されるため、UTC で取り出す
export const fmtDots = (d: Date) =>
  `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${String(d.getUTCDate()).padStart(2, "0")}`;

export const fmtJP = (d: Date) =>
  `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;

export const fmtISO = (d: Date) =>
  `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
