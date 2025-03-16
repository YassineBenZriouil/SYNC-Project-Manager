import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Use useNavigate here
import { fetchtaskById } from "../../connection/tasksDB";
import { customToast } from "../../utility/toast";
import Loading from "../../utility/loading";
import Animations from "../../utility/animations";

export default function Xtaskinside() {
    const { taskId } = useParams();
    const navigate = useNavigate(); // Initialize the navigate function
    const [taskData, setTaskData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const data = await fetchtaskById(taskId);
                if (data) {
                    delete data.project; // Remove "project"
                    setTaskData(data);
                } else {
                    customToast("Task not found", "error");
                }
            } catch (error) {
                console.error("Error fetching task:", error);
                customToast("Error loading task data", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchTaskData();
    }, [taskId]);

    const handleCancel = () => {
        navigate(-1); // Use the navigate function to go back
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400 p-5">
            <Animations>
                <div className="rounded-lg shadow-lg p-5 w-full space-y-6 border border-amber-400">
                    <h1 className="text-3xl font-bold text-center">
                        Task Details
                    </h1>
                    {loading ? (
                        <Loading />
                    ) : taskData ? (
                        <div className="space-y-4">
                            <div className="border-b border-amber-400 pb-2">
                                <strong>Due Date:</strong> {taskData.dueDate}
                            </div>
                            <div className="border-b border-amber-400 pb-2">
                                <strong>Task Name:</strong> {taskData.taskName}
                            </div>
                            <div className="border-b border-amber-400 pb-2">
                                <strong>Description:</strong>{" "}
                                {taskData.description}
                            </div>
                            <div className="border-b border-amber-400 pb-2">
                                <strong>Details:</strong> {taskData.details}
                            </div>
                            <div className="border-b border-amber-400 pb-2">
                                <strong>State:</strong> {taskData.state}
                            </div>
                            <div className="border-b border-amber-400 pb-2">
                                <strong>Steps:</strong>
                                <ul className="mt-2 space-y-2 pl-6 list-disc">
                                    {taskData.steps &&
                                    taskData.steps.length > 0 ? (
                                        taskData.steps.map((step, index) => (
                                            <li
                                                key={index}
                                                className="bg-blue-700 text-blue-400 p-2 rounded-md"
                                            >
                                                Step {index + 1}: {step}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500">
                                            No steps available
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">No task data available.</p>
                    )}
                    <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 cursor-pointer"
                    >
                        Go back
                    </button>
                </div>
            </Animations>
        </div>
    );
}
