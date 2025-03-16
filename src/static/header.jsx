import React, { useState } from "react";
import { Link } from "react-router-dom";
import Theme from "../style/themeBtn.jsx";
import Brand from "../utility/brand.jsx";

export default function Header({ theme, setTheme }) {
    const navElems = ["home", "about", "features", "login"];
    const [showNavMenu, setShowNavMenu] = useState(false);

    const toggleNavMenu = () => setShowNavMenu(!showNavMenu);
    const closeNavMenu = () => setShowNavMenu(false);

    return (
        <>
            <div className="flex justify-between items-center bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400 py-3 px-8 border-b-2 border-blue-950 dark:border-blue-400 shadow-lg">
                <Link to="/" className="flex items-center cursor-pointer">
                    <Brand />
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {navElems.map((navElem) => (
                        <Link
                            to={navElem === "home" ? "/" : `/${navElem}`}
                            key={navElem}
                            onClick={closeNavMenu}
                            className="font-semibold uppercase tracking-wide hover:scale-105 transition duration-200 cursor-pointer relative"
                        >
                            <span className="hover:text-amber-400">
                                {navElem}
                            </span>
                            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-0 h-1 bg-amber-400 rounded-full transition-all duration-300 hover:w-full"></span>
                        </Link>
                    ))}
                    <Theme theme={theme} setTheme={setTheme} />
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleNavMenu}
                    className="md:hidden text-xl cursor-pointer hover:scale-110 transition duration-200"
                >
                    <i
                        className={`fa-solid ${
                            showNavMenu ? "fa-times" : "fa-bars"
                        }`}
                    ></i>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {showNavMenu && (
                <div className="md:hidden flex flex-col items-center p-4 text-center bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400 shadow-lg">
                    {navElems.map((navElem) => (
                        <Link
                            to={navElem === "home" ? "/" : `/${navElem}`}
                            key={navElem}
                            onClick={closeNavMenu}
                            className="font-semibold uppercase tracking-wide hover:scale-105 transition duration-200 cursor-pointer py-2 w-full border-t border-blue-950 dark:border-blue-400"
                        >
                            {navElem}
                        </Link>
                    ))}
                    <div className="mt-4">
                        <Theme theme={theme} setTheme={setTheme} />
                    </div>
                </div>
            )}
        </>
    );
}
