"use client";

import { useState, forwardRef, RefObject } from "react";

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

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
    function FormField(
        {
            type,
            title,
            state,
            showLabel,
            placeholder,
            isTextArea,
            isRemovable,
            setState,
            ...props
        },
        ref
    ) {
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
                            ref={ref as RefObject<HTMLTextAreaElement>}
                            placeholder={placeholder}
                            value={state}
                            required
                            className="relative font-normal w-full px-3 py-1 rounded-lg text-black outline-none bg-white border-2 border-gray-400"
                            onChange={(e) => handleChange(e.target.value)}
                        ></textarea>
                    ) : (
                        <input
                            ref={ref as RefObject<HTMLInputElement>}
                            autoFocus
                            type={type === "number" ? "text" : type || "text"}
                            placeholder={placeholder}
                            value={state}
                            required
                            className="relative font-normal w-full px-3 py-1 rounded-lg text-black outline-none bg-white border-2 border-gray-400 focus:border-gray-700"
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
    }
);

export default FormField;
