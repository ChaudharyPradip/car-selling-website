import { Car } from "@/common.types";
import Image from "next/image";

const CarData = ({ car }: { car: Car }) => {
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
        <div>
            <div className="pl-5 md:pl-0">
                <h1 className="mb-5 font-semibold sm:font-medium">
                    {(car.name as string) || "No name"}
                </h1>
                <p className="font_accent text-2xl mb-4">
                    {formatINR(car.price as string) || "₹ Negotiate on call"}
                </p>
                <a
                    className="px-3 py-2 bg-primary hover:bg-accent rounded-md text-white hover:text-white focus:text-white flex gap-2 items-center max-w-fit"
                    href={`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`}
                >
                    <Image
                        className="inline-block invert"
                        src="/phone.png"
                        width={20}
                        height={20}
                        alt="phone icon"
                    />
                    Call the owner
                </a>
            </div>
            <div className="mt-10">
                <h2 className="text-center text-2xl font-medium uppercase underline underline-offset-4 mb-4">
                    Car details
                </h2>
                <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left py-2 px-4 border-b border-gray-300 border-r">
                                Property
                            </th>
                            <th className="text-left py-2 px-4 border-b border-gray-300">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(car).map((key) => {
                            if (
                                ![
                                    "images",
                                    "name",
                                    "price",
                                    "_id",
                                    "__v"
                                ].includes(key)
                            ) {
                                return (
                                    <tr key={key}>
                                        <td className="py-2 px-4 border-b border-gray-300 capitalize border-r">
                                            {key}
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-300 capitalize">
                                            {car[key] as string}
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarData;
