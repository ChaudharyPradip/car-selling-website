"use client";

import { ToastContainer } from "react-toastify";

const ToastNotification = () => {
    return (
        <ToastContainer position="top-center" autoClose={2000} theme="light" />
    );
};

export default ToastNotification;
