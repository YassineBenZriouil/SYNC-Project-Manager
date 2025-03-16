import {
    collection,
    addDoc,
    getFirestore,
    deleteDoc,
    doc,
    updateDoc,
    arrayUnion,
    getDoc,
    query,
    where,
    getDocs,
    arrayRemove,
} from "firebase/firestore";

import { fetchingUserUIDByEmail, UserIsCreator_P } from "./userDB";

const db = getFirestore();

export const fetchCurrentUserprojects = async () => {
    const userUID = await fetchingUserUIDByEmail();
    if (!userUID) {
        console.log("No user found for the provided email");
        return [];
    }

    const userPath = `/Users/${userUID}`;
    const projectsRef = collection(db, "Projects");

    const creatorQuery = query(projectsRef, where("creator", "==", userPath));

    const collabsQuery = query(
        projectsRef,
        where("collabs", "array-contains", userPath)
    );

    // Execute both queries
    const [creatorSnapshot, collabsSnapshot] = await Promise.all([
        getDocs(creatorQuery),
        getDocs(collabsQuery),
    ]);

    // Combine results, avoiding duplicates using a Map with document IDs as keys
    const projectsMap = new Map();

    creatorSnapshot.docs.forEach((doc) => {
        projectsMap.set(doc.id, { id: doc.id, ...doc.data() });
    });

    collabsSnapshot.docs.forEach((doc) => {
        if (!projectsMap.has(doc.id)) {
            projectsMap.set(doc.id, { id: doc.id, ...doc.data() });
        }
    });

    return Array.from(projectsMap.values());
};

export const addprojecthandler = async (project) => {
    const projectsRef = collection(db, "Projects");
    await addDoc(projectsRef, project);
};

export const searchprojectByQuery = async (searchQuery) => {
    const projectsRef = collection(db, "Projects");
    const projectsSnapshot = await getDocs(projectsRef);
    return projectsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
            (project) =>
                project.projectName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
};

export const fetchprojectById = async (projectId) => {
    const projectRef = doc(db, "Projects", projectId);
    const projectSnapshot = await getDoc(projectRef);
    return projectSnapshot.exists() ? projectSnapshot.data() : null;
};

export const deleteprojectHandler = async (projectId) => {
    try {
        const Allowed = await UserIsCreator_P(projectId);

        if (!Allowed) {
            console.log("User is not authorized to delete this project");
            return "NA";
        }

        // If authorized, proceed with deletion
        const projectRef = doc(db, "Projects", projectId); // Ensure correct collection name
        await deleteDoc(projectRef);
        await deleteAllTasks(projectId);

        return { success: true, message: "Project deleted successfully" };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { success: false, message: error.message };
    }
};

export const deleteAllTasks = async (projectId) => {
    const reformattedProjectId = `Projects/${projectId}`;
    try {
        // Query for tasks belonging to the specific project
        const tasksCollectionRef = collection(db, "Tasks");
        const tasksQuery = query(
            tasksCollectionRef,
            where("project", "==", reformattedProjectId)
        );
        const querySnapshot = await getDocs(tasksQuery);

        // Delete each task document that matches the project ID
        const deletePromises = querySnapshot.docs.map((taskDoc) =>
            deleteDoc(doc(db, "Tasks", taskDoc.id))
        );

        await Promise.all(deletePromises);

        return {
            success: true,
            message: "All tasks for the project deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting tasks:", error);
        return { success: false, message: error.message };
    }
};

export const fetchProjectWorkFlow = async (projectId) => {
    try {
        const projectRef = doc(db, "Projects", projectId);
        const projectSnapshot = await getDoc(projectRef);

        if (!projectSnapshot.exists()) {
            console.log(`Project with ID ${projectId} not found.`);
            return [];
        }

        const workflowList = projectSnapshot.data().workflow || [];
        console.log("Fetched workflow:", workflowList);

        return workflowList;
    } catch (error) {
        console.error("Error fetching workflow:", error);
        return [];
    }
};

export const editprojectHandler = async (projectId, updatedProject) => {
    try {
        const allowed = await UserIsCreator_P(projectId);

        if (!allowed) {
            console.log("User is not authorized to edit this project");
            return "NA";
        }

        const projectRef = doc(db, "Projects", projectId);
        await updateDoc(projectRef, updatedProject);

        return { success: true, message: "Project updated successfully" };
    } catch (error) {
        console.error("Error updating project:", error);
        return { success: false, message: error.message };
    }
};

export const joinproject = async (code, User) => {
    try {
        const projectRef = doc(db, "Projects", code);
        await updateDoc(projectRef, {
            collabs: arrayUnion(`/Users/${User}`), // Using arrayUnion to add to array instead of overwriting
        });
        return true; // Add a return value for success
    } catch (error) {
        console.error("Error joining project: ", error);
        throw error; // Re-throw error for handling
    }
};

export const setFavoriteProjects = async (projectId) => {
    const userUID = await fetchingUserUIDByEmail();
    if (!userUID) {
        throw new Error("No user is currently logged in.");
    }

    const userRef = doc(db, "Users", userUID);

    try {
        const userDoc = await getDoc(userRef);
        const favProjects = userDoc.exists() ? userDoc.data().Fav || [] : [];

        const isAlreadyFav = favProjects.includes(projectId);
        await updateDoc(userRef, {
            Fav: isAlreadyFav
                ? arrayRemove(projectId) // Remove if already favorited
                : arrayUnion(projectId), // Add if not favorited
        });

        return !isAlreadyFav; // Returns true if added, false if removed
    } catch (error) {
        console.error("Error toggling favorite project: ", error);
        throw error;
    }
};

export const checkProjectFavoriteStatus = async (projectId) => {
    try {
        const userId = await fetchingUserUIDByEmail(); // Make sure to await this

        if (!userId) {
            console.error("No user ID found");
            return false;
        }

        // Get the user document
        const userRef = doc(db, "Users", userId);
        const userDoc = await getDoc(userRef);

        // Check if the user exists and has favorites
        if (userDoc.exists()) {
            const favProjects = userDoc.data().Fav || [];
            return favProjects.includes(projectId);
        }

        return false;
    } catch (error) {
        console.error("Error checking favorite status:", error);
        return false;
    }
};

export const fetchFavoriteProjects = async () => {
    try {
        const userUID = await fetchingUserUIDByEmail();
        if (!userUID) {
            throw new Error("No user is currently logged in.");
        }

        // Get user's favorite project IDs
        const userRef = doc(db, "Users", userUID);
        const userDoc = await getDoc(userRef);
        const favoriteProjectIds = userDoc.exists()
            ? userDoc.data().Fav || []
            : [];

        if (favoriteProjectIds.length === 0) {
            return []; // No favorites, return empty
        }

        // Fetch all user's projects
        const allProjects = await fetchCurrentUserprojects();

        // Filter only the favorite projects
        const favoriteProjects = allProjects.filter((project) =>
            favoriteProjectIds.includes(project.id)
        );

        console.log("Favorite projects:", favoriteProjects);
        return favoriteProjects;
    } catch (error) {
        console.error("Error fetching favorite projects:", error);
        return []; // Return empty array on error
    }
};
