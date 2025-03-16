import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { customToast } from "../../utility/toast";
import { setFavoriteProjects } from "../../connection/projectDB";
import { checkProjectFavoriteStatus } from "../../connection/projectDB"; // Import the new function

export default function XProjectCard({ project }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Load favorite status when component mounts or project changes
        const loadFavoriteStatus = async () => {
            if (!project || !project.id) return;

            try {
                const isProjectFavorite = await checkProjectFavoriteStatus(
                    project.id
                );
                setIsFavorite(isProjectFavorite);
            } catch (error) {
                console.error("Error loading favorite status:", error);
            }
        };

        loadFavoriteStatus();
    }, [project]);

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "No date available";
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    const copyProjectCode = (projectId, e) => {
        e.preventDefault();
        const codeToBeCloned = project.id;

        navigator.clipboard
            .writeText(codeToBeCloned)
            .then(() => {
                customToast("Copied Successfully", "success");
            })
            .catch((err) => {
                console.error("Failed to copy code: ", err);
            });
    };

    const toggleFavorite = async () => {
        try {
            const updatedFavoriteStatus = await setFavoriteProjects(project.id);
            setIsFavorite(updatedFavoriteStatus);
            window.location.reload();
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    return (
        <div className="mb-4">
            <div className="bg-blue-950 dark:bg-blue-400 text-blue-400 dark:text-blue-950 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4">
                    {project.projectName
                        ? project.projectName
                        : "Untitled Project"}
                </h3>

                <div className="space-y-2">
                    <p className="text-sm">
                        {project.description || "No description available"}
                    </p>

                    <p className="text-sm">
                        <span className="font-semibold">Created:</span>{" "}
                        {formatDate(project.createdAt)}
                    </p>

                    <p className="text-sm">
                        <span className="font-semibold">Workflow:</span>{" "}
                        {project?.workflow?.length
                            ? project.workflow.join(", ")
                            : "No workflow available"}
                    </p>

                    {project?.tasks?.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Tasks:</span>{" "}
                            {project.tasks
                                .map((task) => task.taskname)
                                .join(", ")}
                        </p>
                    )}
                </div>

                <div className="flex gap-3 mt-5">
                    <Link
                        to={`/xtasks/${project.id}`}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                        <i className="fa-solid fa-eye"></i> Open
                    </Link>
                    <Link
                        to={`/xeditproject/${project.id}`}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                        <i className="fa-solid fa-pen"></i> Edit
                    </Link>
                    <Link
                        to={`/xeditproject/${project.id}`}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
                        onClick={(e) => copyProjectCode(project.id, e)}
                    >
                        <i className="fa-solid fa-copy"></i> Copy Code
                    </Link>
                    <Link to={`/xdeleteproject/${project.id}`}>
                        <button className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200">
                            <i className="fa-solid fa-trash"></i> Delete
                        </button>
                    </Link>
                    <button
                        className={`
    flex items-center justify-center
    transition-all duration-200 w-10 h-10 rounded-lg
    ${
        isFavorite
            ? "bg-yellow-100 text-yellow-500 hover:bg-yellow-200"
            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
    }
    focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
  `}
                        onClick={toggleFavorite}
                        aria-label={
                            isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                    >
                        <i
                            className={`fa-${
                                isFavorite ? "solid" : "regular"
                            } fa-star text-lg`}
                        ></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
