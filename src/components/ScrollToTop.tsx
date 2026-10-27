import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ページ遷移（パスの変更）時に、スクロール位置を先頭へ戻す。
// React Router は標準ではスクロール位置を保持するため、
// 前のページの位置を引き継がないようにする（Issue #5）。
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
