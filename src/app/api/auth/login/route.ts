import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { username, password } = await req.json();

    if (
        username !== process.env.USER_NAME ||
        password !== process.env.PASSWORD
    ) {
        const serialised = serialize("access_token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: -1,
            path: "/"
        });

        return new Response(
            JSON.stringify({
                message: "Incorrect username or password"
            }),
            {
                status: 401,
                headers: { "Set-Cookie": serialised }
            }
        );
    }

    const token = sign({ username }, process.env.JWT_SECRET || "", {
        expiresIn: 60 * 60 * 24
    });

    const serialised = serialize("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/"
    });

    const response = {
        message: "Authenticated"
    };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Set-Cookie": serialised }
    });
};
