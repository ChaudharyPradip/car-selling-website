import CarActions from "@/components/CarActions";
import CarDetails from "@/components/CarDetails";
import { getCar } from "@/lib/actions";
import React from "react";

type Params = {
    id: string[];
};

const Car = async ({ params }: { params: Params }) => {
    const id = params.id[0];

    const res = await getCar(id);

    return (
        <main className="flex flex-col items-center mt-8">
            <CarActions id={id} />
            <CarDetails car={res.car} />
        </main>
    );
};

export default Car;
