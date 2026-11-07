import { getReportArticles } from "./content";

// 活動報告ページ用に、活動報告（src/content/reports/）の一覧を整える
export interface ReportEntry {
  title: string;
  date: Date;
  fy: number;
  tagLabels: string[];
  description: string;
  image?: string;
  href: string;
}

export const fiscalYearOf = (d: Date) =>
  d.getUTCMonth() >= 3 ? d.getUTCFullYear() : d.getUTCFullYear() - 1;

export async function getReports(): Promise<ReportEntry[]> {
  const articles = (await getReportArticles()).filter(({ data }) => !data.draft);
  return articles
    .map((e) => ({
      title: e.data.title,
      date: e.data.date,
      fy: fiscalYearOf(e.data.date),
      tagLabels: e.tagLabels,
      description: e.data.description,
      image: e.data.image,
      href: `/articles/${e.slug}`,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
