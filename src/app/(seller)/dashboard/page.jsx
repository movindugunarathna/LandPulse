"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export const preload = () => {
    void auth();
};

export default function Dashboard() {
    useEffect(() => {
        const checkSession = async () => {
            const session = await auth();
            if (!session) {
                signIn();
                console.log("Session not found");
            }
            console.log("Checking session");
        };
        checkSession();
    }, []);

    return (
        <>
            <div className="wrapper flex mx-1 my-4">
                {/* profile pane */}
                <div className="profile-pane w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-10 ml-4">
                    <div className="head flex flex-col items-center pb-10">
                        <h2 className="text-xl text-gray-900 dark:text-white items-center mb-5 font-semibold">
                            Seller Profile
                        </h2>
                        <div className="profile-image flex flex-col items-center pb-10">
                            <div className="img">
                                <Image
                                    width={100}
                                    height={100}
                                    src="/avatar.png"
                                    alt="profile image"
                                />
                            </div>
                        </div>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            Bonnie Green
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400 hover:font-semibold">
                            <Link href="">Edit Profile</Link>{" "}
                        </span>
                    </div>

                    <div className="account head flex flex-col items-left pb-10">
                        <h6 className="text-lg font-bold mb-2">Account</h6>
                        <div className=" mb-2 text-sm">
                            <div className="flex flex-raw justify-between mb-1">
                                <span className="font-semibold text-gray-700">
                                    Joined
                                </span>
                                <span>Jnne 22, 2024</span>
                            </div>
                            <div className="flex flex-raw justify-between mb-1">
                                <span className="font-semibold text-gray-700">
                                    Asset Total
                                </span>
                                <span>Rs. 0,000,000.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="account head flex flex-col items-left pb-10">
                        <h6 className="text-lg font-bold mb-2">Contact</h6>
                        <div className=" mb-2 text-sm">
                            <div className="flex flex-raw justify-between mb-1">
                                <span className="font-semibold text-gray-700">
                                    Email
                                </span>
                                <span>Jnne 22, 2024</span>
                            </div>
                            <div className="flex flex-raw justify-between mb-1">
                                <span className="font-semibold text-gray-700">
                                    Phone
                                </span>
                                <span>Rs. 0,000,000.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="account head flex flex-col items-left pb-10">
                        <h6 className="text-lg font-bold mb-2">Identity</h6>
                        <div className=" mb-2 text-sm">
                            <div className="flex flex-raw justify-between mb-1">
                                <span className="font-semibold text-gray-700 mr-4 ">
                                    Address
                                </span>
                                <span className="text-right">
                                    24\A Rogger St, Wellampitia,Jaela. Colombo
                                </span>
                            </div>
                            <div className="flex flex-raw justify-between mb-1">
                                <span className="font-semibold text-gray-700">
                                    National ID
                                </span>
                                <span>Rs. 0,000,000.00</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* profile panne ends here */}

                {/* adverticement pane */}
                <div className="adverticement mx-4 grow">
                    <h1 className=" text-right text-4xl font-bold">
                        Advertisement
                    </h1>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 p-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                <div className="flex justify-between">
                                    <div className="flex justify-start items-start flex-col">
                                        History
                                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                            All your products are here.{" "}
                                        </p>
                                    </div>
                                    <button
                                        className="px-6 py-2 text-black "
                                        type="button"
                                        onClick={() => signOut()}
                                    >
                                        SignOut
                                    </button>
                                </div>
                            </caption>
                            <thead className="text-xs text-gray-500  bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 rounded-s-lg text-gray-700 "
                                    >
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Predicted Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 rounded-e-lg"
                                    >
                                        More
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <div>Sample Ad-Title</div>
                                        <span className=" text-xs text-gray-400 py-2">
                                            Date
                                        </span>
                                    </th>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div>$0,000,000.00</div>
                                        <span className=" text-xs text-gray-400 py-2">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                                        <div>Sample Ad-Location</div>
                                        <span className=" text-xs text-gray-400 py-2">
                                            Address
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div>$0,000,000.00</div>
                                        <span className=" text-xs text-gray-400 py-2">
                                            Accepted
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-900 whitespace-nowrap dark:text-white">
                                        <a
                                            href="#"
                                            className="font-medium text-white dark:text-white bg-lime-700 px-3 py-1 rounded-sm hover:bg-lime-800"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <svg
                                            className="hover:text-gray-700 w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                            />
                                        </svg>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
