// Fixed Xaddproject component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinproject } from "../../connection/projectDB"; // Updated function name
import { fetchingUserUIDByEmail } from "../../connection/userDB";
import { customToast } from "../../utility/toast";
import Animations from "../../utility/animations";
import Btn from "../../utility/btn";

export default function Xaddproject() {
    const navigate = useNavigate();
    const [code, setCode] = useState(""); // Initialize with empty string

    const handleInputChange = (e) => {
        setCode(e.target.value); // Update only the code state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userUID = await fetchingUserUIDByEmail(); // Get user UID
            await joinproject(code, userUID); // Call joinProject with the correct parameters
            setCode(""); // Clear the code input
            customToast("Joined successfully!", "success"); // Display success message
            navigate("/xprojects"); // Ensure correct route navigation
            window.location.reload();
        } catch (error) {
            console.error("Error joining project: ", error);
            customToast("Failed to join the project.", "error"); // Display error message
        }
    };

    const handleCancel = () => {
        customToast("Joining cancelled", "info");
        navigate(-1);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-blue-400 dark:bg-blue-950 text-blue-950 dark:text-blue-400 p-5">
            <Animations>
                <div className="flex items-center justify-center w-full">
                    <div className="bg-blue-950 text-blue-400 rounded-lg shadow-lg p-5 w-full space-y-6 border border-amber-400">
                        <h1 className="text-3xl font-bold text-center">
                            Join a Project
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    htmlFor="code"
                                >
                                    Project Code
                                </label>
                                <input
                                    name="code"
                                    id="code"
                                    value={code}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                    className="w-full bg-blue-950 text-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 border-2 border-amber-400"
                                />
                            </div>
                            <Btn type="submit" in="Join"></Btn>
                        </form>
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Animations>
        </div>
    );
}
