"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { CarImage } from "@/common.types";

type Props = {
    setShowModal: (v: boolean) => void;
    handleFormChange: (field: string, value: string | CarImage[]) => void;
};

const Modal = ({ setShowModal, handleFormChange }: Props) => {
    const [property, setProperty] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Tab") {
                event.preventDefault();

                const activeElement = document.activeElement;
                if (activeElement === inputRef.current && buttonRef.current) {
                    buttonRef.current.focus();
                } else if (
                    activeElement === buttonRef.current &&
                    inputRef.current
                ) {
                    inputRef.current.focus();
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const addProperty = () => {
        handleFormChange(property.toLowerCase(), "");
        setShowModal(false);
    };

    return (
        <div
            className="fixed h-full w-full top-0 left-0 bg-black bg-opacity-20 grid place-items-center p-4 z-10"
            onClick={() => setShowModal(false)}
        >
            <form
                className="bg-white p-4 w-full max-w-md max-h-[500px] rounded-lg flex flex-col gap-5"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h2 className="text-center mb-6">Add new Property</h2>
                <FormField
                    ref={inputRef}
                    title="Property name"
                    type="text"
                    placeholder="property name"
                    state={property}
                    setState={(value) => {
                        setProperty(value);
                    }}
                    showLabel={true}
                />
                <Button
                    ref={buttonRef}
                    type="submit"
                    handleClick={addProperty}
                    title="Add property"
                    disabled={property === ""}
                    rightIcon="/plus.svg"
                />
            </form>
        </div>
    );
};

export default Modal;
