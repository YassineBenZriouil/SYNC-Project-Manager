import React, { useState } from "react";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Animations from "../utility/animations";
import { customToast } from "../utility/toast.jsx";
import Loading from "../utility/loading";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent duplicate clicks
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "Users", user.uid), { userName, email });

            customToast("User registered successfully", "success");
            navigate("/login");
        } catch (error) {
            console.error("User registration failed:", error.message);
            customToast(
                error.code === "auth/email-already-in-use"
                    ? "Email already in use, please use another email"
                    : "User registration failed",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-blue-400 text-blue-950 dark:bg-blue-950 dark:text-blue-400">
            <Animations>
                <div className="min-h-screen flex items-center justify-center px-6 py-16">
                    <div className="bg-blue-950/10 dark:bg-blue-400/10 border-2 border-amber-400 p-8 rounded-lg shadow-lg w-full max-w-md text-center transition-all duration-300 hover:shadow-2xl hover:bg-blue-950/20 dark:hover:bg-blue-400/20">
                        <h1 className="text-3xl font-bold mb-6">Register</h1>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="text-left">
                                <label className="block text-sm font-medium mb-1">
                                    User Name:
                                </label>
                                <input
                                    className="w-full bg-blue-950/10 dark:bg-blue-400/10 text-blue-950 dark:text-blue-400 border border-amber-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    type="text"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="text-left">
                                <label className="block text-sm font-medium mb-1">
                                    Email:
                                </label>
                                <input
                                    className="w-full bg-blue-950/10 dark:bg-blue-400/10 text-blue-950 dark:text-blue-400 border border-amber-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="text-left">
                                <label className="block text-sm font-medium mb-1">
                                    Password:
                                </label>
                                <input
                                    className="w-full bg-blue-950/10 dark:bg-blue-400/10 text-blue-950 dark:text-blue-400 border border-amber-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <button
                                className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold py-2 px-4 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <Loading /> : "Register"}
                            </button>
                        </form>
                        <p className="text-sm mt-4">
                            Already have an account?{" "}
                            <Link
                                className="text-amber-400 hover:underline"
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </Animations>
        </div>
    );
}
