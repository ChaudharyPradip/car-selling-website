import { Car, CarImage } from "@/common.types";
import Button from "@/components/Button";
import CarCard from "@/components/CarCard";
import { getAllCars } from "@/lib/actions";
import Link from "next/link";

const Admin = async () => {
    const { cars }: { cars: Car[] } = await getAllCars();

    if (cars.length === 0) {
        return (
            <>
                <h1 className="text-center text-5xl font-extrabold mt-10">
                    Cars
                </h1>
                <div className="flex flex-col gap-2 items-center justify-center mt-32 sm:mt-0 sm:min-h-[60vh]">
                    <h2>You don&apos;t have any Car</h2>
                    <Link href="/admin/add-car">
                        <Button
                            title="Add now"
                            bgColor="bg-accent"
                            rightIcon="/add.svg"
                        />
                    </Link>
                </div>
            </>
        );
    }

    return (
        <section className="flex flex-col gap-5 items-center mt-10 mb-5">
            <h1 className="text-center text-5xl font-extrabold">Cars</h1>
            <Link className="sm:ml-auto inline-block" href="/admin/add-car">
                <Button
                    title="Add new car"
                    bgColor="bg-accent"
                    rightIcon="/add.svg"
                />
            </Link>
            <div className="cars_grid w-full">
                {cars.map((car) => (
                    <CarCard
                        isAdmin={true}
                        key={car._id as string}
                        id={car._id as string}
                        image={
                            (car.images as CarImage[])?.[0]?.url ||
                            "/placeholder.jpg"
                        }
                        name={(car?.name as string) || "No name"}
                        price={(car?.price as string) || "Negotiate on call"}
                        year={(car?.year as string) || "Unknown"}
                    />
                ))}
            </div>
        </section>
    );
};

export default Admin;
