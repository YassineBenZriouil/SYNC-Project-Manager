import React from "react";
import { Link } from "react-router-dom";

export default function XTaskCard({ task }) {
    if (!task) return null;

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "No date available";
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    return (
        <div className="mb-4">
            <div className="bg-blue-950 dark:bg-blue-400 text-blue-400 dark:text-blue-950 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border">
                <h3
                    className="text-xl font-bold mb-4 truncate"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1, // Limit task name to 1 line
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {task.taskName ? task.taskName : "Untitled Task"}
                </h3>

                <div className="space-y-2">
                    <p
                        className="text-sm truncate"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2, // Limit description to 2 lines
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {task.description || "No description available"}
                    </p>

                    <p className="text-sm">
                        <span className="font-semibold">Created:</span>{" "}
                        {formatDate(task.createdAt)}
                    </p>

                    <p className="text-sm">
                        <span className="font-semibold">Last Edited By:</span>{" "}
                        {task.EditedBy || "No editor available"}
                    </p>
                </div>

                <div className="flex gap-3 mt-5">
                    <Link
                        to={`/xedittask/${task.id}`}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                        <i className="fa-solid fa-pen"></i>
                    </Link>
                    <Link to={`/xdeletetask/${task.id}`}>
                        <button className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 cursor-pointer">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </Link>
                    <Link to={`/xtaskinside/${task.id}`}>
                        <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 cursor-pointer">
                            <i className="fa-solid fa-eye"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
