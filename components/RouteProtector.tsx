"use client";

import { isLoggedIn } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RouteProtector = () => {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const loggedIn = await isLoggedIn();
                if (!loggedIn) router.push("/admin/login");
            } catch (error) {
                router.push("/admin/login");
            }
        };
        checkSession();
    }, []);

    return <></>;
};

export default RouteProtector;
