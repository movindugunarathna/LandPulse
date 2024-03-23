"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgComment } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/actions/userActions";
import { useState } from "react";
import { toast } from "sonner";
import { deleteAdvertisements } from "@/actions/adActions";
import { IoWarning } from "react-icons/io5";
import { IoCaretBackSharp } from "react-icons/io5";

export default function Dashboard({ userData }) {
    const { data: session, status } = useSession();
    const currentYear = new Date().getFullYear();
    const [user, setUser] = useState(null);
    const [openYesWindow, setOpenYesWindow] = useState({
        open: false,
        obj: null,
    });
    const yesWindowRef = useRef(null);
    const imageRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated" && !session?.user) {
            router.push("/api/auth/signin?callbackUrl=/login");
        }
        if (session?.user) {
            const user = async () => {
                try {
                    const userDetails = await getUserByEmail(
                        session?.user.email
                    );
                    const userObj = JSON.parse(userDetails);
                    console.log(userObj);
                    setUser(userObj);
                    return userObj;
                } catch (error) {
                    toast.error(error.message);
                }
            };
            user();
        }
    }, [session, session?.user, status]);

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [imageRef]);

    useEffect(() => {
        if (yesWindowRef.current) {
            yesWindowRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [yesWindowRef, openYesWindow.open]);

    const deletePostButtonClicked = async (title, userId) => {
        setOpenYesWindow({
            open: true,
            obj: { title, userId },
        });
    };

    const deletePost = async () => {
        if (openYesWindow.obj) {
            try {
                const { title, userId } = openYesWindow.obj;
                const res = await deleteAdvertisements(title, userId);
                if (res?.code === 200) {
                    location.reload();
                    toast.success(res.message);
                } else console.log(res);
            } catch (error) {
                toast.error(error.message);
            }
        }
        setOpenYesWindow({
            open: false,
            obj: null,
        });
    };

    return (
        <>
            {user ? (
                <div className="relative wrapper flex items-center flex-col overflow-hidden">
                    {openYesWindow?.open && (
                        <div
                            ref={yesWindowRef}
                            className=" absolute top-0 left-0 z-10 w-screen h-full flex justify-center items-center backdrop-blur-sm"
                        >
                            <div
                                className="w-fit h-fit p-8 bg-white rounded-md flex flex-col 
                        justify-between items-center shadow-2xl"
                            >
                                <p className="flex gap-2 items-center">
                                    {" "}
                                    <IoWarning className="text-red-500 w-5 h-5" />{" "}
                                    Are you sure you want to delete this item ?
                                </p>
                                <div className="w-full flex gap-4 pt-4">
                                    <button
                                        className="bg-red-500 text-white rounded-lg w-full py-1 hover:opacity-50"
                                        onClick={deletePost}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="border border-black rounded-lg w-full py-1 hover:opacity-50"
                                        onClick={() => {
                                            setOpenYesWindow({
                                                open: false,
                                                obj: null,
                                            });
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="w-full flex justify-start items-center lg:px-56 px-24 my-10">
                        <div
                            className="flex justify-start items-center gap-4 w-fit h-fit"
                            onClick={() => router.back()}
                        >
                            <IoCaretBackSharp className=" w-5 h-5  " />
                            <p>Back</p>
                        </div>
                    </div>
                    <div className="w-screen min-h-screen flex justify-center mt-8 overflow-x-hidden">
                        <div className="flex justify-center xl:w-full h-fit max-xl:px-10 px-32 max-xl:items-center max-xl:flex-wrap w-full gap-10">
                            {/* profile pane */}
                            <div
                                className="profile-pane w-full h-fit xl:max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl 
                         dark:bg-gray-800 dark:border-gray-700 p-10 flex xl:justify-center xl:flex-col max-xl:justify-evenly max-w-screen-sm
                         max-xl:gap-8 sm:flex-row flex-col justify-center max-md:text-sm
                         "
                            >
                                <div className="head flex flex-col items-center pb-10 ">
                                    <div className="profile-image flex flex-col items-center pb-10">
                                        <div className="img rounded-full w-36 h-36 object-cover overflow-hidden">
                                            <Image
                                                ref={imageRef}
                                                className=" w-full h-full "
                                                width={100}
                                                height={100}
                                                src={
                                                    user?.profile?.url ||
                                                    "/avatar.png"
                                                }
                                                alt="profile image"
                                            />
                                        </div>
                                    </div>
                                    <h5 className="mb-1 text-gray-900 dark:text-white">
                                        {user?.username || "Fetching..."}
                                    </h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 hover:font-semibold">
                                        <Link href={"/profile"}>
                                            Edit Profile
                                        </Link>
                                    </span>
                                </div>

                                <div className="">
                                    <div className="account head flex flex-col items-left pb-10">
                                        <h6 className="mb-2">Asserts</h6>
                                        <div className="pl-4 mb-2">
                                            <div className="flex flex-raw justify-between mb-1">
                                                <span className="text-gray-700">
                                                    Assert Count
                                                </span>
                                                <span>
                                                    {user?.posts.length}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="account head flex flex-col items-left pb-10">
                                        <h6 className="mb-2">Contact</h6>
                                        <div className="pl-4  mb-2">
                                            <div className="flex flex-raw justify-between mb-1">
                                                <span className="text-gray-700">
                                                    Email
                                                </span>
                                                <span>
                                                    {user?.email ||
                                                        "Fetching..."}
                                                </span>
                                            </div>
                                            <div className="flex flex-raw justify-between mb-1">
                                                <span className="text-gray-700">
                                                    Phone
                                                </span>
                                                <span>
                                                    {user?.contact ||
                                                        "Fetching..."}
                                                </span>
                                            </div>
                                            <div className="flex flex-raw justify-between mb-1">
                                                <span className="text-gray-700 mr-4 ">
                                                    Address
                                                </span>
                                                <span className="text-right">
                                                    {user?.address ||
                                                        "Fetching..."}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* profile panne ends here */}

                            <caption
                                className="xl:hidden p-8 text-lg font-semibold text-left rtl:text-right text-gray-900 
                         bg-white dark:text-white dark:bg-gray-800 w-full my-4 shadow-2xl"
                            >
                                <div className="flex justify-between">
                                    <div className="flex justify-start items-start flex-col">
                                        History
                                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                            All your products are here.{" "}
                                        </p>
                                    </div>
                                    <div className="flex justify-center py-2">
                                        <button
                                            className=" text-green-500 border border-green-500 hover:opacity-50 px-4 py-2 shadow-lg sticky right-20 
                                                 top-0 rounded-lg text-sm"
                                            type="button"
                                            onClick={() => {
                                                console.log(
                                                    "Redirecting to create page"
                                                );
                                                router.push("/create");
                                            }}
                                        >
                                            Create Post
                                        </button>
                                    </div>
                                </div>
                            </caption>

                            {/* history pane */}

                            <div className=" max-w-[1100px] relative sm:rounded-lg my-4 overflow-x-scroll no-scrollbar w-full max-xl:shadow-2xl">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <caption className="max-xl:hidden p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                        <div className="flex justify-between">
                                            <div className="flex justify-start items-start flex-col">
                                                History
                                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    All your products are here.{" "}
                                                </p>
                                            </div>
                                            <div className="flex justify-center py-2">
                                                <button
                                                    className=" text-green-500 border border-green-500 hover:opacity-50 text-sm px-4 py-2 shadow-lg sticky right-20 
                                                 top-0 rounded-lg"
                                                    type="button"
                                                    onClick={() => {
                                                        console.log(
                                                            "Redirecting to create page"
                                                        );
                                                        router.push("/create");
                                                    }}
                                                >
                                                    Create Post
                                                </button>
                                            </div>
                                        </div>
                                    </caption>
                                    {user?.posts && (
                                        <>
                                            <thead className=" w-fit h-fit text-xs text-blue-500 border border-blue-500">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 rounded-s-lg "
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Location
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Predicted Price
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 rounded-e-lg"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-nowrap">
                                                {user?.posts?.map((post) => (
                                                    <tr
                                                        key={post._id}
                                                        className=" shadow-2xl bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    >
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white text-wrap"
                                                        >
                                                            <div className="relative min-w-60">
                                                                {post.title}
                                                                <span className="absolute top-0 right-0 bg-white pl-2 text-gray-300">
                                                                    ...
                                                                </span>
                                                            </div>
                                                            <span className=" text-xs text-gray-400 py-2">
                                                                {
                                                                    post.creationDate.split(
                                                                        "T"
                                                                    )[0]
                                                                }
                                                            </span>
                                                        </th>
                                                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div>
                                                                Rs.{post.price}
                                                            </div>
                                                            <span className=" text-xs text-gray-400 py-2">
                                                                Perch:
                                                                {post.perch}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className=" text-xs text-gray-400 ">
                                                                Lat :
                                                                {
                                                                    post
                                                                        .geometry
                                                                        .lat
                                                                }
                                                            </div>
                                                            <span className=" text-xs text-gray-400 py-2">
                                                                Lon :{" "}
                                                                {
                                                                    post
                                                                        .geometry
                                                                        .lng
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div>
                                                                Max:{" "}
                                                                {Number(
                                                                    post
                                                                        .predict[
                                                                        currentYear
                                                                    ]?.max_next
                                                                ).toFixed(2)}
                                                                {" /="}
                                                            </div>
                                                            <span className=" text-xs text-gray-400 py-2">
                                                                Min:{" "}
                                                                {Number(
                                                                    post
                                                                        .predict[
                                                                        currentYear
                                                                    ]?.min_next
                                                                ).toFixed(2)}
                                                                {" /="}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4  text-gray-900 whitespace-nowrap flex dark:text-white ">
                                                            <CgComment
                                                                className="h-6 w-6 text-blue-500 rounded-sm ml-1 hover:opacity-60 cursor-pointer"
                                                                onClick={() =>
                                                                    router.push(
                                                                        `/viewAd/${post._id}`
                                                                    )
                                                                }
                                                            />

                                                            <FaRegTrashAlt
                                                                className="h-5 w-5 text-red-500 rounded-sm ml-1 hover:opacity-60 cursor-pointer"
                                                                onClick={() =>
                                                                    deletePostButtonClicked(
                                                                        post.title,
                                                                        post.userId
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                                {user?.posts?.length === 0 && (
                                                    <tr>
                                                        No ads posted yet...
                                                    </tr>
                                                )}
                                            </tbody>
                                        </>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-screen h-screen flex justify-center items-center">
                    Loading...
                </div>
            )}
        </>
    );
}
