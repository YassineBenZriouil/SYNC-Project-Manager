import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Animations from "../utility/animations";
import {
    fetchProjectTasks,
    searchtaskByQuery,
    changetaskstate,
} from "../connection/tasksDB";
import { fetchProjectWorkFlow } from "../connection/projectDB";
import { Link, useParams } from "react-router-dom";
import Btn from "../utility/btn";
import XTaskCard from "./tasks/xtaskcard";
import Loading from "../utility/loading";

export default function MyTasks() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [workflow, setWorkflow] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [columnCount, setColumnCount] = useState(1);

    // Initial load: workflow and tasks
    useEffect(() => {
        const initialize = async () => {
            try {
                setLoading(true);
                const wf = await fetchProjectWorkFlow(projectId);
                setWorkflow(wf);
                setColumnCount(wf.length);

                const userTasks = await fetchProjectTasks(projectId);
                setTasks(userTasks);
                setInitialized(true);
            } catch (error) {
                console.error("Error initializing data:", error);
            } finally {
                setLoading(false);
            }
        };
        initialize();
    }, [projectId]);

    // Search functionality with debounce
    useEffect(() => {
        const performSearch = async () => {
            if (!initialized) return;
            try {
                setLoading(true);
                if (searchQuery === "") {
                    const userTasks = await fetchProjectTasks(projectId);
                    setTasks(userTasks);
                } else {
                    // Now passing projectId to searchtaskByQuery so filtering happens in Firestore
                    const searchedTasks = await searchtaskByQuery(searchQuery);
                    setTasks(searchedTasks);
                }
            } catch (error) {
                console.error("Error searching tasks:", error);
            } finally {
                setLoading(false);
            }
        };
        const timeoutId = setTimeout(performSearch, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, initialized, projectId]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        )
            return;

        const taskToMove = tasks.find((task) => task.id === draggableId);
        if (!taskToMove) return;

        const newTasks = tasks.map((task) =>
            task.id === draggableId
                ? { ...task, state: destination.droppableId }
                : task
        );
        setTasks(newTasks);

        try {
            await changetaskstate(draggableId, destination.droppableId);
        } catch (error) {
            console.error("Error updating task state:", error);
            setTasks(tasks);
            alert("Failed to update task. Please try again.");
        }
    };

    const getTasksByState = (state) =>
        tasks.filter((task) => task.state === state);
    const getColumnStyle = (state, index) => ({
        borderLeft: `4px solid rgba(251, 191, 36, ${0.7 + index * 0.1})`,
        minHeight: "250px",
    });
    const getTaskCount = (state) => getTasksByState(state).length;

    return (
        <div className="min-h-screen w-full flex justify-center bg-blue-400 dark:bg-blue-950 text-blue-950 dark:text-blue-400 p-3">
            <Animations>
                <div className="border border-amber-400 rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto space-y-5 relative">
                    <div className="flex items-center justify-between mb-6 border-b border-amber-400 pb-4">
                        <h1 className="text-3xl font-bold tracking-tight">
                            MY TASKS
                        </h1>
                        <Link
                            to={`/xaddtask/${projectId}`}
                            className="inline-block"
                        >
                            <Btn in="New Task" />
                        </Link>
                    </div>
                    <div className="mb-8 w-full">
                        <div className="relative w-full">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-blue-950">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <input
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search Tasks By Name or Description ..."
                                type="text"
                                className="w-full p-3 pl-10 bg-blue-950 dark:bg-blue-400 text-blue-400 dark:text-blue-950 rounded border border-amber-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="mt-8 w-full">
                        {loading ? (
                            <div className="flex justify-center items-center text-amber-400 h-64">
                                <Loading />
                            </div>
                        ) : (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {workflow.map((state, index) => (
                                        <Droppable
                                            key={state}
                                            droppableId={state}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={`p-4 bg-blue-950 dark:bg-blue-400 rounded-lg shadow-md transition-all ${
                                                        snapshot.isDraggingOver
                                                            ? "ring-2 ring-amber-400"
                                                            : ""
                                                    }`}
                                                    style={getColumnStyle(
                                                        state,
                                                        index
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h2 className="text-2xl text-blue-400 dark:text-blue-950  font-bold">
                                                            {state}
                                                        </h2>
                                                        <span className="bg-amber-400 text-blue-950 text-xs font-bold px-2 py-1 rounded-full">
                                                            {getTaskCount(
                                                                state
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {getTasksByState(
                                                            state
                                                        ).map((task, index) => (
                                                            <Draggable
                                                                key={task.id}
                                                                draggableId={
                                                                    task.id
                                                                }
                                                                index={index}
                                                            >
                                                                {(
                                                                    provided,
                                                                    snapshot
                                                                ) => (
                                                                    <div
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={` pt-3 rounded-lg transition-transform shadow-2xl ${
                                                                            snapshot.isDragging
                                                                                ? "transform scale-105 shadow-lg"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <XTaskCard
                                                                            task={
                                                                                task
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                </div>
                                            )}
                                        </Droppable>
                                    ))}
                                </div>
                            </DragDropContext>
                        )}
                    </div>
                </div>
            </Animations>
        </div>
    );
}
