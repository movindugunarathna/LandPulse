"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const navLinks = [
  { name: "HOME", link: "/" },
  { name: "CONTACT US", link: "/contact" },
];

const NavLink = ({ item }) => (
  <Link
    href={item.link}
    className="text-black-300 hover:bg-white-700 hover:text-lime-600 rounded-md px-3 py-2 text-sm font-medium"
    aria-current="page"
  >
    {item.name.toUpperCase()}
  </Link>
);

const AuthenticatedLink = ({ href, label, onClick }) => (
  <Link
    href={href}
    className="text-black-300 hover:bg-white-700 hover:text-lime-600 rounded-md px-3 py-2 text-sm font-medium"
    aria-current="page"
    onClick={onClick}
  >
    {label}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    redirect("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
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
                  {navLinks.map((item) => (
                    <NavLink key={item.name} item={item} />
                  ))}
                  {status === "authenticated" && session?.user ? (
                    <>
                      <NavLink
                        item={{
                          name: "DASHBOARD",
                          link: "/dashboard",
                        }}
                      />
                      <AuthenticatedLink
                        href={"/api/auth/signin?callbackUrl=/login"}
                        label="LOGOUT"
                        onClick={handleLogout}
                      />
                    </>
                  ) : (
                    <AuthenticatedLink
                      href={"/api/auth/signin?callbackUrl=/login"}
                      label="LOGIN"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div className={`${isOpen ? "" : "hidden"} sm:hidden`} id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
