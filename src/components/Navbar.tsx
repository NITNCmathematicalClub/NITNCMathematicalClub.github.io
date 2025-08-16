import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import getBase from "./getBaseURL";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close the menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Navbar Container */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-blue bg-opacity-80 text-white font-sans text-extrabold backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
          {/* Left: Logo */}
          <Link
            to={getBase("")}
            className="text-xl font-extrabold font-serif text-white"
          >
            数理同好会
          </Link>

          {/* Center: Desktop Menu (PC view) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8 font-sans">
            <Link
              to={getBase("introduce")}
              className="text-white hover:text-gray-400 transition-colors"
            >
              数理同好会って何？
            </Link>
            <Link
              to={getBase("activities")}
              className="text-white hover:text-gray-400 transition-colors"
            >
              活動報告
            </Link>
            <Link
              to={getBase("clubmagazine")}
              className="text-white hover:text-gray-400 transition-colors"
            >
              部誌
            </Link>
            <Link
              to={getBase("exams")}
              className="text-white hover:text-gray-400 transition-colors"
            >
              過去問解説
            </Link>
            <Link
              to={getBase("note")}
              className="text-white hover:text-gray-400 transition-colors"
            >
              雑記帳
            </Link>
            <Link
              to={getBase("contact")}
              className="text-white hover:text-gray-400 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>

          {/* Right: Hamburger Icon (Mobile view) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
            >
              <span
                className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-[0.375rem]" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out my-1 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-[0.375rem]" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Simplified Animation Logic */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-blue transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="flex flex-col items-left pl-4 gap-6 pt-24 font-sans text-xl text-white"
          // Stop propagation to prevent menu from closing when clicking inside
          onClick={(e) => e.stopPropagation()}
        >
          {/* Use conditional classes to control the staggered animation */}
          <Link
            to={getBase("introduce")}
            onClick={() => setIsOpen(false)}
            className={`transition-all duration-500 ease-in-out transform ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-[-100px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "0.02s" : "0s" }}
          >
            数理同好会って何？
          </Link>
          <Link
            to={getBase("activities")}
            onClick={() => setIsOpen(false)}
            className={`transition-all duration-500 ease-in-out transform ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-[-100px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "0.04s" : "0s" }}
          >
            活動報告
          </Link>
          <Link
            to={getBase("clubmagazine")}
            onClick={() => setIsOpen(false)}
            className={`transition-all duration-500 ease-in-out transform ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-[-100px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "0.08s" : "0s" }}
          >
            部誌
          </Link>
          <Link
            to={getBase("exams")}
            onClick={() => setIsOpen(false)}
            className={`transition-all duration-500 ease-in-out transform ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-[-100px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "0.1s" : "0s" }}
          >
            過去問解説
          </Link>
          <Link
            to={getBase("note")}
            onClick={() => setIsOpen(false)}
            className={`transition-all duration-500 ease-in-out transform ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-[-100px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "0.12s" : "0s" }}
          >
            雑記帳
          </Link>
          <Link
            to={getBase("contact")}
            onClick={() => setIsOpen(false)}
            className={`transition-all duration-500 ease-in-out transform ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-[-100px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "0.14s" : "0s" }}
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
