import activitiesData from "../data/activities.json";
import { getReportArticles } from "./content";

// 活動報告ページ用に、活動報告（src/content/reports/）と従来の活動記録（activities.json）を統合する
export interface ReportEntry {
  title: string;
  date: Date;
  fy: number;
  description: string;
  image?: string;
  href: string;
}

export const fiscalYearOf = (d: Date) =>
  d.getUTCMonth() >= 3 ? d.getUTCFullYear() : d.getUTCFullYear() - 1;

export async function getReports(): Promise<ReportEntry[]> {
  const articles = (await getReportArticles()).filter(({ data }) => !data.draft);
  const fromArticles: ReportEntry[] = articles.map((e) => ({
    title: e.data.title,
    date: e.data.date,
    fy: fiscalYearOf(e.data.date),
    description: e.data.description,
    image: e.data.image,
    href: `/articles/${e.slug}`,
  }));
  const fromRecords: ReportEntry[] = activitiesData.map((a) => {
    const date = new Date(a.date + "T00:00:00Z");
    return {
      title: a.title,
      date,
      fy: fiscalYearOf(date),
      description: a.description,
      image: a.images[0],
      href: `/activities/records/${a.date}`,
    };
  });
  return [...fromArticles, ...fromRecords].sort((a, b) => b.date.getTime() - a.date.getTime());
}
