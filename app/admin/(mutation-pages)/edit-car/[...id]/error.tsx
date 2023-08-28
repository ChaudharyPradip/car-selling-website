"use client";

import Button from "@/components/Button";
import Link from "next/link";

const error = ({ error }: { error: Error }) => {
    return (
        <div className="w-full h-full mt-48 sm:mt-0 sm:min-h-[60vh] grid place-items-center">
            <div className="-mt-36 flex flex-col gap-2 items-center">
                <h1 className="font-medium text-3xl">We guess you are lost</h1>
                <Link href="/admin">
                    {" "}
                    <Button
                        title="Go back"
                        bgColor="bg-accent"
                        fullWidth={false}
                    />{" "}
                </Link>
            </div>
        </div>
    );
};

export default error;
