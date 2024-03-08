"use client";
import { SessionProvider } from "next-auth/react";
import { reduxStore } from "@/lib/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

const AuthProvider = ({ children }) => {
    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = reduxStore();
    }
    return (
        <Provider store={storeRef.current}>
            <SessionProvider>{children}</SessionProvider>
        </Provider>
    );
};

export default AuthProvider;
