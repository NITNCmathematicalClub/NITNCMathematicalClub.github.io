// src/components/ActivityCard.tsx
import React from "react";

interface Activity {
  // id: number;
  title: string;
  date: number;
  place: string;
  description: string;
  images: string[]; // imagesは必須と仮定（もし画像がない場合もあるならimages?: string[]; にする）
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const formattedDate = new Date(activity.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    // ここにmb-8クラスを追加して、下方向に間隔をあけます
    <div className="max-w-full bg-white border-t border-gray-white mb-8">
      <h3 className="h3-style mb-4 text-xl font-semibold text-gray-800">
        {activity.title}
      </h3>

      <table className="w-full text-text-base font-sans mb-6">
        <tbody>
          <tr className="last:border-b-0">
            <th className="py-3 text-left font-semibold text-text-accent w-1/5">
              日時
            </th>
            <td className="py-3 text-left text-text-base w-4/5">
              {formattedDate}
            </td>
          </tr>
          <tr>
            <th className="py-3 text-left font-semibold text-text-accent w-1/5">
              場所
            </th>
            <td className="py-3 text-left text-text-base w-4/5">
              {activity.place}
            </td>
          </tr>
          <tr>
            <th className="py-3 text-left font-semibold text-text-accent w-1/5">
              概要
            </th>
            <td className="py-3 text-left text-text-base w-4/5">
              {activity.description}
            </td>
          </tr>
        </tbody>
      </table>

      {/* 画像セクションの開始 */}
      {/* imagesが存在し、かつ少なくとも1つの画像がある場合のみ表示 */}
      {activity.images && activity.images.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          {" "}
          {/* 全体をラップするFlexbox。モバイルでは縦、PCでは横に並べる */}
          {/* 左側の大きな画像コンテナ (1枚目の画像) */}
          {/* flex-1 で親要素の利用可能幅を均等に分割 */}
          {activity.images[0] && ( // 1枚目の画像が存在する場合のみ表示
            <div className="flex-2 relative overflow-hidden shadow-sm">
              {" "}
              {/* 4:3のアスペクト比 (3/4 = 0.75 = 75%) */}
              <img
                src={activity.images[0]}
                alt={`${activity.title} 画像 1`}
                className="absolute inset-0 w-full h-full object-cover" // 全体を覆い、中央でトリミング
              />
            </div>
          )}
          {/* 右側の上下2つの画像コンテナ (2枚目と3枚目の画像) */}
          {/* 2枚以上の画像がある場合のみ右側グループを表示 */}
          {activity.images.length > 1 && (
            <div className="flex-1 flex flex-col gap-4">
              {" "}
              {/* 右側全体もFlexboxで、子要素を縦に並べる */}
              {/* 右上 (2枚目の画像) */}
              {activity.images[1] && ( // 2枚目の画像が存在する場合のみ表示
                <div className="relative pb-[75%] overflow-hidden">
                  {" "}
                  {/* 4:3のアスペクト比 */}
                  <img
                    src={activity.images[1]}
                    alt={`${activity.title} 画像 2`}
                    className="absolute inset-0 w-full h-full object-cover object-center" // 全体を覆い、中央でトリミング
                  />
                </div>
              )}
              {/* 右下 (3枚目の画像) */}
              {activity.images[2] && ( // 3枚目の画像が存在する場合のみ表示
                <div className="relative pb-[75%] overflow-hidden">
                  {" "}
                  {/* 4:3のアスペクト比 */}
                  <img
                    src={activity.images[2]}
                    alt={`${activity.title} 画像 3`}
                    className="absolute inset-0 w-full h-full object-cover object-center" // 全体を覆い、中央でトリミング
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {/* 画像セクションの終了 */}
    </div>
  );
};

export default ActivityCard;
