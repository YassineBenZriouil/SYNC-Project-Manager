import React from "react";
import Btn from "../utility/btn.jsx";
import Animations from "./../utility/animations";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400">
            <Animations>
                <div className="container mx-auto max-w-6xl">
                    {/* Title Section */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-3">
                            <span className="bg-amber-400 h-1 w-16 rounded mr-2"></span>
                            <span className="text-amber-400 font-semibold">
                                ABOUT OUR PLATFORM
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Organize Smarter, Work Better
                        </h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            We make project management effortless. With powerful
                            tools and a user-friendly interface, anyone can
                            master productivity in minutes.
                        </p>
                    </div>

                    {/* Why & Philosophy Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {[
                            {
                                title: "Why We're Different",
                                text: "While other platforms overwhelm you with complexity, we keep things simple  ensuring a seamless experience for teams of all sizes.",
                            },
                            {
                                title: "Our Philosophy",
                                text: "Productivity tools should enhance your workflow, not disrupt it.  We focus on adding real value without unnecessary features.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="border-2 border-amber-400 bg-blue-950/10 p-8 rounded-lg shadow-lg dark:bg-blue-400/10 transition-all duration-300 hover:shadow-2xl hover:bg-blue-950/20 dark:hover:bg-blue-400/20 cursor-pointer"
                            >
                                <h3 className="text-2xl font-bold mb-4">
                                    {item.title}
                                </h3>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Features Section */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-4 max-w-4xl mx-auto">
                        {[
                            {
                                icon: "fa-users",
                                title: "Team Collaboration",
                                text: "Invite members with one click and collaborate instantly.",
                            },
                            {
                                icon: "fa-list-check",
                                title: "Task Management",
                                text: "Create and assign tasks effortlessly track progress.",
                            },
                            {
                                icon: "fa-arrows-up-down-left-right",
                                title: "Drag & Drop Workflow",
                                text: "Move tasks seamlessly with our intuitive interface.",
                            },
                            {
                                icon: "fa-lightbulb",
                                title: "Simplicity First",
                                text: "An easy-to-use interface with zero learning curve.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center border-t-2 border-amber-400 pt-3"
                            >
                                <i
                                    className={`fa-solid ${item.icon} text-xl text-amber-400 mb-2`}
                                ></i>
                                <h3 className="text-lg font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-center">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-bold mb-6">
                            Ready to simplify your project management?
                        </h3>
                        <Link to="/register">
                            <Btn in="Get Started Today" />
                        </Link>
                    </div>
                </div>
            </Animations>
        </div>
    );
}
