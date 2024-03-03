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
        <div className="px-6 py-2 md:px-20 md:py-4">
            <div className="flex">
                <div>
                    <Image
                        width={40}
                        height={40}
                        src="/icons/icon _arrow_circle_left_.svg"
                        alt="icon arrow circle left"
                        className="w-8 h-8"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold px-4">
                        {advertisement.headline}
                    </h1>
                </div>
            </div>

            <div className="flex xl:flex-row max-sm:flex-col text-base">
                <div className="flex-1 py-6 px-5">{<ImageComponent />}</div>
                <div className="flex-1 ">
                    <div className="py-2 sm:py-10">
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
                            <div className="w-1/2 ">
                                <p className="font-bold font-sans text-lg pb-[0.5%] pt-[10%]">
                                    Mobile
                                </p>
                                <span className="text-gray-600">
                                    {advertisement.mobile}
                                </span>
                            </div>
                            <div className="w-1/2 ">
                                <p className="font-bold font-sans text-lg pb-[0.5%] pt-[10%]">
                                    Email
                                </p>
                                <span className="text-gray-600">
                                    {advertisement.email}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="w-1/2 flex items-start flex-col">
                                <p className="font-bold font-sans text-lg pb-[0.5%] pt-[8%]">
                                    Price
                                </p>
                                <div className="flex flex-row gap-8">
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
                            <div className="w-1/2 ">
                                <p className="font-bold font-sans text-lg pb-[0.5%] pt-[8%]">
                                    Land Type
                                </p>
                                <span className="text-gray-600">
                                    {advertisement.landType}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center pt-[6%]">
                        <button
                            className="bg-custom-green-100 text-white font-bold rounded-md w-full leading-10"
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
