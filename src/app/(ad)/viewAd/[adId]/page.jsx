"use client";
import Image from "next/image";
import ImageComponent from "./components/ImageComponent";
import { advertisement } from "../../../data/advertisement";
import { useEffect, useState } from "react";

// function test(){
//   console.log("Test");
// }

// const test1=()=>{
//   console.log("Test");
// }

export default function ViewAd() {
    // var var1 = true;
    const [var1, setVar1] = useState(true);
    useEffect(() => {
        console.log("Test");
    }, [var1]);
    return (
        <div className="px-20 py-10">
            <div className="flex">
                <div>
                    <Image
                        width={40}
                        height={40}
                        src="/icons/icon _arrow_circle_left_.svg"
                        alt="Advertisement Image"
                        className="w-8 h-8"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">
                        {advertisement.headline}
                    </h1>
                </div>
            </div>

            <div className="flex xl:flex-row max-sm:flex-col text-base">
                <div className="flex-1 py-10">{<ImageComponent />}</div>
                <div className="flex-1 ">
                    <div className="py-10">
                        <div className="py-2">
                            <p>
                                <strong>Title</strong>
                                <br />
                                <span className="text-gray-600">
                                    {advertisement.headline}
                                </span>
                            </p>
                        </div>
                        <div className="py-2">
                            <p>
                                <strong>Description</strong>
                                <br />
                                <span className="text-gray-600">
                                    {advertisement.description}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <div className="w-1/2 py-2">
                                <p>
                                    <strong>Mobile</strong>
                                </p>
                                <span className="text-gray-600">
                                    {advertisement.mobile}
                                </span>
                            </div>
                            <div className="w-1/2 py-2">
                                <p>
                                    <strong>Email</strong>
                                </p>
                                <span className="text-gray-600">
                                    {advertisement.email}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="w-1/2 flex items-start py-2 flex-col">
                                <p>
                                    <strong>Price</strong>
                                </p>
                                <div className="flex flex-row ">
                                    <span className="text-gray-600">
                                        {advertisement.price}
                                    </span>
                                    <Image
                                        width={38}
                                        height={37}
                                        src="/icons/icon _check_circle_.svg"
                                        alt="icon check circle"
                                        className="w-6 h-6"
                                    />
                                </div>
                            </div>
                            <div className="w-1/2 py-2">
                                <p>
                                    <strong>Land Type</strong>
                                </p>
                                <span className="text-gray-600">
                                    {advertisement.landType}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-custom-green-100 text-white font-bold px-4 py-2 rounded-md w-full"
                            onClick={(event) => {
                                setVar1(!var1);
                                console.log("loading");
                            }}
                        >
                            Check Growth
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
