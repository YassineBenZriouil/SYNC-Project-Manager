import React from "react";
import { useNavigate } from "react-router-dom";
import Animations from "../utility/animations";

export default function NotAllowed() {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-2);
    };

    return (
        <div className=" bg-blue-400 dark:bg-blue-950 ">
            <Animations>
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <h1 className="text-2xl font-bold text-blue-9500 dark:text-blue-400 mb-4 text-center">
                        You <strong className="text-red-500">Don't</strong> Have
                        The Proper Authorization To Do This Action
                    </h1>
                    <button
                        onClick={handleCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </Animations>
        </div>
    );
}
