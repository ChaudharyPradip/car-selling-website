import Button from "@/components/Button";
import CarActions from "@/components/CarActions";
import CarDetails from "@/components/CarDetails";
import { getCar } from "@/lib/actions";
import Link from "next/link";

type Params = {
    id: string[];
};

const Car = async ({ params }: { params: Params }) => {
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
                    <Link href="/">
                        {" "}
                        <Button title="Go back" fullWidth={false} />{" "}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="flex flex-col items-center mt-8">
            <CarDetails car={res.car} />
        </main>
    );
};

export default Car;
