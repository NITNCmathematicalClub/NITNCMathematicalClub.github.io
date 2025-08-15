// src / components / Navbar.tsx;
import { Link } from "react-router-dom";
import { useState } from "react";
import getBase from "./getBaseURL";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // ここに border-b と border-gray-300 を追加
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue text-white font-serif">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* 左: ロゴ */}
        <Link
          to={getBase("")}
          className="text-xl font-extrabold font-serif text-text-hfbase"
        >
          数理同好会
        </Link>

        {/* 中央: メニュー（PC表示時） */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8 font-sans">
          <Link to={getBase("introduce")} className="">
            数理同好会って何？
          </Link>
          <Link to={getBase("activities")} className="">
            活動報告
          </Link>
          <Link to={getBase("clubmagazine")} className="">
            部誌
          </Link>
          <Link to={getBase("exams")} className="">
            過去問解説
          </Link>
          <Link to={getBase("note")} className="">
            雑記帳
          </Link>
          <Link to={getBase("contact")} className="">
            お問い合わせ
          </Link>
        </div>

        {/* ハンバーガー: モバイル表示時 */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-text-hfbase"
          >
            ☰
          </button>
        </div>
      </div>

      {/* モバイルメニュー表示（中央揃え） */}
      {isOpen && (
        <div className="flex flex-col items-center gap-4 md:hidden pb-4">
          <Link to={getBase("introduce")} className="">
            数理同好会って何？
          </Link>
          <Link to={getBase("activities")} className="">
            活動報告
          </Link>
          <Link to={getBase("clubmagazine")} className="">
            部誌
          </Link>
          <Link to={getBase("exams")} className="">
            過去問解説
          </Link>
          <Link to={getBase("contact")} className="">
            お問い合わせ
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
