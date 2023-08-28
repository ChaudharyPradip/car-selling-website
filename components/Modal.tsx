"use client";

import { useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { CarImage } from "@/common.types";

type Props = {
    setShowModal: (v: boolean) => void;
    handleFormChange: (field: string, value: string | CarImage[]) => void;
};

const Modal = ({ setShowModal, handleFormChange }: Props) => {
    const [property, setProperty] = useState("");

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
                    type="submit"
                    handleClick={addProperty}
                    bgColor="bg-accent"
                    title="Add property"
                    disabled={property === ""}
                    rightIcon="/plus.svg"
                />
            </form>
        </div>
    );
};

export default Modal;
