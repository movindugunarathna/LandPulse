"use client";
import ImageComponent from "./components/ImageComponent";
import { useEffect, useRef, useState } from "react";
import { getAdvertisementById } from "@/actions/adActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ChartApp from "@/app/components/Chart/Chart";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaArrowDown, FaRegCircleCheck } from "react-icons/fa6";
import DistanceCard from "@/app/components/DistanceCard/DistanceCard";
import { IoCaretBackSharp } from "react-icons/io5";
import LocationView from "@/app/components/LocationView/LocationView";

export default function ViewAd({ params: { adId } }) {
    const router = useRouter();
    const [advertisement, setAdvertisement] = useState(null);
    const [growthClicked, setGrowthClicked] = useState(false);
    const [priceStatus, setPriceStatus] = useState(null);
    const pageRef = useRef();

    useEffect(() => {
        const init = async () => {
            try {
                const post = await getAdvertisementById(adId);
                if (post.code === 200) {
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

    return (
        <div
            className={`w-full h-full overflow-x-hidden flex justify-center items-center ${growthClicked ? "text-custom-green-100" : "text-black"}`}
        >
            {advertisement ? (
                <div className="w-full h-full flex justify-center items-center flex-col px-6 py-2 md:px-20 md:py-4 ">
                    <div className="flex w-full justify-between items-center cursor-pointer">
                        <div
                            className="text-red-500 flex justify-start gap-4 w-fit h-fit"
                            onClick={() => router.back()}
                        >
                            <IoCaretBackSharp className="  w-5 h-5  " />
                            <p>Back</p>
                        </div>
                        <button
                            className=" h-10 text-sm px-5 hover:bg-opacity-80 text-red-500 border border-red-500 
                            rounded-lg leading-10 hover:opacity-50 text-center"
                            onClick={(event) => {
                                setGrowthClicked(!growthClicked);
                            }}
                        >
                            {growthClicked ? "Hide" : "Check"} Growth
                        </button>
                    </div>

                    <div className="w-full flex xl:flex-row max-xl:flex-col justify-between items-start gap-8">
                        <div className="xl:w-1/2 w-full h-full flex flex-col justify-between p-2 sm:p-6 md:p-8 ">
                            {growthClicked ? (
                                <div className="flex flex-col gap-6 ">
                                    <ChartApp
                                        className={
                                            "w-full h-full mt-20 flex justify-center items-center"
                                        }
                                        dataObj={advertisement.predict}
                                    />
                                    <div className="flex flex-col gap-2">
                                        {advertisement.isInputPrice && (
                                            <>
                                                <div className="flex justify-between text-green-400">
                                                    <p>
                                                        Price in perfect range:{" "}
                                                    </p>
                                                    <FaRegCircleCheck className="w-6 h-6 " />
                                                </div>
                                                <div className="flex justify-between text-red-400">
                                                    <p>
                                                        Price too Low or high:{" "}
                                                    </p>
                                                    <IoMdCloseCircleOutline className="w-6 h-6 " />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <ImageComponent
                                    imageArray={advertisement?.images}
                                />
                            )}
                        </div>
                        <div className={`xl:w-1/2 w-full h-full `}>
                            <div className="py-2 sm:py-10">
                                <div className="py-2">
                                    <p>
                                        <p className="pb-[0.5%] pt-[10px]">
                                            Title
                                        </p>
                                        <p className="text-gray-600 pl-4">
                                            {advertisement?.title}
                                        </p>
                                    </p>
                                </div>
                                <div className="py-2">
                                    <p>
                                        <p className="pb-[0.5%] pt-[4%]">
                                            Description
                                        </p>
                                        <pre className="text-gray-600 text-wrap pl-4">
                                            {advertisement?.description}
                                        </pre>
                                    </p>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-full ">
                                        <p className="pb-[0.5%] pt-[10%]">
                                            Mobile
                                        </p>
                                        <span className="text-gray-600 pl-4">
                                            {advertisement?.contact}
                                        </span>
                                    </div>
                                    <div className="w-full ">
                                        <p className="pb-[0.5%] pt-[10%]">
                                            Email
                                        </p>
                                        <span className="text-gray-600 pl-4">
                                            {advertisement?.email}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-full flex items-start flex-col">
                                        <div className="w-full flex justify-start gap-x-6 pb-[0.5%] pt-[10%]">
                                            <p className="">PRICE</p>

                                            {growthClicked &&
                                                advertisement.isInputPrice &&
                                                (priceStatus ? (
                                                    <FaRegCircleCheck className="w-6 h-6 text-green-400" />
                                                ) : (
                                                    <IoMdCloseCircleOutline className="w-6 h-6 text-red-400" />
                                                ))}
                                        </div>
                                        <div className="flex flex-row gap-8">
                                            <span className="text-gray-600 pl-4">
                                                Rs.{" "}
                                                {(
                                                    advertisement?.price *
                                                    advertisement?.perch
                                                ).toFixed(2)}{" "}
                                                /=
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full ">
                                        <p className="pb-[0.5%] pt-[10%]">
                                            Land Type
                                        </p>
                                        <span className="text-gray-600 pl-4">
                                            {advertisement?.landTypes.join(
                                                ", "
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full xl:h-[400px] h-full flex justify-between xl:overflow-y-scroll no-scrollbar  gap-4 max-xl:flex-col mt-10">
                        <LocationView
                            geometry={advertisement.geometry}
                            className={
                                "xl:w-1/2 w-full max-h-[400px] max-xl:h-[400px]  z-0"
                            }
                        />
                        <DistanceCard
                            dataObj={advertisement?.predict}
                            className={
                                "xl:w-1/2 w-full flex xl:flex-wrap gap-4 overflow-x-scroll no-scrollbar p-8"
                            }
                        />
                        <span className="z-10 absolute xl:bottom-10 xl:right-0 xl:rotate-90 -bottom-0 right-0 text-red-500 flex items-center gap-4">
                            scroll{" "}
                            <FaArrowDown className="h-4 w-4 -rotate-90" />
                        </span>
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
