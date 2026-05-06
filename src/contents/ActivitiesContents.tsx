import ActivityCard from "../components/ActivityCard";
import React, { useState, useEffect, type JSX } from "react";

// Activityの型定義（以前のコードから変更なし）
interface Activity {
  title: string;
  date: number;
  place: string;
  description: string;
  images: string[];
}

// 活動データと年度を計算するヘルパー関数（変更なし）
const getFiscalYear = (timestamp: number): number => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11 (0=1月, 3=4月)
  return month >= 3 ? year : year - 1;
};

const ActivitiesContents: React.FC = () => {
  // activities配列の状態を管理
  const [activities, setActivities] = useState<Activity[]>([]);
  // データの読み込み状態を管理
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // エラー状態を管理
  const [error, setError] = useState<string | null>(null);

  // コンポーネントがマウントされたときに一度だけデータをフェッチ
  useEffect(() => {
    fetch("/activities.json") // publicディレクトリにあるJSONファイルを指定
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答がありませんでした");
        }
        return response.json();
      })
      .then((data: Activity[]) => {
        // 日付の降順にソート（新しい日付が上に来るように）
        // JSONファイル内でソート済みであれば不要ですが、安全策として入れておきます
        const sortedData = data.sort((a, b) => b.date - a.date);
        setActivities(sortedData);
      })
      .catch((err) => {
        console.error("活動データの読み込みに失敗しました:", err);
        setError("活動データの読み込みに失敗しました。");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // 空の配列を渡すことで、初回レンダリング時に一度だけ実行される

  // 読み込み中、またはエラーの場合はメッセージを表示
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>活動データを読み込み中...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>エラー: {error}</p>
      </div>
    );
  }

  // 読み込みが完了したら、データを元にコンテンツをレンダリング
  let currentFiscalYear: number | null = null;
  const contentToRender: JSX.Element[] = [];

  activities.forEach((activity, index) => {
    const fiscalYear = getFiscalYear(activity.date);

    if (fiscalYear !== currentFiscalYear) {
      currentFiscalYear = fiscalYear;
      contentToRender.push(
        <h2 key={`year-${fiscalYear}`} className="h2-style">
          {fiscalYear}年度
        </h2>
      );
    }
    contentToRender.push(<ActivityCard key={index} activity={activity} />);
  });

  return (
    <div
      className="text-text-base font-sans border-t border-gray-white"
      id="activities-content"
    >
      {contentToRender}
    </div>
  );
};

export default ActivitiesContents;
