"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SignUpSchema } from "@/lib/zodSchema/schema";
import { readFileAsync } from "@/utils/readFiles";
import {
  FaAddressBook,
  FaMobileAlt,
  FaUpload,
  FaUser,
  FaWindowClose,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Page() {
  const { status, data: session } = useSession();
  const filesize = 1000000;
  const router = useRouter();

  const [showPswrd, setShowPswrd] = useState(false);
  const [fileName, setFileName] = useState("Profile Photo");
  const [errorMsg, setErrorMsg] = useState("");

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
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

  useEffect(() => {
    if (status === "unauthenticated" && !session?.user) {
      redirect("/api/auth/signin?callbackUrl=/login");
    }
    console.log(session);
  }, [session, session?.user, status]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mt-6">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              {/* username */}
              <div className="relative flex items-center mt-8">
                <FaUser className="absolute w-4 mx-3 text-gray-300 dark:text-gray-500" />

                <input
                  id="username"
                  type="text"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Username"
                  {...register("username")}
                  aria-errormessage={errors?.username?.message}
                  onFocus={() => errors?.username?.message}
                />
              </div>

              {/* profile */}
              <label
                htmlFor="profile"
                className="relative flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900 overflow-hidden"
              >
                <FaUpload className="w-4 text-gray-300 dark:text-gray-500" />

                <h2 className="mx-3 text-gray-400">{fileName}</h2>
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
                      const targetFile = event.target.files[0];

                      if (targetFile.size > filesize) {
                        toast.error("File size should be less than 1mb");
                      } else {
                        setFileName(targetFile?.name);
                        try {
                          setImage(await readFileAsync(targetFile));
                        } catch (error) {
                          toast.error(error.message);
                        }
                        setFile(targetFile);
                      }
                    } else deleteFile();
                  }}
                  aria-errormessage={errors?.profile?.message}
                  onFocus={() => errors?.profile?.message}
                />
                <div className=""></div>
              </label>

              {/* email */}
              <div className="relative flex items-center mt-6">
                <IoMail className="absolute w-6 mx-3 text-gray-300 dark:text-gray-500" />

                <input
                  type="email"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                  {...register("email")}
                  aria-errormessage={errors?.email?.message}
                  onFocus={() => errors?.email?.message}
                />
              </div>

              {/* contact number */}
              <div className="relative flex items-center mt-4">
                <FaMobileAlt className="absolute w-4 mx-3 text-gray-300 dark:text-gray-500" />

                <input
                  id="contact"
                  type="number"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Mobile number"
                  {...register("contact")}
                  aria-errormessage={errors?.contact?.message}
                  onFocus={() => errors?.contact?.message}
                />
              </div>

              {/* password */}
              <div className="relative flex items-center mt-4">
                <RiLockPasswordLine className="absolute w-5 mx-3 text-gray-300 dark:text-gray-500" />

                <input
                  type={showPswrd ? "text" : "password"}
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
                  {showPswrd ? (
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

              {/* address */}
              <div className="relative flex items-center mt-4">
                <FaAddressBook className="absolute top-4 w-4 mx-3 text-gray-300 dark:text-gray-500" />

                <textarea
                  id="address"
                  type="text"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Address"
                  {...register("address")}
                  aria-errormessage={errors?.address?.message}
                  onFocus={() => errors?.address?.message}
                />
              </div>

              <div className="relative flex items-center mt-4">
                <p className="h-2 w-full text-red-500 text-center">
                  {errorMsg}
                </p>
              </div>

              <button
                className="w-full mt-6 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                type="submit"
              >
                SignUp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
