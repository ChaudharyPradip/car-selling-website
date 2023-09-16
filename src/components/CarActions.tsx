"use client";

import { deleteCar } from "@/lib/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CarActions = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await toast.promise(deleteCar(id), {
                pending: "Deleting a Car",
                success: "Car deleted successfully",
                error: "Error deleting car"
            });
            router.push("/admin");
            router.refresh();
        } catch (error) {}
    };
    return (
        <div className="flex gap-3">
            <a href={`/admin/edit-car/${id}`}>
                <Image
                    className="cursor-pointer hover:scale-125"
                    src="/edit.svg"
                    width={25}
                    height={25}
                    alt="edit button"
                />
            </a>
            <Image
                tabIndex={0}
                onClick={handleDelete}
                className="cursor-pointer hover:scale-125"
                src="/delete.svg"
                width={25}
                height={25}
                alt="edit button"
            />
        </div>
    );
};

export default CarActions;
