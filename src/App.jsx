import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./style/index.css";
import useTheme from "./style/useTheme.jsx";
import LandingLayout from "./layouts/landingLayout.jsx";
import DashboardLayout from "./layouts/dashboardLayout.jsx";

export default function App() {
    const [theme, setTheme] = useTheme();
    const [loggedIn, setLoggedIn] = useState(
        !!localStorage.getItem("loggedInUser")
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(!!localStorage.getItem("loggedInUser"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="h-screen overflow-y-scroll custom-scrollbar">
            <ToastContainer />
            {loggedIn ? (
                <DashboardLayout theme={theme} setTheme={setTheme} />
            ) : (
                <LandingLayout theme={theme} setTheme={setTheme} />
            )}
        </div>
    );
}
