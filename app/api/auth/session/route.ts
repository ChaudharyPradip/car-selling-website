import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    if (!req.cookies.has("access_token")) {
        return NextResponse.json(
            {
                message: "Unauthorised"
            },
            {
                status: 401
            }
        );
    }

    const { value } = req.cookies.get("access_token") || {
        name: "",
        value: ""
    };

    try {
        verify(value, process.env.JWT_SECRET || "");
    } catch (error) {
        return NextResponse.json(
            {
                message: "Unauthorised"
            },
            {
                status: 401
            }
        );
    }

    const response = {
        message: "Authenticated"
    };

    return NextResponse.json(response, { status: 200 });
};
