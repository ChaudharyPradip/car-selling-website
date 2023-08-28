import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
    title: string;
    leftIcon?: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler;
    disabled?: boolean;
    type?: "button" | "submit";
    bgColor?: string;
    textColor?: string;
    fullWidth?: boolean;
};

const Button = ({
    title,
    leftIcon,
    rightIcon,
    handleClick,
    disabled,
    type,
    bgColor,
    textColor,
    fullWidth
}: Props) => {
    return (
        <button
            type={type || "button"}
            disabled={disabled}
            className={`flex justify-center items-center px-3 py-1 gap-2 sm:gap-3 sm:px-3 sm:py-2.5 rounded-md text-lg font-medium outline-none focus:outline-offset-0 focus:outline-black hover:outline-offset-0 hover:outline-black ${
                textColor || "text-white"
            } ${disabled ? "bg-black/50" : bgColor ? bgColor : "bg-black"} ${
                fullWidth ? "w-full" : ""
            }`}
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
};

export default Button;
