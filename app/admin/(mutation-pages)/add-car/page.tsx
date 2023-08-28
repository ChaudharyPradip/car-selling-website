import CarForm from "@/components/CarForm";

const AddCar = () => {
    return (
        <section className="mt-10 font-bold flex flex-col gap-5">
            <h1 className="text-center">Add Car</h1>
            <CarForm type="create" />
        </section>
    );
};

export default AddCar;
