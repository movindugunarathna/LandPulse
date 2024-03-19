'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { FiAlignJustify, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'HOME', link: '/' },
  { name: 'ABOUT US', link: '/aboutUs' },
];

const NavLink = ({ item, setIsOpen, pathname }) => (
  <Link
    href={item.link}
    className={`${pathname === item.link ? 'text-custom-green-300' : 'text-black'} hover:bg-white-700 
        hover:text-black/50 rounded-md px-3 py-2 text-sm font-medium`}
    aria-current="page"
    onClick={() => setIsOpen(false)}
  >
    {item.name.toUpperCase()}
  </Link>
);

const AuthenticatedLink = ({ href, label, onClick, setIsOpen, pathname }) => (
  <Link
    href={href}
    className={`${pathname === href ? 'text-custom-green-300/80' : 'text-black'} hover:bg-white-700 
        hover:text-black/50 rounded-md px-3 py-2 text-sm font-medium`}
    aria-current="page"
    onClick={(e) => {
      onClick(e);
      setIsOpen(false);
    }}
  >
    {label}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, data: session } = useSession();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    if (pathname !== '/login') {
      redirect('/login');
    }
    console.log(pathname);
  };

  const handleLogin = async () => {
    if (pathname !== '/login') {
      redirect('/login');
    }
    console.log(pathname);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="bg-white-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-start">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
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
                {!isOpen ? (
                  <FiAlignJustify className="block h-6 w-6 text-black" />
                ) : (
                  <FiX className="block h-6 w-6 text-black" />
                )}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <a href="/">
                  <Image
                    className="h-8 w-auto"
                    src="/logo.png"
                    width={500}
                    height={500}
                    alt=""
                    aria-label="landpulse-logo"
                  />
                </a>
              </div>
              <div className="hidden md:ml-auto md:block">
                <div className="flex space-x-5">
                  {navLinks.map((item) => (
                    <NavLink
                      key={item.name}
                      item={item}
                      setIsOpen={setIsOpen}
                      pathname={pathname}
                    />
                  ))}
                  {status === 'authenticated' && session?.user ? (
                    <>
                      <NavLink
                        item={{
                          name: 'DASHBOARD',
                          link: '/dashboard',
                        }}
                        setIsOpen={setIsOpen}
                        pathname={pathname}
                      />
                      <AuthenticatedLink
                        href={'/api/auth/signin?callbackUrl=/login'}
                        label="LOGOUT"
                        onClick={handleLogout}
                        setIsOpen={setIsOpen}
                        pathname={pathname}
                      />
                    </>
                  ) : (
                    <AuthenticatedLink
                      href={'/api/auth/signin?callbackUrl=/login'}
                      label="LOGIN"
                      setIsOpen={setIsOpen}
                      onClick={handleLogin}
                      pathname={pathname}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div className={`${isOpen ? '' : 'hidden'} md:hidden`} id="mobile-menu">
          <div className="absolute w-screen h-screen flex flex-col justify-center items-center bg-white">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                setIsOpen={setIsOpen}
                pathname={pathname}
              />
            ))}
            {status === 'authenticated' && session?.user ? (
              <>
                <NavLink
                  item={{
                    name: 'DASHBOARD',
                    link: '/dashboard',
                  }}
                  pathname={pathname}
                  setIsOpen={setIsOpen}
                />
                <AuthenticatedLink
                  href={'/api/auth/signin?callbackUrl=/login'}
                  label="LOGOUT"
                  onClick={handleLogout}
                  setIsOpen={setIsOpen}
                  pathname={pathname}
                />
              </>
            ) : (
              <AuthenticatedLink
                href={'/api/auth/signin?callbackUrl=/login'}
                label="LOGIN"
                setIsOpen={setIsOpen}
                onClick={handleLogin}
                pathname={pathname}
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
