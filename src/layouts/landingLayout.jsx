import React from "react";
import Header from "../static/header.jsx";
import Footer from "../static/footer.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "../landing/home.jsx";
import About from "../landing/about.jsx";
import Features from "../landing/features.jsx";
import Login from "../auth/login.jsx";
import Register from "../auth/register.jsx";
import Logout from "../auth/logout.jsx";

const LandingLayout = ({ children, theme, setTheme }) => {
    return (
        <>
            <Header theme={theme} setTheme={setTheme} />{" "}
            <Routes>
                <Route path="/" element={<Home />} />{" "}
                <Route path="/about" element={<About />} />{" "}
                <Route path="/features" element={<Features />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
        </>
    );
};

export default LandingLayout;
