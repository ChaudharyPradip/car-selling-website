import { Car, CarImage } from "@/common.types";
import axios from "axios";

const production = process.env.NODE_ENV || "development";

const api = axios.create({
    baseURL:
        production === "production"
            ? process.env.NEXT_PUBLIC_BASE_URL
            : "http://localhost:3000"
});

export const login = async (formData: {}) => {
    try {
        const res = await api.post("/api/auth/login", formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res;
    } catch (error) {
        throw new Error("Invalid username or password");
    }
};

export const logout = async () => {
    try {
        const res = await api.get("/api/auth/logout", {
            withCredentials: true
        });
        return res;
    } catch (error) {
        throw new Error("Error logging out");
    }
};

export const isLoggedIn = async () => {
    try {
        const res = await api.get("/api/auth/session", {
            withCredentials: true
        });
        if (res.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const uploadImage = async (imagePath: string) => {
    const formData = new FormData();
    formData.append("file", imagePath);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY || "");
    formData.append("folder", "cac");
    formData.append("upload_preset", "cac");

    const uploadURL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;

    try {
        const {
            data: { signature, timestamp }
        } = await api.get("/api/get-signature");
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);

        const { data } = await api.post(uploadURL, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (e) => {
                console.log(e.loaded / (e.total || 1));
            }
        });

        return data.secure_url;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addNewCar = async (car: Car) => {
    const images = (car?.images as CarImage[])
        .filter((image) => image.url !== "")
        .map((image) => ({ ...image }));

    try {
        for (let i = 0; i < images.length; i++) {
            images[i].url = await uploadImage(images[i].url);
        }

        const { data } = await api.post(
            "/api/cars",
            {
                form: { ...car, images }
            },
            { withCredentials: true }
        );

        return data;
    } catch (error: any) {
        throw error;
    }
};

export const editCar = async (id: string, car: Car) => {
    function isBase64DataURL(value: string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    }

    const images = (car?.images as CarImage[])
        .filter((image) => image.url !== "")
        .map((image) => ({ ...image }));

    try {
        for (const image of images) {
            if (isBase64DataURL(image.url)) {
                image.url = await uploadImage(image.url);
            }
        }

        const { data } = await api.put(
            `/api/cars/${id}`,
            {
                form: { ...car, images }
            },
            { withCredentials: true }
        );

        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteCar = async (id: string) => {
    try {
        const { data } = await api.delete(`/api/cars/${id}`, {
            withCredentials: true
        });

        return data;
    } catch (error) {
        throw error;
    }
};

export const getAllCars = async () => {
    try {
        const { data } = await api.get("/api/cars", {
            withCredentials: true
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCar = async (id: string) => {
    try {
        const { data } = await api.get(`/api/cars/${id}`, {
            withCredentials: true
        });
        return data;
    } catch (error: any) {
        throw error;
    }
};
