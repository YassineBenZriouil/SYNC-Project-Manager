import {
    collection,
    addDoc,
    getFirestore,
    deleteDoc,
    doc,
    query,
    where,
    getDocs,
    updateDoc,
    getDoc,
} from "firebase/firestore";

import { fetchingUserUIDByEmail, UserIsCreator_T } from "./userDB";
import { fetchProjectWorkFlow } from "./projectDB";
const db = getFirestore();

export const addtaskhandler = async (task, projectId) => {
    try {
        const TasksRef = collection(db, "Tasks");
        const workflow = await fetchProjectWorkFlow(projectId);

        if (!workflow || workflow.length === 0) {
            throw new Error("Workflow is empty or undefined.");
        }

        const firstState = workflow[0];

        const taskWithState = {
            ...task,
            state: firstState,
        };

        const docRef = await addDoc(TasksRef, taskWithState);
        return docRef.id; // Return the task ID if needed
    } catch (error) {
        console.error("Error adding task:", error);
        throw error; // Re-throw for higher-level handling
    }
};

export const fetchProjectTasks = async (projectId) => {
    const userUID = await fetchingUserUIDByEmail();
    if (!userUID) {
        console.log("No user found for the provided email");
        return [];
    }

    try {
        // Check if projectId is valid
        if (!projectId) {
            console.log("No project ID provided");
            return [];
        }

        // Create a collection reference to "Tasks" collection
        const tasksCollectionRef = collection(db, "Tasks");

        // Create a query to filter tasks by project reference
        const q = query(
            tasksCollectionRef,
            where("project", "==", `Projects/${projectId}`)
        );

        // Execute the query
        const taskSnapshot = await getDocs(q);

        if (taskSnapshot.empty) {
            console.log("No tasks found for this project");
            return [];
        }

        // Map the documents to an array of tasks with their IDs
        const tasksArray = taskSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return tasksArray;
    } catch (error) {
        console.error("Error fetching tasks for project:", error);
        return [];
    }
};

export const searchtaskByQuery = async (searchQuery) => {
    const TasksRef = collection(db, "Tasks");
    const TasksSnapshot = await getDocs(TasksRef);
    return TasksSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
            (Task) =>
                Task.taskName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                Task.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
};

export const deletetaskHandler = async (TaskId) => {
    if (!TaskId) {
        return { success: false, message: "Invalid Task ID" };
    }

    try {
        const Allowed = await UserIsCreator_T(TaskId);
        if (!Allowed) {
            return "NA";
        }

        const TaskRef = doc(db, "Tasks", TaskId);
        await deleteDoc(TaskRef);

        return { success: true, message: "Task deleted successfully" };
    } catch (error) {
        console.error("Error deleting task:", error);
        return { success: false, message: error.message };
    }
};

export const edittaskHandler = async (taskId, updatedTask) => {
    if (!taskId || typeof updatedTask !== "object") {
        return { success: false, message: "Invalid task data" };
    }

    try {
        const Allowed = await UserIsCreator_T(taskId);
        if (!Allowed) {
            return {
                success: false,
                message: "Unauthorized to edit this task",
            };
        }

        const taskRef = doc(db, "Tasks", taskId);
        await updateDoc(taskRef, updatedTask);

        return { success: true, message: "Task updated successfully" };
    } catch (error) {
        console.error("Error updating task:", error);
        return { success: false, message: error.message };
    }
};

export const fetchtaskById = async (taskId) => {
    const projectRef = doc(db, "Tasks", taskId);
    const projectSnapshot = await getDoc(projectRef);
    return projectSnapshot.exists() ? projectSnapshot.data() : null;
};

export const changetaskstate = async (taskId, state) => {
    const Editor = localStorage.getItem("loggedInUser");
    const taskRef = doc(db, "Tasks", taskId);

    try {
        await updateDoc(taskRef, {
            state: state,
            EditedBy: Editor, // Add the "EditedBy" field in the same object
        });
    } catch (error) {
        console.error("Error updating task state:", error);
    }
};
