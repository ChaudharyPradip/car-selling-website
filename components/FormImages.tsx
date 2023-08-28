import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Button from "./Button";
import { CarImage } from "@/common.types";

type Props = {
    images: CarImage[];
    handleFormChange: (field: string, value: string | CarImage[]) => void;
};

const FormImages = ({ images, handleFormChange }: Props) => {
    const [currentImageId, setCurrentImageId] = useState(images[0].id);
    const [slideStartX, setSlideStartX] = useState(0);

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes("image")) {
            return alert("Please upload an image file");
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = [...images];
            result.find((image) => image.id === id)!.url =
                reader.result as string;

            handleFormChange("images", result);
        };
    };

    const handleNextClick = () => {
        const currentIndex = images.findIndex(
            (image) => image.id === currentImageId
        );
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentImageId(images[nextIndex].id);
    };

    const handlePrevClick = () => {
        const currentIndex = images.findIndex(
            (image) => image.id === currentImageId
        );
        const prevIndex =
            currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
        setCurrentImageId(images[prevIndex].id);
    };

    const addNewImage = () => {
        const imagesCopy = [...images];
        const uuid = crypto.randomUUID();
        imagesCopy.push({ id: uuid, url: "" });
        handleFormChange("images", imagesCopy);
        setCurrentImageId(uuid);
    };

    const editImage = () => {
        const result = [...images];
        result.find((image) => image.id === currentImageId)!.url = "";

        handleFormChange("images", result);
    };

    const deleteImage = () => {
        const imageToRemove = currentImageId;
        handleNextClick();
        const newImages = images.filter((image) => image.id !== imageToRemove);
        if (newImages.length !== 0) {
            handleFormChange("images", newImages);
        } else {
            const id = crypto.randomUUID();
            handleFormChange("images", [{ id, url: "" }]);
            setCurrentImageId(id);
        }
    };

    const handleImageSlide = (start: number, end: number) => {
        if (start > end) {
            handleNextClick();
        } else if (end > start) {
            handlePrevClick();
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setSlideStartX(e.clientX);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        const endX = e.clientX;

        handleImageSlide(slideStartX, endX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setSlideStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const endX = e.changedTouches[0].clientX;

        handleImageSlide(slideStartX, endX);
    };

    return (
        <div className="flex flex-col items-center gap-5 border-2 border-dashed border-gray-400 px-1 py-5">
            <div className="w-full flex items-center justify-center">
                <div className="cursor-pointer">
                    <Image
                        onClick={handlePrevClick}
                        src="/left_arrow.png"
                        width={20}
                        height={20}
                        alt="left_arrow"
                    />
                </div>
                <div
                    className="w-full max-w-4xl aspect-[5/3] overflow-hidden"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="h-full flex gap-0 relative">
                        {images?.map((image, index) =>
                            image.url === "" ? (
                                <div
                                    key={image.id}
                                    className={`h-full aspect-[5/3] absolute flex-shrink-0 transition-transform duration-300 transform ${
                                        image.id === currentImageId
                                            ? "translate-x-0"
                                            : index <
                                              images.findIndex(
                                                  (i) => i.id === currentImageId
                                              )
                                            ? "-translate-x-full"
                                            : "translate-x-full"
                                    }`}
                                >
                                    <input
                                        className="w-full h-full opacity-0 cursor-pointer"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            handleImageChange(e, image.id);
                                        }}
                                    />
                                    <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                                        <Image
                                            src="/upload.png"
                                            width={50}
                                            height={50}
                                            alt="upload_logo"
                                        />
                                        <p className="font-normal">
                                            Upload Image
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={image.id}
                                    className={`h-full aspect-[5/3] absolute flex-shrink-0 transition-transform duration-300 transform ${
                                        image.id === currentImageId
                                            ? "translate-x-0"
                                            : index <
                                              images.findIndex(
                                                  (i) => i.id === currentImageId
                                              )
                                            ? "-translate-x-full"
                                            : "translate-x-full"
                                    }`}
                                >
                                    <Image
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                        }}
                                        alt="car image"
                                        src={image.url}
                                        className="object-contain"
                                        fill
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="cursor-pointer">
                    <Image
                        onClick={handleNextClick}
                        src="/right_arrow.png"
                        width={20}
                        height={20}
                        alt="right_arrow"
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <Image
                    onClick={editImage}
                    className="cursor-pointer hover:scale-125"
                    src="/edit.svg"
                    width={25}
                    height={25}
                    alt="edit button"
                />
                <Image
                    onClick={deleteImage}
                    className="cursor-pointer hover:scale-125"
                    src="/delete.svg"
                    width={25}
                    height={25}
                    alt="edit button"
                />
            </div>
            <div className="flex gap-2">
                {images?.map((image) => (
                    <div
                        onClick={() => setCurrentImageId(image.id)}
                        key={image.id}
                        className={`w-2 aspect-square rounded-full cursor-pointer ${
                            currentImageId === image.id
                                ? "bg-accent scale-150"
                                : "bg-slate-700"
                        } hover:scale-125`}
                    ></div>
                ))}
            </div>
            <div>
                <Button
                    handleClick={addNewImage}
                    title="Add another image"
                    bgColor="bg-primary"
                    rightIcon="/plus.svg"
                />
            </div>
        </div>
    );
};

export default FormImages;
