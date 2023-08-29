import Button from "@/components/Button";
import CarForm from "@/components/CarForm";
import { getCar } from "@/lib/actions";
import Link from "next/link";

type Params = {
    id: string[];
};

const EditCar = async ({ params }: { params: Params }) => {
    const id = params.id[0];

    let res;
    try {
        res = await getCar(id);
    } catch (error) {
        return (
            <div className="w-full h-full mt-48 sm:mt-0 sm:min-h-[70vh] grid place-items-center">
                <div className="-mt-36 flex flex-col gap-2 items-center">
                    <h1 className="font-medium text-3xl">
                        We guess you are lost
                    </h1>
                    <Link href="/admin">
                        {" "}
                        <Button title="Go back" fullWidth={false} />{" "}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="mt-10 font-bold flex flex-col gap-5">
            <h1 className="text-center">Edit Car</h1>
            <CarForm type="edit" id={id} car={res.car} />
        </section>
    );
};

export default EditCar;
