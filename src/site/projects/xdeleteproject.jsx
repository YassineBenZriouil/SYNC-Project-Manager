import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteprojectHandler } from "../../connection/projectDB";
import Animations from "../../utility/animations";
import Loading from "../../utility/loading";
import { toast } from "react-toastify";
import { customToast } from "../../utility/toast";

export default function Xdeleteproject() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = async () => {
        try {
            setIsDeleting(true);
            const result = await deleteprojectHandler(projectId);

            if (result === "NA") {
                console.log(result);
                navigate("/notallowed");
                return; // Exit early to avoid unnecessary checks
            }

            if (result.success) {
                customToast("Project Deleted Successfully", "success");
                navigate("/xprojects"); // No need for window reload
                window.location.reload();
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        } finally {
            setIsDeleting(false); // Ensure it's always reset
        }
    };

    const handleCancel = () => {
        customToast("deletion cancelled", "info");
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400 dark:bg-blue-950 text-blue-950 dark:text-blue-400">
            <div className="flex items-center justify-center w-full max-w-md m-3">
                <Animations>
                    <div className="border  border-amber-400 rounded-lg shadow-lg p-6 w-full">
                        <div className="text-red-600 dark:text-red-400 mb-4 text-5xl text-center">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>

                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Delete Project
                        </h2>

                        <p className=" mb-8 text-center">
                            Are you sure you want to delete this project? This
                            action cannot be undone.
                        </p>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="flex-1 bg-red-600 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                            >
                                {isDeleting ? (
                                    <Loading />
                                ) : (
                                    <>
                                        <i className="fa-solid fa-trash mr-2"></i>{" "}
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </Animations>
            </div>
        </div>
    );
}
