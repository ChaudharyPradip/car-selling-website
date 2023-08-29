import Image from "next/image";
import CarActions from "./CarActions";
import Link from "next/link";

type Props = {
    isAdmin?: boolean;
    id: string;
    image: string;
    name: string;
    price: string;
    year: string;
};

const CarCard = ({ isAdmin, id, image, name, price, year }: Props) => {
    const formatINR = (number: string) => {
        const numericValue = parseFloat(number);
        if (isNaN(numericValue)) {
            return;
        }

        const formattedNumber = numericValue.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });

        return formattedNumber.replace("₹", "₹ ");
    };

    return (
        <div className="max-w-xs rounded-lg shadow-xl border-2 border-gray-100 overflow-hidden hover:scale-[1.01]">
            <Link
                className="text-inherit hover:text-inherit active:text-inherit visited:text-inherit"
                href={`${isAdmin ? "/admin/cars/" + id : "/cars/" + id}`}
            >
                <div className="">
                    <Image
                        src={image}
                        width={640}
                        height={500}
                        alt="car image"
                    />
                </div>
                <div className="px-2 py-3">
                    <h3 className="text-3xl font-medium mt-1">{name}</h3>
                    <p className="font_accent text-lg px-1 mt-3 font-normal">
                        {formatINR(price) || `₹ ${price}`}
                    </p>
                    <p className="px-1 -my-1 font-normal text-base">
                        Year: <span>{year}</span>
                    </p>
                </div>
            </Link>
            {isAdmin && (
                <div className="flex justify-center py-3">
                    <CarActions id={id} />
                </div>
            )}
        </div>
    );
};

export default CarCard;
