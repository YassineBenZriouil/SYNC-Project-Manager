import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    fetchprojectById,
    editprojectHandler,
} from "../../connection/projectDB";
import { customToast } from "../../utility/toast";
import Animations from "../../utility/animations";
import Loading from "../../utility/loading";

export default function Xeditproject() {
    const { projectId } = useParams();
    const [projectData, setprojectData] = useState({
        projectName: "",
        description: "",
        workflow: [],
        createdAt: new Date(),
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

    useEffect(() => {
        const fetchprojectData = async () => {
            try {
                const data = await fetchprojectById(projectId);
                if (data) {
                    setprojectData(data);
                } else {
                    customToast("Project not found", "error");
                    navigate("/xprojects");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                customToast("Error loading project data", "error");
            }
        };

        fetchprojectData();
    }, [projectId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setprojectData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleWorkflowChange = (item, isChecked) => {
        if (isChecked) {
            setprojectData((prev) => ({
                ...prev,
                workflow: [...prev.workflow, item],
            }));
        } else {
            setprojectData((prev) => ({
                ...prev,
                workflow: prev.workflow.filter((x) => x !== item),
            }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!projectData.workflow || projectData.workflow.length === 0) {
            customToast("Please select at least one workflow state", "error");
            return;
        }

        try {
            const result = await editprojectHandler(projectId, projectData);

            if (result === "NA") {
                console.log("User is not allowed");
                navigate("/notallowed");
                return;
            }

            if (result.success) {
                customToast(result.message, "success");
                navigate("/xprojects");
            } else {
                customToast(result.message, "error");
            }
        } catch (error) {
            console.error("Unexpected error updating project:", error);
            customToast("Failed to update project", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        customToast("Updating canceled", "info");

        navigate(-1);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-blue-400 dark:bg-blue-950 text-blue-950 dark:text-blue-400 p-5">
            <Animations>
                <div className="flex items-center justify-center w-full ">
                    <div className="bg-blue-950 text-blue-400 rounded-lg shadow-lg p-5 w-full space-y-6 border border-amber-400">
                        <h1 className="text-3xl font-bold text-center">
                            Edit Project
                        </h1>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
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
                                    value={projectData.projectName || ""}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
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
                                    value={projectData.description || ""}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
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
                                                checked={
                                                    projectData.workflow?.includes(
                                                        item.name
                                                    ) || false
                                                }
                                                onChange={(e) =>
                                                    handleWorkflowChange(
                                                        item.name,
                                                        e.target.checked
                                                    )
                                                }
                                                className="rounded text-amber-400 focus:ring-amber-400 border-amber-400"
                                            />
                                            <label
                                                htmlFor={`workflow-${index}`}
                                                className="text-sm gap-3"
                                            >
                                                {item.number} : {item.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    type="submit"
                                    disabled={loading} // Disable button when loading
                                >
                                    {loading ? <Loading /> : "Edit Project"}
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
