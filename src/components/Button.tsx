import Image from "next/image";
import { MouseEventHandler, forwardRef } from "react";

type Props = {
    title: string;
    leftIcon?: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler;
    disabled?: boolean;
    bgColor?: string;
    type?: "button" | "submit";
    textColor?: string;
    fullWidth?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    {
        title,
        leftIcon,
        rightIcon,
        handleClick,
        disabled,
        type,
        bgColor,
        textColor,
        fullWidth
    },
    ref
) {
    return (
        <button
            ref={ref}
            type={type || "button"}
            disabled={disabled}
            className={`flex justify-center items-center px-3 py-1 gap-2 sm:gap-3 sm:px-3 sm:py-2.5 rounded-md text-lg font-medium outline-none ${
                textColor || "text-white"
            } ${
                disabled
                    ? "bg-[#c7b0f2]"
                    : bgColor
                    ? bgColor
                    : "bg-primary hover:bg-accent focus:bg-accent"
            } ${fullWidth ? "w-full" : ""}`}
            onClick={handleClick}
        >
            {leftIcon && (
                <Image src={leftIcon} width={25} height={25} alt="left" />
            )}
            {title}
            {rightIcon && (
                <Image src={rightIcon} width={25} height={25} alt="right" />
            )}
        </button>
    );
});

export default Button;
