"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const navLink = [
    {
        name: "HOME",
        link: "/",
    },
    {
        name: "ADVERTISEMENT",
        link: "/ads",
    },
    {
        name: "DASHBOARD",
        link: "/dashboard",
    },
    {
        name: "CONTACT US",
        link: "/contact",
    },
];

// eslint-disable-next-line @next/next/no-async-client-component
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { status, data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 bg-white">
            <nav className="bg-white-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-start">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-white-400 hover:bg-white-700 hover:text-lime-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white "
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    className="hidden h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <a href="/">
                                    <Image
                                        className="h-8 w-auto"
                                        src="/logo.png"
                                        width={500}
                                        height={500}
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="hidden sm:ml-auto sm:block">
                                <div className="flex space-x-5">
                                    {navLink.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.link}
                                            className="text-black-300 hover:bg-white-700 hover:text-lime-600 rounded-md px-3 py-2 text-sm font-medium"
                                            aria-current="page"
                                        >
                                            {item.name.toUpperCase()}
                                        </Link>
                                    ))}
                                    {status === "authenticated" &&
                                    session?.user ? (
                                        <Link
                                            href="#"
                                            className="text-black-300 hover:bg-white-700 hover:text-lime-600 rounded-md px-3 py-2 text-sm font-medium"
                                            aria-current="page"
                                            onClick={() => signOut()}
                                        >
                                            LOGOUT
                                        </Link>
                                    ) : (
                                        <Link
                                            href={
                                                "/api/auth/signin?callbackUrl=/login"
                                            }
                                            className="text-black-300 hover:bg-white-700 hover:text-lime-600 rounded-md px-3 py-2 text-sm font-medium"
                                            aria-current="page"
                                        >
                                            LOGIN
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="relative flex rounded-full bg-white-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white-800"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <a href="/signup">
                                            <Image
                                                className="h-8 w-8 rounded-full"
                                                src="/avatar.png"
                                                alt=""
                                                width={500}
                                                height={500}
                                            />
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile menu, show/hide based on menu state. */}
                <div
                    className={`${isOpen ? "" : "hidden"} sm:hidden`}
                    id="mobile-menu"
                >
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <a
                            href="#"
                            className="bg-white-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >
                            HOME
                        </a>
                        <a
                            href="#"
                            className="text-white-300 hover:bg-white-700 hover:text-lime-600 block rounded-md px-3 py-2 text-base font-medium"
                        >
                            ABOUT
                        </a>
                        <a
                            href="#"
                            className="text-white-300 hover:bg-white-700 hover:text-lime-600 block rounded-md px-3 py-2 text-base font-medium"
                        >
                            ADVERTISEMENT
                        </a>
                        <a
                            href="#"
                            className="text-white-300 hover:bg-white-700 hover:text-lime-600 block rounded-md px-3 py-2 text-base font-medium"
                        >
                            PRICE PREDICTOR
                        </a>
                        <a
                            href="#"
                            className="text-white-300 hover:bg-white-700 hover:text-lime-600 block rounded-md px-3 py-2 text-base font-medium"
                        >
                            DASHBOARD
                        </a>
                        <a
                            href="#"
                            className="text-white-300 hover:bg-white-700 hover:text-lime-600 block rounded-md px-3 py-2 text-base font-medium"
                        >
                            CONTACT US
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
