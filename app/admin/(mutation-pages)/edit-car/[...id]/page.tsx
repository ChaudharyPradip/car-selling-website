import CarForm from "@/components/CarForm";
import { getCar } from "@/lib/actions";

type Params = {
    id: string[];
};

const EditCar = async ({ params }: { params: Params }) => {
    const id = params.id[0];

    const res = await getCar(id);

    return (
        <section className="mt-10 font-bold flex flex-col gap-5">
            <h1 className="text-center">Edit Car</h1>
            <CarForm type="edit" id={id} car={res.car} />
        </section>
    );
};

export default EditCar;
