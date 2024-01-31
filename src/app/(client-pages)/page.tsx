import { Car, CarImage } from "@/common.types";
import CarCard from "@/components/CarCard";
import { getAllCars } from "@/lib/actions";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { cars }: { cars: Car[] } = await getAllCars();

  if (cars.length === 0) {
    return (
      <>
        <h1 className="text-center text-5xl font-extrabold mt-10">Cars</h1>
        <div className="flex flex-col gap-2 items-center justify-center mt-32 sm:mt-0 sm:min-h-[60vh]">
          <h2 className="text-center">There are no cars for sale right now</h2>
          <p>Please visit after some time</p>
        </div>
      </>
    );
  }

  return (
    <div>
      {/* <a
        className="ml-auto px-3 py-2 bg-primary hover:bg-accent rounded-md text-white hover:text-white focus:text-white flex gap-2 items-center max-w-fit"
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
      </a> */}
      <section className="flex flex-col gap-5 items-center mt-10 mb-5">
        <h1 className="text-center text-5xl font-extrabold">Cars</h1>
        <div className="cars_grid w-full">
          {cars.map((car) => (
            <CarCard
              key={car?._id as string}
              id={car?._id as string}
              image={
                (car?.images as CarImage[])?.[0]?.url || "/placeholder.jpg"
              }
              name={(car?.name as string) || "No name"}
              price={(car?.price as string) || "Negotiate on call"}
              year={(car?.year as string) || "Unknown"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
