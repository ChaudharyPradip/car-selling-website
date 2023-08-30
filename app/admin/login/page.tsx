"use client";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { login } from "@/lib/actions";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setLoginDetails((oldValue) => ({ ...oldValue, [field]: value }));
    };

    const handleLogin: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            await toast.promise(login(loginDetails), {
                pending: "Logging in",
                success: "Logged In successfully",
                error: "Invalid username or password"
            });
            router.push("/admin");
        } catch (error) {}
    };

    return (
        <section className="grid place-items-center h_full_dvh">
            <form
                className="flex flex-col gap-10 text-center"
                onSubmit={handleLogin}
            >
                <div>
                    <h3 className="text-black">Log in to admin panel</h3>
                </div>
                <div className="flex flex-col gap-4">
                    <FormField
                        type="text"
                        title="username"
                        state={loginDetails.username}
                        showLabel={false}
                        placeholder="username"
                        setState={(value) =>
                            handleInputChange("username", value)
                        }
                    />
                    <FormField
                        type="password"
                        title="password"
                        state={loginDetails.password}
                        showLabel={false}
                        placeholder="password"
                        setState={(value) =>
                            handleInputChange("password", value)
                        }
                    />
                </div>
                <div>
                    <Button
                        disabled={
                            loginDetails.username === "" ||
                            loginDetails.password === ""
                        }
                        title="Log in"
                        textColor="text-white"
                        type="submit"
                        fullWidth={true}
                        rightIcon="/login-logout.svg"
                    />
                </div>
            </form>
        </section>
    );
};

export default Login;
