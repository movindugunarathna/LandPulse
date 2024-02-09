"use client";
import React, { useState } from "react";
import LoginForm from "@/app/components/LoginForum/LoginForm";

export default function Page() {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <div className="w-full max-w-md">
                    <div className="flex justify-center mx-auto"></div>

                    <div className="flex items-center justify-center mt-6">
                        <a
                            href="#"
                            className={`w-1/3 pb-4 font-medium text-center ${isSignIn ? "text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white" : "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"} `}
                            onClick={() => setIsSignIn(true)}
                        >
                            sign in
                        </a>

                        <a
                            href="#"
                            className={`w-1/3 pb-4 font-medium text-center ${!isSignIn ? "text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white" : "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"} `}
                            onClick={() => setIsSignIn(false)}
                        >
                            sign up
                        </a>
                    </div>

                    {!isSignIn && <LoginForm />}

                    <div className="mt-6 text-center ">
                        <a
                            href="#"
                            className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                        >
                            Already have an account?
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
