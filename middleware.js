import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(request) {
	const token = await getToken({req : request});

	if (!token && process.env.NEXTAUTH_URL) {
        return NextResponse.redirect(new URL("/login", request.url))
	}
    
}

export const config = {
    matcher: [
        "/userinfo",
    ],
}