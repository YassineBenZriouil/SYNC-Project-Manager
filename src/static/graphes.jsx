import React from "react";
import { Link } from "react-router-dom";

export default function ProjectTable({ projects, copyProjectCode, toggleFavorite }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead>
                    <tr className="bg-blue-900 text-white">
                        <th className="p-3 text-left">Project Name</th>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-left">Created</th>
                        <th className="p-3 text-left">Workflow</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <tr key={project.id} className="border-t border-gray-300 dark:border-gray-700">
                                <td className="p-3">{project.projectName || "Untitled Project"}</td>
                                <td className="p-3">{project.description || "No description available"}</td>
                                <td className="p-3">{project.createdAt?.seconds ? new Date(project.createdAt.seconds * 1000).toLocaleDateString() : "No date"}</td>
                                <td className="p-3">{project.workflow?.length ? project.workflow.join(", ") : "No workflow"}</td>
                                <td className="p-3 flex gap-2">
                                    <Link to={`/xtasks/${project.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Open</Link>
                                    <Link to={`/xeditproject/${project.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</Link>
                                    <button onClick={(e) => copyProjectCode(project.id, e)} className="bg-green-500 text-white px-3 py-1 rounded">Copy Code</button>
                                    <Link to={`/xdeleteproject/${project.id}`} className="bg-red-600 text-white px-3 py-1 rounded">Delete</Link>
                                    <button onClick={() => toggleFavorite(project.id)} className="bg-gray-100 text-gray-400 px-3 py-1 rounded">
                                        <i className="fa-solid fa-star"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center p-5 text-gray-500">No projects found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
