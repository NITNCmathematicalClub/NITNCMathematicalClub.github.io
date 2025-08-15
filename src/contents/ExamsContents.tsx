import { useState, useEffect } from "react";
import getBase from "../components/getBaseURL";

// PDFデータの型をJSONファイルに合わせて修正
interface Exam {
  name: string; // "name"を使用
  pdfUrl: string;
}

const ExamsContents = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getBase("exams.json"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答がありませんでした");
        }
        return response.json();
      })
      .then((data: Exam[]) => {
        setExams(data);
      })
      .catch((err) => {
        console.error("データの読み込みに失敗しました:", err);
        setError("データの読み込みに失敗しました。");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p>問題データを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    // エラーメッセージが表示される
    return (
      <div className="py-8 text-center text-red-500">
        <p>エラー: {error}</p>
      </div>
    );
  }

  return (
    <div className="text">
      <h2 className="h2-style">概要</h2>
      <p>
        こちらでは過去数年分の国立高専の数学の入試問題について,
        数理同好会オリジナルの解答・解説を掲載しています。
      </p>

      <h2 className="h2-style">入試問題・解答一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {exams.map((exam, index) => (
          <a
            key={index}
            href={exam.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 bg-white rounded-lg text-lg font-sans font-semibold text-text-accent border-yellow border-1"
          >
            {/* exam.nameを表示する */}
            <span>{exam.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExamsContents;
