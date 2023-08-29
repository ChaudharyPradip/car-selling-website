"use client";

import { useState, useRef } from "react";
import Button from "./Button";
import FormField from "./FormField";
import Modal from "./Modal";
import { Car, CarImage } from "@/common.types";

type Props = {
    form: Car;
    setForm: (value: Car) => void;
    handleFormChange: (field: string, value: string | CarImage[]) => void;
};

const FormFields = ({ form, setForm, handleFormChange }: Props) => {
    const [showModal, setShowModal] = useState(false);

    const removeField = (field: string) => {
        const { [field]: exclude, ...remaining } = form;
        setForm(remaining);
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
                        bgColor="bg-primary"
                        rightIcon="/plus.svg"
                    />
                </div>
            </div>
        </>
    );
};

export default FormFields;
