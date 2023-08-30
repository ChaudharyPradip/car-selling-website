"use client";

import { Car, CarImage } from "@/common.types";
import { useState } from "react";
import Button from "./Button";
import FormField from "./FormField";
import Modal from "./Modal";

type Props = {
    form: Car;
    setForm: (value: Car) => void;
    handleFormChange: (field: string, value: string | CarImage[]) => void;
};

const FormFields = ({ form, setForm, handleFormChange }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [removingField, setRemovingField] = useState<string | null>(null);

    const removeField = (field: string) => {
        setRemovingField(field);
        setTimeout(() => {
            const { [field]: exclude, ...remaining } = form;
            setForm(remaining);
            setRemovingField(null);
        }, 300);
    };

    return (
        <>
            {showModal && (
                <Modal
                    setShowModal={setShowModal}
                    handleFormChange={handleFormChange}
                />
            )}
            <div className="flex flex-col gap-5">
                <div className="form_grid">
                    {Object.keys(form)
                        .filter((key) => key !== "images")
                        .map((key) =>
                            key === "name" ? (
                                <FormField
                                    className={`${
                                        removingField === key
                                            ? "-translate-x-full sm:translate-x-0 sm:scale-0 sm:opacity-0"
                                            : "translate-x-0"
                                    } transition-all duration-300 transform`}
                                    key={key}
                                    title="name"
                                    placeholder="name of Car"
                                    setState={(value) =>
                                        handleFormChange(`${key}`, value)
                                    }
                                    showLabel={true}
                                    state={form[key] as string}
                                    isRemovable={true}
                                    removeField={removeField}
                                />
                            ) : key === "price" ? (
                                <FormField
                                    className={`${
                                        removingField === key
                                            ? "-translate-x-full sm:translate-x-0 sm:scale-0 sm:opacity-0"
                                            : "translate-x-0"
                                    } transition-all duration-300 transform`}
                                    key={key}
                                    title="price"
                                    type="number"
                                    placeholder="price of Car"
                                    setState={(value) =>
                                        handleFormChange(`${key}`, value)
                                    }
                                    showLabel={true}
                                    state={form[key] as string}
                                    isRemovable={true}
                                    removeField={removeField}
                                />
                            ) : (
                                <FormField
                                    className={`${
                                        removingField === key
                                            ? "-translate-x-full sm:translate-x-0 sm:scale-0 sm:opacity-0"
                                            : "translate-x-0"
                                    } transition-all duration-300 transform`}
                                    key={key}
                                    title={key}
                                    type="text"
                                    placeholder={key}
                                    setState={(value) =>
                                        handleFormChange(`${key}`, value)
                                    }
                                    showLabel={true}
                                    state={form[key] as string}
                                    isRemovable={true}
                                    removeField={removeField}
                                />
                            )
                        )}
                </div>
                <div className="w-max self-center">
                    <Button
                        handleClick={() => {
                            setShowModal(true);
                        }}
                        title="Add Field"
                        rightIcon="/plus.svg"
                    />
                </div>
            </div>
        </>
    );
};

export default FormFields;
