import React from "react";
import IMG from "../assets/homeIMG.jpg";
import Btn from "../utility/btn";
import Animation from "../utility/animations";
import TypingEffect from "../utility/typeWriter";

export default function Home() {
    return (
        <div className=" bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400">
            <Animation>
                <div className="h-screen flex flex-col items-center justify-center px-6 py-12">
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
                        <div className="text-center md:text-left md:max-w-md lg:max-w-lg flex flex-col">
                            <div className="flex items-center mb-3">
                                <span className="bg-amber-400 h-1 w-16 rounded mr-2"></span>
                                <span className="text-amber-400 font-semibold">
                                    SIMPLIFY YOUR WORKFLOW
                                </span>
                            </div>
                            <TypingEffect
                                className="text-xl font-semibold"
                                texts={[
                                    "Organize your work ! ",
                                    "Organize your LIFE !!",
                                ]}
                            />
                            <p className="text-xl mb-8">
                                Simplify life for both you and your team with
                                the world's #1 task manager and to-do list app.
                            </p>
                            <div className="self-center md:self-start">
                                <Btn in="Get Started" />
                            </div>
                        </div>
                        {/* Image Section */}
                        <div className="md:mt-0 relative">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400 rounded-full opacity-20"></div>
                            <img
                                src={IMG}
                                alt="Home Illustration"
                                className="w-80 md:w-96 lg:w-full max-w-lg rounded-lg shadow-xl relative z-10"
                            />
                            <div className="absolute -bottom-3 -left-3 h-16 w-16 border-4 border-amber-400 rounded-lg z-0"></div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-4 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center border-t-2 border-amber-400 pt-3">
                            <p className="italic text-lg mb-2">
                                "Simple, straightforward, and super powerful"
                            </p>
                            <i className="fa-brands fa-superpowers text-xl text-amber-400"></i>
                        </div>
                        <div className="flex flex-col items-center border-t-2 border-amber-400 pt-3">
                            <p className="italic text-lg mb-2">
                                "Advanced, Simple, and Friendly"
                            </p>
                            <i className="fa-solid fa-handshake-simple text-xl text-amber-400"></i>
                        </div>
                        <div className="flex flex-col items-center border-t-2 border-amber-400 pt-3">
                            <p className="italic text-lg mb-2">
                                "Nothing short of stellar"
                            </p>
                            <i className="fa-solid fa-tower-broadcast text-xl text-amber-400"></i>
                        </div>
                    </div>
                </div>
            </Animation>
        </div>
    );
}
