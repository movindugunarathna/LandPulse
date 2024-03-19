"use client";
import React, { useEffect, useState } from "react";
import Login from "@/app/components/Login/Login";
import SignUp from "@/app/components/SignUp/SignUp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const [isSignIn, setIsSignIn] = useState(true);
    const { status, data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            router.push("/dashboard");
        }
    }, [session?.user, status]);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center mt-6">
                        <div
                            className={`w-1/3 pb-4 font-medium text-center 
                            ${isSignIn ? "text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white" : "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"} 
                            hover:cursor-pointer`}
                            onClick={() => setIsSignIn(true)}
                        >
                            sign in
                        </div>

                        <div
                            className={`w-1/3 pb-4 font-medium text-center 
                            ${!isSignIn ? "text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white" : "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"}
                            hover:cursor-pointer`}
                            onClick={() => setIsSignIn(false)}
                        >
                            sign up
                        </div>
                    </div>

                    {isSignIn ? <Login /> : <SignUp />}

                    <div className="mt-6 text-center ">
                        {isSignIn ? (
                            <p
                                className="text-sm text-blue-500 hover:underline dark:text-blue-400 hover:cursor-pointer"
                                onClick={() => setIsSignIn(false)}
                            >
                                Create a new account from here
                            </p>
                        ) : (
                            <p
                                className="text-sm text-blue-500 hover:underline dark:text-blue-400 hover:cursor-pointer"
                                onClick={() => setIsSignIn(true)}
                            >
                                Already have an account?
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
