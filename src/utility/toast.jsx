import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export const customToast = (message, type = "default") => {
    toast(message, { type });
};
