import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export async function GET(req: NextRequest) {
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

    const timestamp = Math.round(new Date().getTime() / 1000 - 3000);

    try {
        const signature = cloudinary.utils.api_sign_request(
            {
                folder: "cac",
                upload_preset: "cac",
                timestamp
            },
            process.env.CLOUDINARY_SECRET || ""
        );

        return NextResponse.json({ timestamp, signature }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "could not sign request" },
            { status: 500 }
        );
    }
}
