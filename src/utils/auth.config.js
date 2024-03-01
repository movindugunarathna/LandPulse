export const authConfig = {
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            const isOnCreate = nextUrl.pathname.endsWith("/create");
            const isOnLogin = nextUrl.pathname.endsWith("/login");
            if (isOnDashboard || isOnCreate) {
                return isLoggedIn ? true : false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            if (isOnLogin) {
                return !isLoggedIn
                    ? false
                    : Response.redirect(new URL("/login", nextUrl));
            }

            return true;
        },
        async session({ session, token }) {
            session.user = token.user;

            session.user.accessToken = token.accessToken;

            session.user.refreshToken = token.refreshToken;
            return session;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.user = user;
            }

            if (account && profile) {
                const { access_token, refresh_token, expires_at } = account;

                return {
                    user: profile,
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    accessTokenExpires: Date.now() + expires_at * 1000,
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            return token;
        },
    },
    providers: [], // Add providers with an empty array for now
};
