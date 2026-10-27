// src/components/ActivityCard.tsx
// import React from "react";

interface Activity {
  // id: number;
  title: string;
  date: string;
  place: string;
  description: string;
  images: string[]; // imagesは必須と仮定（もし画像がない場合もあるならimages?: string[]; にする）
}

interface ActivityCardProps {
  activity: Activity;
}

// アクティビティカードコンポーネント
const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  // 画像が存在しない場合のフォールバックURL
  const fallbackImage = (text: string) =>
    `https://placehold.co/600x450/e2e8f0/4a5568?text=${encodeURIComponent(
      text
    )}`;

  // 画像のエラーハンドラー
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    text: string
  ) => {
    e.currentTarget.onerror = null; // 無限ループを防ぐためにonerrorを無効化
    e.currentTarget.src = fallbackImage(text);
  };

  return (
    <div className="bg-white p-6 my-8 flex flex-col md:flex-row items-start md:items-center border-t border-gray-white">
      {/* テキストコンテンツ */}
      <div className="flex-1 md:pr-8 mb-4 md:mb-0">
        <h3 className="h3-style font-semibold text-text-base mb-1">
          {activity.title}
        </h3>
        <p className="text-gray text-sm mb-4">
          <p>
            {new Date(activity.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            {/* {" | "} */}
            {activity.place}
          </p>
        </p>
        <p className="text-text-base leading-relaxed">{activity.description}</p>
      </div>

      {/* 画像コンテナ */}
      {activity.images && activity.images.length > 0 && (
        <div className="w-full md:w-1/2 lg:w-2/3 flex flex-col md:flex-row gap-4">
          {/* 左側の大きな画像 (1枚目) */}
          {activity.images[0] && (
            <div className="w-full md:w-2/3 relative overflow-hidden">
              <img
                src={activity.images[0]}
                alt={`${activity.title} 画像 1`}
                className="w-full h-full object-cover aspect-[4/3]"
                onError={(e) => handleImageError(e, "Image 1")}
              />
            </div>
          )}

          {/* 右側の上下2つの画像 (2枚目と3枚目) */}
          {activity.images.length > 1 && (
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              {activity.images[1] && (
                <div className="relative overflow-hidden">
                  <img
                    src={activity.images[1]}
                    alt={`${activity.title} 画像 2`}
                    className="w-full h-full object-cover aspect-[4/3]"
                    onError={(e) => handleImageError(e, "Image 2")}
                  />
                </div>
              )}
              {activity.images[2] && (
                <div className="relative overflow-hidden">
                  <img
                    src={activity.images[2]}
                    alt={`${activity.title} 画像 3`}
                    className="w-full h-full object-cover aspect-[4/3]"
                    onError={(e) => handleImageError(e, "Image 3")}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
