"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { getUserByID } from "@/actions/userActions";
import { useState } from "react";

export default function Dashboard({ userData }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated" && !session?.user) {
            redirect("/api/auth/signin?callbackUrl=/login");
        }

        if (session?.user) {
            const user = async () => {
                const userDetails = await getUserByID(session?.user.email);
                const userObj = JSON.parse(userDetails);
                console.log(userObj);
                setUser(userObj);
                return userObj;
            };
            user();
        }
    }, [session, session?.user, status]);

    return (
        <>
            {user ? (
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
                                {user?.username || "Fetching..."}
                            </h5>
                          <span className="text-sm text-gray-500 dark:text-gray-400 hover:font-semibold">
                                <button onClick={() => {
                    console.log("Redirecting to edit page");
                    router.push("/profile");
                }}>Edit Profile</button>
                          </span>
                        </div>

            <div className="account head flex flex-col items-left pb-10">
              <h6 className="text-lg font-bold mb-2">Account</h6>
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
              <h6 className="text-lg font-bold mb-2">Contact</h6>
              <div className=" mb-2 text-sm">
                <div className="flex flex-raw justify-between mb-1">
                  <span className="font-semibold text-gray-700">Email</span>
                  <span>{user?.email || "Fetching..."}</span>
                </div>
                <div className="flex flex-raw justify-between mb-1">
                  <span className="font-semibold text-gray-700">Phone</span>
                  <span>{user?.contact || "Fetching..."}</span>
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
          {/* profile panne ends here */}

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
                  <div className="flex justify-center py-2">
                    <button
                      className="px-2 py- bg
                    -lime-700 text-white rounded-lg bg-lime-700 text-sm hover:bg-lime-800"
                      type="button"
                      onClick={() => {
                        console.log("Redirecting to create page");
                        router.push("/create");
                      }}
                    >
                      Create Post
                    </button>
                  </div>
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
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {user?.posts.map((post) => (
                  <tr
                    key={post._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 text-center dark:text-white"
                    >
                      <div>{post.title}</div>
                      <span className=" text-xs text-gray-400 py-2">
                        {post.creationDate.split("T")[0]}
                      </span>
                    </th>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <div>Rs.{post.price}</div>
                      <span className=" text-xs text-gray-400 py-2">
                        Perch:{post.perch}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <div>Lat :{post.geometry.lat}</div>
                      <span className=" text-xs text-gray-400 py-2">
                        Lon : {post.geometry.lng}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <div>Max: {post.predict[1].max_next}</div>
                      <span className=" text-xs text-gray-400 py-2">
                        {post.predict[1].min_next}
                      </span>
                    </td>
                    <td className="px-6 py-4  text-gray-900 whitespace-nowrap flex dark:text-white ">
                      <button className="font-medium text-white dark:text-white bg-lime-700 px-3 py-1 rounded-sm hover:bg-lime-800">
                        View
                      </button>
                      <button className="font-medium text-white dark:text-white bg-red-600 px-3 py-1 rounded-sm ml-1 hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
