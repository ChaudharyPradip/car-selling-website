import { serialize } from "cookie";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const serialised = serialize("access_token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: -1,
        path: "/"
    });

    return new Response(
        JSON.stringify({
            message: "Logged out successfully"
        }),
        {
            status: 200,
            headers: { "Set-Cookie": serialised }
        }
    );
};
