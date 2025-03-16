import React, { useEffect, useState } from "react";
import Animations from "../utility/animations";
import {
    fetchCurrentUserprojects,
    searchprojectByQuery,
} from "../connection/projectDB";
import { Link } from "react-router-dom";
import Btn from "../utility/btn";
import Xprojectcard from "./projects/xprojectcard";
import Loading from "../utility/loading";

export default function Myprojects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const userProjects = await fetchCurrentUserprojects();
                setProjects(userProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleSearch = async (query) => {
        try {
            setLoading(true);
            if (query === "") {
                const userProjects = await fetchCurrentUserprojects();
                setProjects(userProjects);
            } else {
                const searchedProjects = await searchprojectByQuery(query);
                setProjects(searchedProjects);
            }
        } catch (error) {
            console.error("Error searching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center bg-blue-400 dark:bg-blue-950 text-blue-950 dark:text-blue-400 p-3">
            <Animations>
                <div className="border border-amber-400 rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto space-y-5 relative ">
                    <div className="flex items-center mb-4 justify-center">
                        <h1 className="text-3xl font-bold">PROJECTS</h1>
                    </div>
                    <div className="text-center">
                        <div className="flex gap-3 items-center justify-center">
                            <Link to="/xaddproject" className="inline-block">
                                <Btn in="New Project" />
                            </Link>
                            <Link to="/xjoinproject" className="inline-block">
                                <Btn in="Join a Project" />
                            </Link>
                        </div>

                        <div className="mt-4 relative">
                            <input
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                                placeholder="Search Projects By Name or Description ..."
                                type="text"
                                className="w-full p-3 bg-blue-950 dark:bg-blue-400 text-blue-400 dark:text-blue-950 rounded "
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-blue-950 ">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 mt-8">
                        {loading ? (
                            <div className="flex justify-center items-center text-amber-400">
                                <Loading />
                            </div>
                        ) : projects.length > 0 ? (
                            projects.map((project) => (
                                <div
                                    className="border-t-2 border-amber-400 pt-3"
                                    key={project.id}
                                >
                                    <Xprojectcard project={project} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-amber-400">
                                <i className="fa-solid fa-folder-open text-4xl mb-2"></i>
                                <p className="text-lg">No projects found</p>
                            </div>
                        )}
                    </div>
                </div>
            </Animations>
        </div>
    );
}
