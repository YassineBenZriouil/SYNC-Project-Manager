import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import Animations from "../utility/animations";
import { customToast } from "../utility/toast";
import Btn from "../utility/btn";

export default function Logout() {
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const docSnap = await getDoc(doc(db, "Users", user.uid));
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                    } else {
                        console.warn("No user document found.");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("cart");
        customToast("Logged out successfully", "success");
        navigate("/register");
    };

    return (
        <div className="bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400">
            <Animations>
                <div className="min-h-screen flex items-center justify-center px-6 py-16">
                    <div className="bg-blue-950/10 dark:bg-blue-400/10 border-2 border-amber-400 p-8 rounded-lg shadow-lg w-full max-w-md text-center transition-all duration-300 hover:shadow-2xl hover:bg-blue-950/20 dark:hover:bg-blue-400/20">
                        <h3 className="text-2xl font-bold">
                            Welcome to {import.meta.env.VITE_PROJECT_NAME_SHORT}
                        </h3>
                        <h5 className="text-lg font-medium mt-2">
                            {userDetails.userName || "No name found"}
                        </h5>
                        <p className="text-sm mb-4">
                            Email: {userDetails.email || "No email found"}
                        </p>
                        <Btn in="Logout" onClick={handleLogout} />
                    </div>
                </div>
            </Animations>
        </div>
    );
}
