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

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col bg-background text-text-base font-sans">
        <Navbar />

        {/* メインコンテンツ：flex-1で残り全体を占める */}
        <main className="flex-1 pt-10">
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/introduce"} element={<Introduce />} />
            <Route path={"/activities"} element={<Activities />} />
            <Route path={"/clubmagazine"} element={<ClubMagazine />} />
            <Route path={"/exams"} element={<Exams />} />
            <Route path={"/contact"} element={<Contact />} />
            <Route path={"/note"} element={<Note />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
