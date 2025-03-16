import React from "react";
import Theme from "../style/themeBtn.jsx";
import { Link } from "react-router-dom";
import Brand from "../utility/brand.jsx";

const currentDate = new Date().getFullYear();

export default function Footer({ theme, toggleTheme }) {
    return (
        <footer className="bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400 py-4 px-8 border-t-2 border-blue-950 dark:border-blue-400 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center cursor-pointer">
                    <Brand />
                </Link>

                {/* Copyright */}
                <p className="text-sm mt-2 md:mt-0">
                    © {currentDate} {import.meta.env.VITE_PROJECT_NAME_SHORT}.
                    All rights reserved.
                </p>

                {/* Creator Credit */}
                <p className="text-sm mt-2 md:mt-0">
                    Made by{" "}
                    <a
                        href="https://ybz.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:text-amber-400 transition duration-200"
                    >
                        Yassine Ben Zriouil
                    </a>
                </p>

                {/* Theme Toggle Button */}
                <div className="mt-2 md:mt-0">
                    <Theme theme={theme} toggleTheme={toggleTheme} />
                </div>
            </div>
        </footer>
    );
}
