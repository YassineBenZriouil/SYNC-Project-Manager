import {
    collection,
    query,
    getDocs,
    getFirestore,
    getDoc,
    doc,
    where,
} from "firebase/firestore";

const db = getFirestore();

export const fetchingUserUIDByEmail = async () => {
    const email = localStorage.getItem("loggedInUser");
    if (!email) {
        console.log("No email found in local storage");
        return null;
    }

    const usersRef = collection(db, "Users");
    const userQuery = query(usersRef, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
        console.log("No user found for this email");
        return null;
    }
    // console.log(userSnapshot.docs[0].id);
    return userSnapshot.docs[0].id;
};

export const UserIsCreator_P = async (projectId) => {
    console.log(projectId);
    try {
        const projectDoc = await getDoc(doc(db, "Projects", projectId));
        if (projectDoc.exists()) {
            const projectData = projectDoc.data();
            const creator = projectData.creator;
            const currentUser = await fetchingUserUIDByEmail();
            if (!currentUser) {
                throw new Error("No user is currently logged in.");
            }
            const formattedCurrentUser = `/Users/${currentUser}`;
            const userIsCreator = creator === formattedCurrentUser;
            console.log("Is creator?", userIsCreator);
            return userIsCreator;
        } else {
            throw new Error("Project not found");
        }
    } catch (error) {
        console.error("Error checking if user is creator:", error);
        throw error;
    }
};

export const UserIsCreator_T = async (taskId) => {
    console.log(taskId);
    try {
        const taskDoc = await getDoc(doc(db, "Tasks", taskId));
        if (taskDoc.exists()) {
            const taskData = taskDoc.data();
            const creator = taskData.creator;
            const currentUser = await fetchingUserUIDByEmail();
            if (!currentUser) {
                throw new Error("No user is currently logged in.");
            }
            const formattedCurrentUser = `/Users/${currentUser}`;
            const userIsCreator = creator === formattedCurrentUser;
            console.log("Is creator?", userIsCreator);
            return userIsCreator;
        } else {
            throw new Error("task not found");
        }
    } catch (error) {
        console.error("Error checking if user is creator:", error);
        throw error;
    }
};

export const fetchTotalCollabs = async () => {
    const userUID = await fetchingUserUIDByEmail();
    if (!userUID) {
        throw new Error("No user is currently logged in.");
    }

    // Fetch projects where the user is the creator
    const reformatedRefrence = `/Users/${userUID}`;
    const projectsRef = collection(db, "Projects");
    const projectsQuery = query(
        projectsRef,
        where("creator", "==", reformatedRefrence)
    );
    const projectsSnapshot = await getDocs(projectsQuery);

    let totalCollabs = 0;

    // Iterate through each project document
    projectsSnapshot.forEach((projectDoc) => {
        const projectData = projectDoc.data();

        // Count only the 'collabs' list if it exists and is an array
        if (Array.isArray(projectData.collabs)) {
            totalCollabs += projectData.collabs.length;
        }
    });

    return totalCollabs;
};

export const fetchTotalProjects = async () => {
    const userUID = await fetchingUserUIDByEmail();
    if (!userUID) {
        throw new Error("No user is currently logged in.");
    }

    const reformatedReference = `/Users/${userUID}`;
    const projectsRef = collection(db, "Projects");

    // Query for projects where user is the creator
    const creatorQuery = query(
        projectsRef,
        where("creator", "==", reformatedReference)
    );

    // Query for projects where user is in the "collabs" list
    const collabQuery = query(
        projectsRef,
        where("collabs", "array-contains", reformatedReference)
    );

    // Fetch both query snapshots
    const [creatorSnapshot, collabSnapshot] = await Promise.all([
        getDocs(creatorQuery),
        getDocs(collabQuery),
    ]);

    // Get the total unique projects (avoid double counting)
    const uniqueProjectIds = new Set();

    creatorSnapshot.forEach((doc) => uniqueProjectIds.add(doc.id));
    collabSnapshot.forEach((doc) => uniqueProjectIds.add(doc.id));

    return uniqueProjectIds.size;
};

export const fetchTotalTasks = async () => {
    const userUID = await fetchingUserUIDByEmail();
    if (!userUID) {
        throw new Error("No user is currently logged in.");
    }

    const reformatedReference = `/Users/${userUID}`;
    const tasksRef = collection(db, "Tasks");

    // Query for tasks where user is the creator
    const creatorQuery = query(
        tasksRef,
        where("creator", "==", reformatedReference)
    );

    // Fetch query snapshot
    const creatorSnapshot = await getDocs(creatorQuery);

    console.log(creatorSnapshot.size);
    return creatorSnapshot.size;
};
