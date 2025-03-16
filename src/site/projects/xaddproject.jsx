import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addprojecthandler } from "../../connection/projectDB";
import { fetchingUserUIDByEmail } from "../../connection/userDB";
import { customToast } from "../../utility/toast";
import Animations from "../../utility/animations";
import Btn from "../../utility/btn";
import Loading from "../../utility/loading"; // Add your loading component here

export default function Xaddproject() {
    const [projectData, setProjectData] = useState({
        projectName: "",
        description: "",
        workflow: [],
    });
    const [loading, setLoading] = useState(false);

    const workflowlist = [
        { number: 1, name: "To Do" },
        { number: 2, name: "In Progress" },
        { number: 3, name: "Testing" },
        { number: 4, name: "In Review" },
        { number: 5, name: "Done" },
        { number: 6, name: "Archived" },
    ];

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleWorkflowChange = (item, isChecked) => {
        setProjectData((prev) => ({
            ...prev,
            workflow: isChecked
                ? [...prev.workflow, item]
                : prev.workflow.filter((x) => x !== item),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent duplicate submissions
        setLoading(true);

        const userUID = await fetchingUserUIDByEmail();

        if (!userUID) {
            customToast("Please Login First", "error");
            setLoading(false);
            return;
        }

        if (projectData.workflow.length < 2) {
            customToast("Please select at least Two workflow states", "error");
            setLoading(false);
            return;
        }

        const newProject = {
            ...projectData,
            creator: `/Users/${userUID}`,
            createdAt: new Date(),
        };

        try {
            await addprojecthandler(newProject);
            setProjectData({ projectName: "", description: "", workflow: [] });
            customToast("Project added successfully!", "success");
            navigate("/xprojects");
            window.location.reload();
        } catch (error) {
            console.error("Error adding project: ", error);
            customToast("Failed to add the project.", "error");
        } finally {
            setLoading(false); // Reset loading state
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
                            Add Project
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    htmlFor="projectName"
                                >
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    name="projectName"
                                    id="projectName"
                                    value={projectData.projectName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                    disabled={loading} // Disable input when loading
                                />
                            </div>
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
                                    value={projectData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                    disabled={loading} // Disable input when loading
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Workflow States
                                </label>
                                <p className="mb-2 text-amber-400">
                                    The Order Is Important
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {workflowlist.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`workflow-${index}`}
                                                checked={projectData.workflow.includes(
                                                    item.name
                                                )}
                                                onChange={(e) =>
                                                    handleWorkflowChange(
                                                        item.name,
                                                        e.target.checked
                                                    )
                                                }
                                                className="rounded text-amber-400 focus:ring-amber-400 border-amber-400"
                                                disabled={loading} // Disable when loading
                                            />
                                            <label
                                                htmlFor={`workflow-${index}`}
                                                className="text-sm"
                                            >
                                                {item.number} : {item.name}{" "}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                type="submit"
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? <Loading /> : "Add Project"}
                            </button>
                        </form>
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 cursor-pointer"
                        >
                            Cancel{" "}
                        </button>
                    </div>
                </div>
            </Animations>
        </div>
    );
}
