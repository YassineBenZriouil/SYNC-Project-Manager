import useTheme from "./useTheme"; // Import the hook
import React from "react";

export default function ThemeButton() {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={toggleTheme}
            className={`w-7 h-7 p-1 rounded-lg hover:scale-110 transition duration-200 flex justify-center items-center text-2xl  cursor-pointer ${
                theme === "dark"
                    ? "bg-amber-400 text-blue-950 "
                    : "bg-amber-400 text-blue-950 hover:scale-110 transition duration-200 cursor-pointer"
            }`}
        >
            {theme === "dark" ? (
                <i class="fa-regular fa-sun"></i>
            ) : (
                <i className="fas fa-moon"></i>
            )}
        </button>
    );
}
