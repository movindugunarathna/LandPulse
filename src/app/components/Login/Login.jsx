"use client";
import React, { useState } from "react";
import { LoginSchema } from "@/lib/zodSchema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/lib/serverActions/userActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
    const [showPswrd, setShowPswrd] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [inputs, setInputs] = useState({ username: "", email: "" });
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: zodResolver(LoginSchema) });

    const fieldsChanging = (e) => {
        if (e.target.name === "username") {
            setInputs({ ...inputs, username: e.target.value });
        }
        if (e.target.name === "email") {
            setInputs({ ...inputs, email: e.target.value });
        }
    };

    const onSubmit = async (data) => {
        toast.info("Login evaluating!!!");
        const res = await login(data);

        if (res.code === 200) {
            toast.success(res.message);
            // console.log(JSON.parse(res.data));
            router.push("/dashboard");
        } else toast.error(res.message);
    };

    const onError = (errors) => {
        let errorMsgSet = false;
        console.log(errors);
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((element) => {
                if (element?.message.replace(" ", "") !== "" && !errorMsgSet) {
                    errorMsgSet = true;
                    setErrorMsg(element?.message);
                }
            });
        }
        setTimeout(() => {
            setErrorMsg("");
        }, 4000);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={`relative flex items-center mt-8 bg-gray-300`}>
                <span className="absolute">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </span>

                <input
                    type="text"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 
                    dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 
                    focus:outline-none focus:ring focus:ring-opacity-40 disabled:opacity-80"
                    placeholder="Username"
                    value={inputs.username}
                    {...register("username")}
                    aria-errormessage={errors?.username?.message}
                    onFocus={() => errors?.username?.message}
                    onChange={fieldsChanging}
                    disabled={inputs.email.trim() !== ""}
                />
            </div>

            <label
                htmlFor="dropzone-file"
                className="flex items-center py-3 mx-auto mt-6 text-center"
            >
                <div className="text-gray-700 dark:text-gray-300 mx-2 w-full text-center">
                    or
                </div>
            </label>

            <div className="relative flex items-center mt-6">
                <span className="absolute">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </span>

                <input
                    type="email"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 
                    dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 
                    dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40
                    disabled:opacity-80"
                    placeholder="Email address"
                    {...register("email")}
                    value={inputs.email}
                    aria-errormessage={errors?.email?.message}
                    onFocus={() => errors?.email?.message}
                    onChange={fieldsChanging}
                    disabled={inputs.username.trim() !== ""}
                />
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </span>

                <input
                    type={!showPswrd ? "text" : "password"}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    {...register("password")}
                    aria-errormessage={errors?.password?.message}
                    onFocus={() => errors?.password?.message}
                />

                <span
                    className="absolute right-0"
                    onClick={() => setShowPswrd(!showPswrd)}
                >
                    {!showPswrd ? (
                        <svg
                            className="w-6 h-6 mx-3 fill text-gray-300 dark:text-gray-500"
                            width="800px"
                            height="800px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6 mx-3 fill text-gray-300 dark:text-gray-500"
                            width="800px"
                            height="800px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="Edit / Hide">
                                <path
                                    id="Vector"
                                    d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    )}
                </span>
            </div>

            <div className="relative flex items-center mt-4">
                <p className="h-2 w-full text-red-500 text-center">
                    {errorMsg}
                </p>
            </div>

            <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Login
                </button>
            </div>
        </form>
    );
}
