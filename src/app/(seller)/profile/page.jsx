"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SignUpSchema, updateSchema } from "@/lib/zodSchema/schema";
import { readFileAsync } from "@/utils/readFiles";
import {
    getUserByEmail,
    updateUserByEmail,
    updateUserById,
} from "@/actions/userActions";
import {
    FaAddressBook,
    FaMobileAlt,
    FaUpload,
    FaWindowClose,
} from "react-icons/fa";
import Image from "next/image";

export default function Page() {
    const { status, data: session } = useSession();
    const filesize = 1000000;
    const router = useRouter();
    const [fileName, setFileName] = useState("Profile Photo");
    const [errorMsg, setErrorMsg] = useState("");

    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const {
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const contactChange = (e) => {
        setUser({ ...user, contact: e.target.value });
    };

    const addressChange = (e) => {
        setUser({ ...user, address: e.target.value });
    };

    const onSubmit = async (data) => {
        console.log(data);
        const userOb = {
            contact: user.contact,
            address: user.address,
            profile: user.profile,
        };
        const comfirm = confirm("Are you sure you want to Make this changes?");
        if (comfirm) {
            try {
                const validation = await updateSchema.safeParse(userOb);
                if (validation.success) {
                    const updateUser = await updateUserByEmail(
                        session?.user.email,
                        userOb
                    );
                    toast.success("Profile updated successfully");
                    console.log(updateUser);
                    router.push("/dashboard");
                } else if (validation.error) {
                    const issue_1 = validation.error?.issues[0];

                    toast.error(
                        issue_1.path +
                            " Received: " +
                            issue_1.received +
                            " , Error: " +
                            issue_1?.message
                    );
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const onError = (errors, e) => {
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

    function deleteFile() {
        setImage(null);
        setFile(null);
        setFileName("Profile Photo");
    }

    const imageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const profileImage = await readFileAsync(e.target.files[0]);
            setUser({ ...user, profile: profileImage });
        }
    };

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

        console.log(user);
    }, [session?.user]);

    return (
        <>
            {user ? (
                <section className="bg-white dark:bg-gray-900">
                    <div className="container flex mt-4 justify-center min-h-screen px-6 mx-auto">
                        <div className="w-full max-w-md">
                            <h1 className="text-4xl font-semibold text-gray-700  text-center dark:text-white">
                                {" "}
                                Edit Profile
                            </h1>
                            <div className="flex items-center justify-center mt-6">
                                <form
                                    onSubmit={handleSubmit(onSubmit, onError)}
                                >
                                    {/* image */}

                                    <div className="profile-image flex flex-col items-center pb-10">
                                        <div className="rounded-full w-60 h-60 object-cover overflow-hidden">
                                            <Image
                                                className="rounded-full w-60 h-60 object-cover overflow-hidden"
                                                width={240}
                                                height={240}
                                                src={
                                                    user?.profile?.url ||
                                                    "/avatar.png"
                                                }
                                                alt="profile image"
                                            />
                                        </div>
                                    </div>

                                    {/* profile */}
                                    <label
                                        htmlFor="profile"
                                        className="relative flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900 overflow-hidden"
                                    >
                                        <FaUpload className="w-4 text-gray-300 dark:text-gray-500" />

                                        <h2 className="mx-3 text-gray-400">
                                            {fileName}
                                        </h2>
                                        {image !== null && (
                                            <FaWindowClose
                                                className="w-[5px]] h-[80%] absolute top-2 right-2 opacity-40"
                                                onClick={deleteFile}
                                            />
                                        )}

                                        <input
                                            id="profile"
                                            type="file"
                                            name="profile"
                                            accept="image/jpeg, image/png, image/jpeg, image/webp"
                                            className="hidden"
                                            maxLength={1}
                                            onChange={async (event) => {
                                                if (event.target.files[0]) {
                                                    const targetFile =
                                                        event.target.files[0];

                                                    if (
                                                        targetFile.size >
                                                        filesize
                                                    ) {
                                                        toast.error(
                                                            "File size should be less than 1mb"
                                                        );
                                                    } else {
                                                        setFileName(
                                                            targetFile?.name
                                                        );
                                                        try {
                                                            setImage(
                                                                await readFileAsync(
                                                                    targetFile
                                                                )
                                                            );
                                                        } catch (error) {
                                                            toast.error(
                                                                error.message
                                                            );
                                                        }
                                                        setFile(targetFile);
                                                        imageChange(event);
                                                    }
                                                } else deleteFile();
                                            }}
                                            aria-errormessage={
                                                errors?.profile?.message
                                            }
                                            onFocus={() =>
                                                errors?.profile?.message
                                            }
                                        />
                                        <div className=""></div>
                                    </label>

                                    {/* contact number */}
                                    <div className="relative flex items-center mt-4">
                                        <FaMobileAlt className="absolute w-4 mx-3 text-gray-300 dark:text-gray-500" />

                                        <input
                                            id="contact"
                                            type="number"
                                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            placeholder={"Contact Number"}
                                            value={user?.contact || ""}
                                            onChange={contactChange}
                                            aria-errormessage={
                                                errors?.contact?.message
                                            }
                                            onFocus={() =>
                                                errors?.contact?.message
                                            }
                                        />
                                    </div>

                                    {/* address */}
                                    <div className="relative flex items-center mt-4">
                                        <FaAddressBook className="absolute top-4 w-4 mx-3 text-gray-300 dark:text-gray-500" />

                                        <textarea
                                            id="address"
                                            type="text"
                                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            placeholder="Address"
                                            value={user?.address || ""}
                                            onChange={addressChange}
                                            aria-errormessage={
                                                errors?.address?.message
                                            }
                                            onFocus={() =>
                                                errors?.address?.message
                                            }
                                        />
                                    </div>

                                    <div className="relative flex items-center mt-4">
                                        <p className="h-2 w-full text-red-500 text-center">
                                            {errorMsg}
                                        </p>
                                    </div>

                                    <button
                                        className="w-full mt-6 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-custom-green-100 rounded-lg hover:bg-custom-green-300 focus:outline-none focus:ring focus:ring-lime-300 focus:ring-opacity-50"
                                        type="submit"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="w-screen h-screen flex justify-center items-center">
                    Loading...
                </div>
            )}
        </>
    );
}
