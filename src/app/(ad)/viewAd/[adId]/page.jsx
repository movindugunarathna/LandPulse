"use client";
import Image from "next/image";
import ImageComponent from "./components/ImageComponent";
import { useEffect, useRef, useState } from "react";
import { getAdvertisementById } from "@/actions/adActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ChartApp from "@/app/components/Chart/Chart";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function ViewAd() {
    const router = useRouter();
    const [advertisement, setAdvertisement] = useState(null);
    const [growthClicked, setGrowthClicked] = useState(false);
    const [priceStatus, setPriceStatus] = useState(null);
    const pageRef = useRef();

    useEffect(() => {
        const init = async () => {
            try {
                const post = await getAdvertisementById(
                    "65eea09b6c372cf8d3b8032a"
                );
                if (post.code === 200) {
                    toast.success(post.message);
                    post.data.predict = JSON.parse(post.data.predict);
                    setAdvertisement(post.data);
                    console.log(post);
                    if (advertisement) {
                        pageRef.current.scrollIntoView({
                            behavior: "smooth",
                        });
                    }
                } else toast.error(post.message);
            } catch (error) {
                toast.error(error.message);
                router.push("/");
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (advertisement) {
            const currentMonth = new Date().getMonth();
            setPriceStatus(
                advertisement.predict[`${currentMonth}`]?.max_next >
                    advertisement.price &&
                    advertisement.predict[`${currentMonth}`]?.min_next <
                        advertisement.price
            );
        }
    }, [advertisement]);

    const handleBackClick = () => router.back();

    return (
        <div className="w-screen h-full overflow-x-hidden flex justify-center items-center">
            {advertisement ? (
                <div className="w-full h-full flex justify-center items-center flex-col px-6 py-2 md:px-20 md:py-4">
                    <div className="flex w-full justify-start items-center">
                        <Image
                            ref={pageRef}
                            width={40}
                            height={40}
                            src="/icons/icon _arrow_circle_left_.svg"
                            alt="icon arrow circle left"
                            className="w-6 h-6  cursor-pointer"
                            onClick={handleBackClick}
                        />
                        <div>
                            <h1
                                className="lg:text-2xl md:text-lg font-bold px-4 cursor-pointer"
                                onClick={handleBackClick}
                            >
                                {advertisement?.title}
                            </h1>
                        </div>
                    </div>

                    <div className="sm:w-5/6 w-11/12 flex xl:flex-row max-xl:flex-col text-base justify-between items-start gap-8">
                        <div className="xl:w-1/2 w-full h-full py-6 px-5 flex flex-col justify-between">
                            {growthClicked ? (
                                <div className="flex flex-col gap-6">
                                    (
                                    <ChartApp
                                        className={"w-full h-full"}
                                        dataObj={advertisement.predict}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between text-green-400">
                                            <p>Price too high: </p>
                                            <FaRegCircleCheck className="w-6 h-6 " />
                                        </div>
                                        <div className="flex justify-between text-red-400">
                                            <p>Price too Low: </p>
                                            <IoMdCloseCircleOutline className="w-6 h-6 " />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <ImageComponent
                                    imageArray={advertisement?.images}
                                />
                            )}
                            <div className="flex justify-center pt-[6%]">
                                <button
                                    className="bg-custom-green-100 text-white font-bold rounded-md w-2/3 leading-10"
                                    onClick={(event) => {
                                        setGrowthClicked(!growthClicked);
                                    }}
                                >
                                    {growthClicked ? "Hide" : "Check"} Growth
                                </button>
                            </div>
                        </div>
                        <div className="xl:w-1/2 w-full h-full ">
                            <div className="py-2 sm:py-10">
                                <div className="py-2">
                                    <p>
                                        <strong>Title</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            {advertisement?.title}
                                        </span>
                                    </p>
                                </div>
                                <div className="py-2">
                                    <p>
                                        <strong>Description</strong>
                                        <br />
                                        <pre className="text-gray-600">
                                            {advertisement?.description}
                                        </pre>
                                    </p>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-full ">
                                        <p className="font-bold font-sans text-lg pb-[0.5%] pt-[10%]">
                                            Mobile
                                        </p>
                                        <span className="text-gray-600">
                                            {advertisement?.contact}
                                        </span>
                                    </div>
                                    <div className="w-full ">
                                        <p className="font-bold font-sans text-lg pb-[0.5%] pt-[10%]">
                                            Email
                                        </p>
                                        <span className="text-gray-600">
                                            {advertisement?.email}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-full flex items-start flex-col">
                                        <div className="w-full flex justify-start gap-x-6 pb-[0.5%] pt-[8%]">
                                            <p className="font-bold font-sans text-lg">
                                                Price
                                            </p>

                                            {growthClicked &&
                                                (priceStatus ? (
                                                    <FaRegCircleCheck className="w-6 h-6 text-green-400" />
                                                ) : (
                                                    <IoMdCloseCircleOutline className="w-6 h-6 text-red-400" />
                                                ))}
                                        </div>
                                        <div className="flex flex-row gap-8">
                                            <span className="text-gray-600">
                                                Rs.{" "}
                                                {advertisement?.price.toFixed(
                                                    2
                                                )}{" "}
                                                /=
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full ">
                                        <p className="font-bold font-sans text-lg pb-[0.5%] pt-[8%]">
                                            Land Type
                                        </p>
                                        <span className="text-gray-600">
                                            {advertisement?.landTypes.join(
                                                ", "
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-screen h-screen flex justify-center items-center">
                    Loading....
                </div>
            )}
        </div>
    );
}
