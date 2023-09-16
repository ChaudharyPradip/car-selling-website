import { Car, CarImage } from "@/common.types";
import CarData from "./CarData";
import ImagesSlider from "./ImagesSlider";

type Props = {
    car: Car;
};

const CarDetails = ({ car }: Props) => {
    return (
        <div className="grid md:grid-cols-2 w-full gap-10 my-5">
            <div className="md:sticky md:self-start md:top-40">
                <ImagesSlider images={car.images as CarImage[]} />
            </div>
            <CarData car={car} />
        </div>
    );
};

export default CarDetails;
