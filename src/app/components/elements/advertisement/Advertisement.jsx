"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Advertisement = ({ advertisement }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => setLoading(false), [advertisement]);

    return (
        <Link
            className=" max-w-[400px] min-w-[390px]  h-fit bg-white shadow-xl backdrop-blur-md p-6 rounded-lg  text-left overflow-hidden cursor-pointer hover:bg-slate-100"
            href={`viewAd/${advertisement?._id}`}
            onClick={() => setLoading(true)}
        >
            {loading ? (
                <div className="rounded-md h-72 w-full flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                <div
                    key={advertisement?._id}
                    className={`relative flex justify-between items-center flex-col`}
                >
                    <Image
                        src={advertisement?.images[0].url}
                        alt={advertisement?.images[0].url}
                        width={500}
                        height={500}
                        className="rounded-md h-52"
                        loading="lazy"
                    />

                    <p className="absolute right-0 top-0 font-semibold text-white bg-black/10 backdrop-blur-sm px-4 py-2 mt-4 mr-4 rounded-md">
                        {advertisement?.creationDate.toLocaleDateString(
                            "en-US"
                        )}
                    </p>
                    <h2 className="relative w-full text-justify font-bold mb-2 max-h-[48px] overflow-hidden">
                        {advertisement?.title}
                        <span className=" text-sm font-light absolute bottom-0 right-0 bg-white text-gray-400 text-center pl-2">
                            ... See more
                        </span>
                    </h2>
                    <div className=" w-full text-gray-500 flex flex-col text-sm">
                        <p className="w-full flex justify-between items-center text-gray-800 text-sm">
                            <span className="max-md:hidden">
                                Price (per perch)
                            </span>{" "}
                            <span>
                                LKR{" "}
                                {Number(advertisement?.price).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        toFixed: 2,
                                        maximumFractionDigits: 2,
                                    }
                                )}{" "}
                                /=
                            </span>
                        </p>
                        <p className="w-full flex justify-between items-center text-gray-800 text-sm">
                            <span className="max-md:hidden">Land Types</span>{" "}
                            <span>{advertisement?.landTypes.join(", ")}</span>
                        </p>
                        <p className="w-full flex justify-between items-center text-gray-800 text-sm">
                            <span className="max-md:hidden">Perches </span>
                            <span>{advertisement?.perch}</span>
                        </p>
                    </div>
                    <p className="text-gray-700">{advertisement?.landType}</p>
                </div>
            )}
        </Link>
    );
};

export default Advertisement;
