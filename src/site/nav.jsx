import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Theme from "../style/themeBtn.jsx";
import Brand from "../utility/brand.jsx";
import { fetchFavoriteProjects } from "../connection/projectDB.jsx";

export default function Nav({ theme, setTheme }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [favList, setFavList] = useState([]);

    const toggleNav = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        navigate("/");
        window.location.reload();
    };

    const handleshowFavo = async () => {
        try {
            const result = await fetchFavoriteProjects();
            setFavList(result);
            console.log(result);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth < 768) {
                setIsOpen(false);
            }
        };

        handleshowFavo();

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navElems = [
        { name: "home", path: "/", icon: "fa-home" },
        {
            name: "Projects",
            path: "/xprojects",
            icon: "fa-solid fa-diagram-project",
        },
    ];

    return (
        <div className="flex border-r-2 border-amber-400">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400 shadow-xl transition-all duration-300 ease-in-out ${
                    isOpen ? "w-56" : "w-20"
                }`}
            >
                {/* Toggle Button - Only show on desktop */}
                {windowWidth >= 768 && (
                    <button
                        onClick={toggleNav}
                        className="absolute top-6 right-[-12px] bg-amber-400  text-blue-400 dark:text-blue-950 p-1 rounded shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none z-15 cursor-pointer border border-amber-400"
                        aria-label={
                            isOpen ? "Collapse sidebar" : "Expand sidebar"
                        }
                    >
                        <div className="flex items-center justify-center w-6 h-6">
                            <i
                                className={`fa-solid ${
                                    isOpen
                                        ? "fa-chevron-left"
                                        : "fa-chevron-right"
                                } text-sm`}
                            ></i>
                        </div>
                    </button>
                )}

                <div className="flex flex-col h-full">
                    {/* Brand/Logo Section */}
                    <div className="py-6 px-4 flex items-center justify-center">
                        {isOpen ? (
                            <Link to="/" className="w-full flex justify-center">
                                <Brand />
                            </Link>
                        ) : (
                            <div className="w-10 h-10 flex items-center justify-center">
                                <i class="fa-solid fa-rotate text-amber-400 text-3xl"></i>
                            </div>
                        )}
                    </div>

                    <div className="mt-2 mb-6 px-4">
                        {isOpen && (
                            <div className="h-px bg-blue-300 dark:bg-blue-700 w-full opacity-60"></div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-3">
                        <ul className="space-y-2">
                            {navElems.map((item) => {
                                const isActive =
                                    location.pathname === item.path ||
                                    (item.path !== "/" &&
                                        location.pathname.startsWith(
                                            item.path
                                        ));

                                return (
                                    <li key={item.name}>
                                        <Link
                                            to={
                                                item.path === "home"
                                                    ? "/"
                                                    : `${item.path}`
                                            }
                                            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative
                                                ${
                                                    isActive
                                                        ? "bg-amber-400 text-blue-950"
                                                        : "hover:bg-amber-400 hover:text-blue-950"
                                                }`}
                                        >
                                            <div
                                                className={`${
                                                    isOpen ? "w-6" : "w-full"
                                                } flex justify-center`}
                                            >
                                                <i
                                                    className={`fa-solid ${
                                                        item.icon
                                                    } ${!isOpen && "text-xl"}`}
                                                ></i>
                                            </div>

                                            {isOpen && (
                                                <span className="ml-4 font-medium capitalize tracking-wide">
                                                    {item.name.toUpperCase()}
                                                </span>
                                            )}

                                            {!isOpen && (
                                                <div
                                                    className="absolute left-full ml-6 px-3 py-1 bg-blue-400 dark:bg-blue-950 rounded-md 
                                                            text-blue-950 dark:text-blue-400 font-medium capitalize opacity-0 
                                                            -translate-x-3 pointer-events-none group-hover:opacity-100 
                                                            group-hover:translate-x-0 transition-all duration-200 z-50 shadow-md"
                                                >
                                                    {item.name}
                                                </div>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="mt-6 mb-2">
                                <div className="px-4 py-2">
                                    {isOpen ? (
                                        <div className="flex items-center ">
                                            <i className="fa-solid fa-star text-amber-400"></i>
                                            <span className="ml-3 font-semibold text-sm uppercase tracking-wider">
                                                Favorites
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <i className="fa-solid fa-star text-amber-400 "></i>
                                        </div>
                                    )}

                                    {favList.length === 0 &&
                                        (isOpen ? (
                                            <p className="text-sm ml-5 mt-5">
                                                No Favorites yet
                                            </p>
                                        ) : (
                                            <i className="fa-solid fa-x text-amber-400 text-sm ml-2 mt-5"></i>
                                        ))}
                                </div>
                            </li>

                            {favList.length > 0 && (
                                <>
                                    <div
                                        className={
                                            isOpen ? "pl-3 pr-1" : "px-1"
                                        }
                                    >
                                        <div className="h-px bg-blue-300 dark:bg-blue-700 w-full opacity-40 mb-2"></div>
                                    </div>

                                    {favList.map((project) => {
                                        const isActive =
                                            location.pathname ===
                                            `/xtasks/${project.id}`;

                                        return (
                                            <li key={project.id}>
                                                <Link
                                                    to={`/xtasks/${project.id}`}
                                                    className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 group relative
                            ${
                                isActive
                                    ? "bg-amber-400 text-blue-950 shadow-md"
                                    : "hover:bg-blue-300/30 dark:hover:bg-blue-800/30 hover:text-amber-400"
                            }`}
                                                >
                                                    <div
                                                        className={`${
                                                            isOpen
                                                                ? "w-6"
                                                                : "w-full"
                                                        } flex justify-center`}
                                                    >
                                                        <i
                                                            className={`${
                                                                isActive
                                                                    ? "fa-solid"
                                                                    : "fa-regular"
                                                            } fa-star ${
                                                                isActive
                                                                    ? "text-blue-950"
                                                                    : "text-amber-400"
                                                            } ${
                                                                !isOpen &&
                                                                "text-xl"
                                                            }`}
                                                        ></i>
                                                    </div>

                                                    {isOpen && (
                                                        <span className="ml-3 font-medium tracking-wide text-sm truncate max-w-32">
                                                            {
                                                                project.projectName
                                                            }
                                                        </span>
                                                    )}

                                                    {!isOpen && (
                                                        <div
                                                            className="absolute left-full ml-6 px-3 py-1 bg-blue-400 dark:bg-blue-950 rounded-md 
                                    text-blue-950 dark:text-blue-400 font-medium capitalize opacity-0 
                                    -translate-x-3 pointer-events-none group-hover:opacity-100 
                                    group-hover:translate-x-0 transition-all duration-200 z-50 shadow-md whitespace-nowrap"
                                                        >
                                                            {
                                                                project.projectName
                                                            }
                                                        </div>
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </>
                            )}
                        </ul>
                    </nav>

                    {/* Bottom section with Logout and Theme toggle */}
                    <div className="mt-auto">
                        {/* Logout Button */}
                        <div className="p-4 border-t border-blue-300 dark:border-blue-700">
                            <button
                                onClick={handleLogout}
                                className={`group flex items-center rounded-lg transition-colors duration-200 
                                    bg-red-500 text-white hover:bg-red-600  cursor-pointer
                                    ${
                                        isOpen
                                            ? "w-full px-4 py-2"
                                            : "mx-auto p-2"
                                    }`}
                            >
                                <div
                                    className={`${
                                        isOpen ? "w-6" : "w-full"
                                    } flex justify-center `}
                                >
                                    <i
                                        className={`fa-solid fa-sign-out-alt ${
                                            !isOpen && "text-xl"
                                        }`}
                                    ></i>
                                </div>

                                {isOpen && (
                                    <span className="ml-3 font-medium cursor-pointer">
                                        Logout
                                    </span>
                                )}

                                {!isOpen && (
                                    <div
                                        onClick={handleLogout}
                                        className="absolute left-full ml-6 px-3 py-1 bg-red-500 text-white rounded-md font-medium capitalize opacity-0 -translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200  shadow-md "
                                    >
                                        Logout
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Theme Toggle */}
                        <div className="p-4 border-t border-blue-300 dark:border-blue-700">
                            <div
                                className={`flex ${
                                    isOpen
                                        ? "justify-between items-center"
                                        : "justify-center"
                                }`}
                            >
                                {isOpen && (
                                    <span className=" font-medium">Theme</span>
                                )}
                                <Theme theme={theme} setTheme={setTheme} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Pushes content when sidebar expands) */}
            <div
                className={`flex-1 transition-all duration-300 ${
                    isOpen ? "ml-56" : "ml-20"
                }`}
            >
                {/* Your page content goes here */}
                <div className="pl-0">{/* Content container */}</div>
            </div>
        </div>
    );
}
