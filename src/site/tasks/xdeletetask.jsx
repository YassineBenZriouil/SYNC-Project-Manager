import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletetaskHandler } from "../../connection/tasksDB";
import Animations from "../../utility/animations";
import Loading from "../../utility/loading";
import { customToast } from "../../utility/toast";

export default function Xdeletetask() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    console.log("Deleting task with ID:", taskId);

    const handleConfirmDelete = async () => {
        // Check if taskId exists
        if (!taskId) {
            console.error("Task ID is undefined or null");
            return;
        }

        try {
            setIsDeleting(true);

            const result = await deletetaskHandler(taskId);
            if (result === "NA") {
                console.log(result);
                navigate("/notallowed");
            } else {
                navigate(-1);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            setIsDeleting(false);
        }
    };

    const handleCancel = () => {
        customToast("Deletion cancelled", "info");
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400 dark:bg-blue-950 text-blue-950 dark:text-blue-400">
            <div className="flex items-center justify-center w-full max-w-md m-3">
                <Animations>
                    <div className="border  border-amber-400 rounded-lg shadow-lg p-6 w-full">
                        <div className="text-red-600 dark:text-red-400 mb-4 text-5xl text-center">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>

                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Delete task
                        </h2>

                        <p className=" mb-8 text-center">
                            Are you sure you want to delete this task? This
                            action cannot be undone.
                        </p>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="flex-1 bg-red-600 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                            >
                                {isDeleting ? (
                                    <Loading />
                                ) : (
                                    <>
                                        <i className="fa-solid fa-trash mr-2"></i>{" "}
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </Animations>
            </div>
        </div>
    );
}
