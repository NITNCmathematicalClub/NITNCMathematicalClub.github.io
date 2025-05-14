import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Members from "./pages/Members";
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-text-base font-sans">
        <Navbar />
        
        {/* メインコンテンツ：flex-1で残り全体を占める */}
        <main className="flex-1 px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduce" element={<Activities />} />
            <Route path="/schedule" element={<Members />} />
            <Route path="/activities" element={<Members />} />
            <Route path="/report" element={<Members />} />
            {/* <Route path="/members" element={<Members />} /> */}
            {/* <Route path="/members" element={<Members />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
