import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verify } from "jsonwebtoken";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const isAuthorised = (req: NextRequest) => {
    if (!req.cookies.has("access_token")) return false;

    const { value } = req.cookies.get("access_token") || {
        name: "",
        value: ""
    };

    try {
        verify(value, process.env.JWT_SECRET || "");
    } catch (error) {
        return false;
    }

    return true;
};

export async function POST(req: NextRequest) {
    if (!isAuthorised(req)) {
        return NextResponse.json(
            {
                message: "Unauthorised"
            },
            {
                status: 401
            }
        );
    }

    const { path } = await req.json();

    if (!path) {
        return NextResponse.json(
            { message: "Image path is required" },
            { status: 400 }
        );
    }

    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            transformation: [{ width: 1200, height: 1200, crop: "scale" }]
        };

        const result = await cloudinary.uploader.upload(path, options);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Could not upload image" },
            { status: 500 }
        );
    }
}
