import NextAuth from "next-auth";
import { options } from "./options";

const handler = NextAuth({
    ...options,
    events: {
        createUser: (e) => {
            console.log("Create user: ", e);
        },
        signIn: (e) => {
            console.log("signIn user: ", e);
        },
        signOut: (e) => {
            console.log("signOut user: ", e);
        },
        session: (e) => {
            console.log("session user: ", e);
        },
    },
});
export { handler as GET, handler as POST };
