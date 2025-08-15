import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
// import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Introduce from "./pages/Introduce";
import ClubMagazine from "./pages/ClubMagazine";
import Exams from "./pages/Exams";
import Contact from "./pages/Contact";
import Note from "./pages/Note";
import getBase from "./components/getBaseURL";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background text-text-base font-sans">
        <Navbar />

        {/* メインコンテンツ：flex-1で残り全体を占める */}
        <main className="flex-1 pt-10">
          <Routes>
            <Route path={getBase("")} element={<Home />} />
            <Route path={getBase("introduce")} element={<Introduce />} />
            <Route path={getBase("activities")} element={<Activities />} />
            <Route path={getBase("clubmagazine")} element={<ClubMagazine />} />
            <Route path={getBase("exams")} element={<Exams />} />
            <Route path={getBase("contact")} element={<Contact />} />
            <Route path={getBase("note")} element={<Note />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
