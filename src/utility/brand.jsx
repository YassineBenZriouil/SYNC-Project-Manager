import React from "react";

export default function Brand() {
    return (
        <div className="flex flex-row items-center justify-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-110">
            <span className="bg-amber-400 h-1 w-8 rounded"></span>
            <h1 className="text-3xl font-bold text-blue-950 dark:text-blue-400">
                {import.meta.env.VITE_PROJECT_NAME_SHORT}
            </h1>
            <span className="bg-amber-400 h-1 w-8 rounded"></span>
        </div>
    );
}
