import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchtaskById, edittaskHandler } from "../../connection/tasksDB";
import { customToast } from "../../utility/toast";
import Animations from "../../utility/animations";
import Loading from "../../utility/loading";

export default function Xedittask() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [taskData, settaskData] = useState({
        taskName: "",
        description: "",
        details: "",
        dueDate: "",
        steps: [], // Array of steps
    });

    useEffect(() => {
        if (!taskId) {
            customToast("Invalid task ID", "error");
            navigate(-1);
            return;
        }

        const fetchtaskData = async () => {
            try {
                const data = await fetchtaskById(taskId);
                if (data) {
                    settaskData(data);
                } else {
                    customToast("Task not found", "error");
                    navigate(-1);
                }
            } catch (error) {
                console.error("Error fetching task:", error);
                customToast("Error loading task data", "error");
            }
        };

        fetchtaskData();
    }, [taskId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        settaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStepsChange = (e) => {
        const stepsArray = e.target.value.split("\n"); // Convert textarea input into an array
        settaskData((prev) => ({
            ...prev,
            steps: stepsArray,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await edittaskHandler(taskId, taskData);
            if (!result.success) {
                customToast(result.message, "error");
                return;
            }

            customToast("Task updated successfully", "success");
            navigate(-1);
            window.location.reload();
        } catch (error) {
            console.error("Error updating task:", error);
            customToast("Failed to update task", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        customToast("Editing cancelled", "info");
        navigate(-1);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-blue-400 dark:bg-blue-950 text-blue-950 dark:text-blue-400 p-5">
            <Animations>
                <div className="flex items-center justify-center w-full">
                    <div className="bg-blue-950 text-blue-400 rounded-lg shadow-lg p-5 w-full space-y-6 border border-amber-400">
                        <h1 className="text-3xl font-bold text-center">
                            Edit Task
                        </h1>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            {/** Task Name */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    htmlFor="taskName"
                                >
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    name="taskName"
                                    id="taskName"
                                    value={taskData.taskName || ""}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            {/** Description */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={taskData.description || ""}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            {/** Details */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    htmlFor="details"
                                >
                                    Details
                                </label>
                                <textarea
                                    name="details"
                                    id="details"
                                    value={taskData.details || ""}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            {/** Due Date */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    htmlFor="dueDate"
                                >
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    value={taskData.dueDate || ""}
                                    onChange={handleInputChange}
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            {/** State */}

                            {/** Steps (Array) */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    htmlFor="steps"
                                >
                                    Steps (Enter one per line)
                                </label>
                                <textarea
                                    name="steps"
                                    id="steps"
                                    value={taskData.steps.join("\n") || ""}
                                    onChange={handleStepsChange}
                                    rows="4"
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    type="submit"
                                    disabled={loading} // Disable button when loading
                                >
                                    {loading ? <Loading /> : "Update Task"}
                                </button>
                            </div>
                        </form>
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Animations>
        </div>
    );
}
