import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addtaskhandler } from "../../connection/tasksDB";
import { fetchingUserUIDByEmail } from "../../connection/userDB";
import { customToast } from "../../utility/toast";
import Animations from "../../utility/animations";
import Loading from "../../utility/loading";
import { useParams } from "react-router-dom";

export default function Xaddtask() {
    const { projectId } = useParams();
    const [loading, setLoading] = useState(false);

    console.log("task ID:", projectId);

    const [taskData, setTaskData] = useState({
        taskName: "",
        description: "",
        dueDate: "",
        details: "",
        steps: [""], // Array for multiple steps
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStepChange = (index, value) => {
        setTaskData((prev) => {
            const updatedSteps = [...prev.steps];
            updatedSteps[index] = value;
            return { ...prev, steps: updatedSteps };
        });
    };

    const addStep = () => {
        setTaskData((prev) => ({
            ...prev,
            steps: [...prev.steps, ""], // Add a new empty step
        }));
    };

    const removeStep = (index) => {
        setTaskData((prev) => ({
            ...prev,
            steps: prev.steps.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userUID = await fetchingUserUIDByEmail();

        if (!userUID) {
            customToast("Please Login First", "error");
            return;
        }

        const newTask = {
            ...taskData,
            creator: `/Users/${userUID}`,
            project: `Projects/${projectId}`,
            createdAt: new Date(),
        };

        try {
            await addtaskhandler(newTask, projectId);
            setTaskData({
                taskName: "",
                description: "",
                dueDate: "",
                details: "",
                steps: [""],
                createdAt: new Date(),
            });
            customToast("Task added successfully!", "success");
            navigate(`/xtasks/${projectId}`);
        } catch (error) {
            console.error("Error adding task: ", error);
            customToast("Failed to add the task.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        customToast("Adding cancelled", "info");
        navigate(-1);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-blue-400 dark:bg-blue-950 text-blue-950 dark:text-blue-400 p-5">
            <Animations>
                <div className="flex items-center justify-center w-full">
                    <div className="bg-blue-950 text-blue-400 rounded-lg shadow-lg p-5 w-full space-y-6 border border-amber-400">
                        <h1 className="text-3xl font-bold text-center">
                            Add Task
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Task Name */}
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
                                    value={taskData.taskName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            {/* Description */}
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
                                    value={taskData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            {/* Due Date */}
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
                                    value={taskData.dueDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            {/* Details */}
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
                                    value={taskData.details}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>

                            {/* Steps */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Steps
                                </label>
                                {taskData.steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2 mb-2"
                                    >
                                        <input
                                            type="text"
                                            value={step}
                                            onChange={(e) =>
                                                handleStepChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeStep(index)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addStep}
                                    className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                                >
                                    + Add Step
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <Loading /> : "Add Task"}
                            </button>
                        </form>

                        {/* Cancel Button */}
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
