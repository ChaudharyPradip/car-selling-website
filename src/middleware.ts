import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {jwtVerify} from "jose"

const isAuthorised = (req: NextRequest) => {
    if (!req.cookies.has("access_token")) return false;

    const { value } = req.cookies.get("access_token") || {
        name: "",
        value: ""
    };

    try {
        jwtVerify(value, new TextEncoder().encode(process.env.JWT_SECRET));
    } catch (error) {
        console.log(error)
        return false;
    }

    return true;
};
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl

    const authorised = isAuthorised(req);

    if (pathname == "/admin/login" && authorised) {
        return NextResponse.redirect(new URL('/admin', req.url))
    } else if (pathname != "/admin/login" && !authorised) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}