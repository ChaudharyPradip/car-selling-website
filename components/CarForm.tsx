"use client";

import { Car, CarImage } from "@/common.types";
import { addNewCar, editCar } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import FormFields from "./FormFields";
import FormImages from "./FormImages";

type Props = {
    type: "edit" | "create";
    id?: string;
    car?: Car;
};

let formSchema: Car = {
    images: [{ id: crypto.randomUUID(), url: "" }],
    name: "",
    price: "",
    year: "",
    version: "",
    colour: "",
    owner: "",
    "km travelled": "",
    "fuel type": "",
    "battery condition": "",
    "keys available": "",
    "music system": "",
    "tyres condition": "",
    "AC condition": "",
    "engine condition": "",
    "glasses condition": ""
};

const CarForm = ({ type, car, id }: Props) => {
    let initialForm;
    if (type === "edit" && car) {
        initialForm = { ...formSchema };
        for (const key in car) {
            if (key !== "_id" && key !== "__v") {
                initialForm[key] = car[key];
            }
        }
        for (const key in initialForm) {
            if (!(key in car)) {
                delete initialForm[key];
            }
        }
    } else {
        initialForm = formSchema;
    }

    const [form, setForm] = useState<Car>(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleFormChange = (field: string, value: string | CarImage[]) => {
        setForm((oldValue) => ({ ...oldValue, [field]: value }));
    };

    const isEmpty = (str: string) => str.trim() === "";

    const isFormValid = () => {
        let fieldsCount = 0;
        for (const key in form) {
            if (key === "images") {
                let hasValidImage = false;
                for (const image of form.images as CarImage[]) {
                    if (!isEmpty(image.url)) {
                        hasValidImage = true;
                        break;
                    }
                }
                if (!hasValidImage) {
                    toast.error("Upload atleast 1 image");
                    return false;
                }
            } else if (isEmpty(form[key] as string)) {
                toast.error("Do not leave an empty field");
                return false;
            }
            fieldsCount++;
        }
        if (fieldsCount < 3) {
            toast.error("Please provide enough data");
            return false;
        }

        return true;
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        if (!isFormValid()) {
            setIsSubmitting(false);
            return;
        }

        try {
            if (type === "create") {
                await toast.promise(addNewCar(form), {
                    pending: "Adding a Car",
                    success: "Car added successfully",
                    error: "Error adding a Car"
                });
                router.push("/admin");
                router.refresh();
            } else {
                await toast.promise(editCar(id as string, form), {
                    pending: "Editing a Car",
                    success: "Car edited successfully",
                    error: "Error editing a Car"
                });
                router.back();
                router.refresh();
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 my-4">
            <FormImages
                images={form.images as CarImage[]}
                handleFormChange={handleFormChange}
            />
            <FormFields
                form={form}
                setForm={setForm}
                handleFormChange={handleFormChange}
            />
            <Button
                disabled={isSubmitting}
                title={
                    isSubmitting
                        ? `${type === "create" ? "Adding Car" : "Editing Car"}`
                        : `${type === "create" ? "Add Car" : "Edit Car"}`
                }
                leftIcon={isSubmitting ? "" : "/add.svg"}
                type="submit"
            />
        </form>
    );
};

export default CarForm;
