// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req, res, next) {
        console.log("Middleware pathname: ", req.nextUrl.pathname);
        console.log("Middleware token: ", req.nextauth.token);

        if (req.nextUrl.pathname.startsWith("/dashboard")) {
            return NextResponse.rewrite(new URL("/Denied", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                console.log("Middleware token: ", token);
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: ["/dashboard"],
};
