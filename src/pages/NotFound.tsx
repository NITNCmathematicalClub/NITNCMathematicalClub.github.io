import { Link } from "react-router-dom";

// 存在しないパスへのアクセス時に表示するページ（Issue #4）。
// 直接URLの場合は public/404.html のリダイレクト経由でここに辿り着く。
const NotFound = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-black text-text-accent mb-6">
        404 - ページが見つかりません
      </h1>
      <p className="text-lg mb-8">
        お探しのページは存在しないか、移動した可能性があります。
        URLをご確認のうえ、トップページから探してみてください。
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue text-white font-semibold rounded-lg"
      >
        トップページへ戻る
      </Link>
    </div>
  );
};

export default NotFound;
