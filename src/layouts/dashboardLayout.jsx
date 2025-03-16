import React from "react";
import { Routes, Route } from "react-router-dom";
import { AliveScope, KeepAlive } from "react-activation";

import Nav from "../site/nav.jsx";
import Notallowed from "../site/notAllowed.jsx";

import XHome from "../site/xhome.jsx";
import XProjects from "../site/xprojects.jsx";
import Xtasks from "../site/xtasks.jsx";

import Xaddproject from "../site/projects/xaddproject.jsx";
import Xeditproject from "../site/projects/xeditproject.jsx";
import Xdeleteproject from "../site/projects/xdeleteproject.jsx";
import Xjoinproject from "../site/projects/xjoinproject.jsx";

import Xaddtask from "../site/tasks/xaddtask.jsx";
import Xdeletetask from "../site/tasks/xdeletetask.jsx";
import Xedittask from "../site/tasks/xedittask.jsx";
import Xtaskinside from "../site/tasks/xtaskinside.jsx";

const DashboardLayout = ({ children, theme, setTheme }) => {
    return (
        <div className="flex min-h-screen w-full overflow-x-hidden">
            <Nav theme={theme} setTheme={setTheme} />
            <div className="flex-1">
                <AliveScope>
                    <Routes>
                        <Route path="/" element={<XHome />} />
                        <Route
                            path="/xprojects"
                            element={
                                <KeepAlive>
                                    <XProjects />
                                </KeepAlive>
                            }
                        />
                        <Route path="/xaddproject" element={<Xaddproject />} />
                        <Route
                            path="/xeditproject/:projectId"
                            element={<Xeditproject />}
                        />
                        <Route
                            path="/xdeleteproject/:projectId"
                            element={<Xdeleteproject />}
                        />
                        <Route path="/xtasks/:projectId" element={<Xtasks />} />
                        <Route
                            path="/xaddtask/:projectId"
                            element={<Xaddtask />}
                        />
                        <Route
                            path="/xdeletetask/:taskId"
                            element={<Xdeletetask />}
                        />
                        <Route
                            path="/xedittask/:taskId"
                            element={<Xedittask />}
                        />
                        <Route
                            path="/xjoinproject"
                            element={<Xjoinproject />}
                        />
                        <Route path="/notallowed" element={<Notallowed />} />

                        <Route
                            path="/xtaskinside/:taskId"
                            element={<Xtaskinside />}
                        />
                    </Routes>
                </AliveScope>
            </div>
        </div>
    );
};

export default DashboardLayout;
