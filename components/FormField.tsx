"use client";

import { useState } from "react";

type Props = {
    type?: string;
    title: string;
    state: string;
    showLabel: boolean;
    placeholder: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
} & (
    | {
          isRemovable: true;
          removeField: (field: string) => void;
      }
    | { isRemovable?: false }
);

const FormField = ({
    type,
    title,
    state,
    showLabel,
    placeholder,
    isTextArea,
    isRemovable,
    setState,
    ...props
}: Props) => {
    const [validationMessage, setValidationMessage] = useState("");
    const handleChange = (value: string) => {
        if (type && type === "number") {
            if (isNaN(+value) || parseInt(value) <= 0) {
                setValidationMessage("Please enter a number more than 0");
            } else {
                setState(value);
                setValidationMessage("");
            }
        } else {
            setState(value);
        }
    };
    return (
        <div className="">
            {showLabel && (
                <label htmlFor="" className="font-normal capitalize">
                    {title}
                </label>
            )}

            <div className="flex gap-1">
                {isTextArea ? (
                    <textarea
                        placeholder={placeholder}
                        value={state}
                        required
                        className="relative font-normal w-full px-3 py-1 rounded-lg text-black outline-none bg-white border-2 border-accent"
                        onChange={(e) => handleChange(e.target.value)}
                    ></textarea>
                ) : (
                    <input
                        autoFocus
                        type={type === "number" ? "text" : type || "text"}
                        placeholder={placeholder}
                        value={state}
                        required
                        className="relative font-normal w-full px-3 py-1 rounded-lg text-black outline-none bg-white border-2 border-accent"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
                {isRemovable && (
                    <button
                        tabIndex={-1}
                        type="button"
                        onClick={() =>
                            (
                                props as Props & { isRemovable: true }
                            ).removeField(title)
                        }
                    >
                        ❌
                    </button>
                )}
            </div>

            <p className="font-extralight pl-2 text-sm text-red-500">
                {validationMessage}
            </p>
        </div>
    );
};

export default FormField;
