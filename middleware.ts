import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    try {
        const token = request.cookies.get("auth_cookie");

        if (!token) {
            return NextResponse.redirect(new URL("/guard", request.url));
        }

        const res = await fetch(
            "https://resto-app-five-chi.vercel.app/api/auth/check",
            {
                headers: {
                    token: token.value,
                },
            }
        );

        const data = await res.json();

        // @ts-ignore
        if (!data.isAuthorized) {
            return NextResponse.redirect(new URL("/guard", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/guard", request.url));
    }
}

export const config = {
    matcher: "/admin/:path*",
};
