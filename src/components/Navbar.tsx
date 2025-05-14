import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return(
    // <nav className="bg-accent text-white p-4 shadow-md">
    //   <div className="countainer mx-auto flex justify-between items-center">
    //     <Link to="/" className="text-white text-lg font-bold">数理同好会</Link>
    //     <div className="space-x-4">
    //       <Link to="/" className="hover:text-bfbase-light font-semibold">ホーム</Link>
    //       <Link to="/activities" className="hover:text-bfbase-light font-semibold">活動内容</Link>
    //       <Link to="/members" className="hover:text-bfbase-light font-semibold">会員紹介</Link>
    //     </div>
    //   </div>
    // </nav>
    <nav className="bg-header text-text-hfbase p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-text-hfbase text-lg font-bold">数理同好会</Link>
        <div className="space-x-4">
          {/* <Link to="/" className="hover:underline">ホーム</Link> */}
          <Link to="/introduce" className="hover:underline">数理同好会とは</Link>
          <Link to="/schedule" className="hover:underline">活動計画</Link>
          <Link to="/activities" className="hover:underline">活動報告</Link>
          <Link to="/report" className="hover:underline">部誌</Link>
          {/* <Link to="/members" className="hover:underline">会員紹介</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;