import React, { useEffect, useState } from "react";
import Animations from "../utility/animations";
import Btn from "../utility/btn";
import {
    fetchTotalCollabs,
    fetchTotalProjects,
    fetchTotalTasks,
} from "../connection/userDB";
import { Link } from "react-router-dom";

export default function Home() {
    const [totalCollabers, setTotalCollabers] = useState(0);
    const [totalProjects, setTotalProjects] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);

    const totalFinishedTasks = Math.floor(Math.random() * 100) + 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [collabs, projects, tasks] = await Promise.all([
                    fetchTotalCollabs(),
                    fetchTotalProjects(),
                    fetchTotalTasks(),
                ]);
                setTotalCollabers(collabs);
                setTotalProjects(projects);
                setTotalTasks(tasks); // ✅ Fixed
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const taskCompletionPercentage =
        totalTasks > 0
            ? Math.round((totalFinishedTasks / totalTasks) * 100)
            : 0; // ✅ Prevent NaN

    return (
        <div className="bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400 min-h-screen flex flex-col">
            <Animations>
                <div className="flex-grow">
                    <div className="relative overflow-hidden">
                        <div className="pt-16 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                                <i className="fas fa-chart-line mr-3"></i>
                                Dashboard
                            </h1>
                            <p className="text-lg md:text-xl text-center opacity-80">
                                <i className="fas fa-users mr-2"></i>
                                Your collaborative workspace at a glance
                            </p>
                        </div>
                    </div>
                    <div className="px-4 py-8 md:px-12 max-w-7xl mx-auto -mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {[
                                {
                                    label: "Total Collaborators",
                                    icon: "fa-user-friends",
                                    value: totalCollabers,
                                },
                                {
                                    label: "Total Projects",
                                    icon: "fa-project-diagram",
                                    value: totalProjects,
                                },
                                {
                                    label: "Total Tasks",
                                    icon: "fa-tasks",
                                    value: totalTasks,
                                },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-blue-300 dark:bg-blue-800 rounded-xl shadow-xl p-6 border-2 border-amber-400"
                                >
                                    <h2 className="text-lg font-semibold opacity-70">
                                        <i
                                            className={`fas ${stat.icon} mr-2`}
                                        ></i>
                                        {stat.label}
                                    </h2>
                                    <p className="text-4xl font-bold mt-2">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Quick actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link to={`/xaddproject`}>
                                <Btn in="Create New Project"></Btn>
                            </Link>
                            <Link to={`/xjoinproject`}>
                                <Btn in="Join a project"></Btn>
                            </Link>
                        </div>
                    </div>
                </div>
            </Animations>
        </div>
    );
}
