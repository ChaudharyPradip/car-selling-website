"use client";

import React from "react";
import Image from "next/image";
import Button from "./Button";
import { toast } from "react-toastify";
import { logout } from "@/lib/actions";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await toast.promise(logout(), {
                pending: "Logging out",
                success: "Logged out successfully",
                error: "Error logging out"
            });
            router.push("/admin/login");
        } catch (error) {}
    };

    return (
        <div className="flex flex-col gap-5 justify-between items-center py-5 sm:flex-row">
            <Image src="/logo.png" width={300} height={120} alt="logo" />
            <Button
                handleClick={handleLogout}
                title="Log out"
                rightIcon="/login-logout.svg"
            />
        </div>
    );
};

export default AdminNavbar;
