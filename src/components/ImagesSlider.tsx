"use client";

import { CarImage } from "@/common.types";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
    images: CarImage[];
};

const ImagesSlider = ({ images }: Props) => {
    const [currentImageId, setCurrentImageId] = useState(images[0].id);
    const [slideStartX, setSlideStartX] = useState(0);

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
        <div className="flex flex-col gap-2 items-center">
            <div className="w-full flex items-center justify-center">
                <div
                    className="cursor-pointer shrink-0 bg-white p-1 -mr-3 z-10"
                    onClick={handlePrevClick}
                >
                    <Image
                        src="/left_arrow.png"
                        width={20}
                        height={20}
                        alt="left_arrow"
                    />
                </div>
                <div
                    className="overflow-hidden aspect-square relative flex-grow"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`absolute w-full transition-transform duration-300 transform ${
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
                                src={image.url}
                                alt=""
                                width={1200}
                                height={1200}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className="cursor-pointer shrink-0 bg-white p-1 -ml-3 z-10"
                    onClick={handleNextClick}
                >
                    <Image
                        src="/right_arrow.png"
                        width={20}
                        height={20}
                        alt="right_arrow"
                    />
                </div>
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
        </div>
    );
};

export default ImagesSlider;
