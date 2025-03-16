import React from "react";
import Animations from "./../utility/animations";

export default function Features() {
    const featuresList = [
        {
            icon: "fa-users",
            title: "Seamless Collaboration",
            description:
                "Work together effortlessly with instant team invites and shared workspaces.",
        },
        {
            icon: "fa-list-check",
            title: "Smart Task Management",
            description:
                "Easily create, assign, and track tasks to keep your projects on schedule.",
        },
        {
            icon: "fa-arrows-up-down-left-right",
            title: "Drag & Drop Simplicity",
            description:
                "Organize your workflow visually with an intuitive drag-and-drop interface.",
        },
        {
            icon: "fa-lightbulb",
            title: "Minimal Learning Curve",
            description:
                "Jump in and start using the platform without any complicated onboarding.",
        },
        {
            icon: "fa-clock",
            title: "Real-Time Updates",
            description:
                "Stay in sync with automatic updates and live collaboration features.",
        },
        {
            icon: "fa-shield-halved",
            title: "Secure & Reliable",
            description:
                "Top-tier security ensures your data is always protected and private.",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400">
            <Animations>
                <div className="container mx-auto max-w-6xl">
                    {/* Title Section */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-3">
                            <span className="bg-amber-400 h-1 w-16 rounded mr-2"></span>
                            <span className="text-amber-400 font-semibold">
                                POWERFUL FEATURES
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Unlock Your Productivity
                        </h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            Discover the tools that make project management
                            easy, efficient, and stress-free.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                        {featuresList.map((feature, index) => (
                            <div
                                key={index}
                                className="border-2 border-amber-400 bg-blue-950/10 p-8 rounded-lg shadow-lg dark:bg-blue-400/10 transition-all duration-300 hover:shadow-2xl hover:bg-blue-950/20 dark:hover:bg-blue-400/20 cursor-pointer text-center"
                            >
                                <div className="text-4xl text-amber-400 mb-4">
                                    <i
                                        className={`fa-solid ${feature.icon}`}
                                    ></i>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">
                                    {feature.title}
                                </h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Animations>
        </div>
    );
}
