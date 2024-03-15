"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgComment } from "react-icons/cg";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { getUserByEmail } from "@/actions/userActions";
import { useState } from "react";
import path from "path";

export default function Dashboard({ userData }) {
    const { data: session, status } = useSession();
    const currentYear = new Date().getFullYear();
    const [user, setUser] = useState(null);
    const imageRef = useRef(null);
    const router = useRouter();

    // const ondeletePost = async (id) => {
    //   const comfirm = confirm("Are you sure you want to delete this post?");
    //   if (comfirm) {
    //     try {
    //       const deletePost = await deleteAdvertisements(id);
    //       if (deletePost) {
    //         toast.success("Advertisement deleted successfully");
    //         router.reload();
    //       }
    //     } catch (error) {
    //       console.error("Failed to delete advertisement:", error.message);
    //       toast.error("Failed to delete advertisement");
    //     }
    //   }
    // };

    useEffect(() => {
        if (status === "unauthenticated" && !session?.user) {
            redirect("/api/auth/signin?callbackUrl=/login");
        }
        if (session?.user) {
            const user = async () => {
                const userDetails = await getUserByEmail(session?.user.email);
                const userObj = JSON.parse(userDetails);
                console.log(userObj);
                setUser(userObj);
                return userObj;
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

    return (
        <>
            {user ? (
                <div className="w-screen min-h-screen flex justify-center items-center overflow-x-hidden">
                    <div className="flex justify-start xl:w-fit h-fit px-10 max-xl:items-center max-xl:flex-wrap w-full gap-10">
                        {/* profile pane */}
                        <div
                            className="profile-pane w-full h-fit xl:max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl 
                        dark:bg-gray-800 dark:border-gray-700 p-10 flex xl:justify-center xl:flex-col max-xl:justify-evenly max-w-screen-sm
                        max-xl:gap-8 sm:flex-row flex-col justify-center
                        "
                        >
                            <div className="head flex flex-col items-center pb-10 ">
                                <h2 className="text-xl text-gray-900 dark:text-white items-center mb-5 font-semibold">
                                    Seller Profile
                                </h2>
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
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {user?.username || "Fetching..."}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400 hover:font-semibold">
                                    <Link href={"/profile"}>Edit Profile</Link>
                                </span>
                            </div>

                            <div className="">
                                <div className="account head flex flex-col items-left pb-10">
                                    <h6 className="text-lg font-bold mb-2">
                                        Account
                                    </h6>
                                    <div className=" mb-2 text-sm">
                                        <div className="flex flex-raw justify-between mb-1">
                                            <span className="font-semibold text-gray-700">
                                                Assert Count
                                            </span>
                                            <span>{user?.posts.length}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="account head flex flex-col items-left pb-10">
                                    <h6 className="text-lg font-bold mb-2">
                                        Contact
                                    </h6>
                                    <div className=" mb-2 text-sm">
                                        <div className="flex flex-raw justify-between mb-1">
                                            <span className="font-semibold text-gray-700">
                                                Email
                                            </span>
                                            <span>
                                                {user?.email || "Fetching..."}
                                            </span>
                                        </div>
                                        <div className="flex flex-raw justify-between mb-1">
                                            <span className="font-semibold text-gray-700">
                                                Phone
                                            </span>
                                            <span>
                                                {user?.contact || "Fetching..."}
                                            </span>
                                        </div>
                                        <div className="flex flex-raw justify-between mb-1">
                                            <span className="font-semibold text-gray-700 mr-4 ">
                                                Address
                                            </span>
                                            <span className="text-right">
                                                {user?.address || "Fetching..."}
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
                                        className=" bg-custom-green-100 text-white text-sm px-4 py-2 shadow-lg sticky right-20 
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

                        <div className="relative sm:rounded-lg my-4 overflow-x-scroll w-full max-xl:shadow-2xl">
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
                                                className=" bg-custom-green-100 text-white text-sm px-4 py-2 shadow-lg sticky right-20 
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
                                <thead className=" w-fit h-fit text-xs text-white  bg-slate-400">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 rounded-s-lg "
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
                                        <th
                                            scope="col"
                                            className="px-6 py-3 rounded-e-lg"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-nowrap">
                                    {user?.posts.map((post) => (
                                        <tr
                                            key={post._id}
                                            className=" shadow-2xl bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white text-wrap"
                                            >
                                                <div className="min-w-60">
                                                    {post.title}
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
                                                <div>Rs.{post.price}</div>
                                                <span className=" text-xs text-gray-400 py-2">
                                                    Perch:{post.perch}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <div>
                                                    Lat :{post.geometry.lat}
                                                </div>
                                                <span className=" text-xs text-gray-400 py-2">
                                                    Lon : {post.geometry.lng}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <div>
                                                    Max:{" "}
                                                    {Number(
                                                        post.predict[
                                                            currentYear
                                                        ]?.max_next
                                                    ).toFixed(2)}
                                                    {" /="}
                                                </div>
                                                <span className=" text-xs text-gray-400 py-2">
                                                    Min:{" "}
                                                    {Number(
                                                        post.predict[
                                                            currentYear
                                                        ]?.min_next
                                                    ).toFixed(2)}
                                                    {" /="}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4  text-gray-900 whitespace-nowrap flex dark:text-white ">
                                                <CgComment
                                                    className="h-6 w-6 font-medium text-blue-700 rounded-sm ml-1 hover:opacity-60 cursor-pointer"
                                                    onClick={() =>
                                                        router.push(
                                                            `/viewAd/${post._id}`
                                                        )
                                                    }
                                                />

                                                <FaRegTrashAlt className="h-5 w-5 font-medium text-red-700 rounded-sm ml-1 hover:opacity-60 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
