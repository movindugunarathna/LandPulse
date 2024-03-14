"use client";
import ImageComponent from "./components/ImageComponent";
import { useEffect, useRef, useState } from "react";
import { getAdvertisementById } from "@/actions/adActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ChartApp from "@/app/components/Chart/Chart";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import DistanceCard from "@/app/components/DistanceCard/DistanceCard";
import { IoCaretBackSharp } from "react-icons/io5";

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

    return (
        <div
            className={`w-full h-full overflow-x-hidden flex justify-center items-center ${growthClicked ? "text-custom-green-100" : "text-black"}`}
        >
            {advertisement ? (
                <div className="w-full h-full flex justify-center items-center flex-col px-6 py-2 md:px-20 md:py-4">
                    <div className="flex w-full justify-between items-center cursor-pointer">
                        <div
                            className="flex justify-start gap-4 w-fit h-fit"
                            onClick={() => router.back()}
                        >
                            <IoCaretBackSharp className="w-5 h-5  " />
                            <p>BACK</p>
                        </div>
                        <button
                            className="py-2 px-4  bg-black hover:bg-opacity-80 text-white font-bold rounded-md leading-10 hover:scale-105 focus:bg-custom-green-100"
                            onClick={(event) => {
                                setGrowthClicked(!growthClicked);
                            }}
                        >
                            {growthClicked ? "Hide" : "Check"} Growth
                        </button>
                    </div>

                    <div className="w-full flex xl:flex-row max-xl:flex-col text-base justify-between items-start gap-8">
                        <div className="xl:w-1/2 w-full h-full flex flex-col justify-between shadow-xl p-4 sm:p-6 md:p-8 ">
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
                                                    <p>Price too high: </p>
                                                    <FaRegCircleCheck className="w-6 h-6 " />
                                                </div>
                                                <div className="flex justify-between text-red-400">
                                                    <p>Price too Low: </p>
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
                                        <strong>TITLE</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            {advertisement?.title}
                                        </span>
                                    </p>
                                </div>
                                <div className="py-2">
                                    <p>
                                        <strong>DESCRIPTION</strong>
                                        <br />
                                        <pre className="text-gray-600 text-wrap">
                                            {advertisement?.description}
                                        </pre>
                                    </p>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-full ">
                                        <p className="font-bold font-sans text-lg pb-[0.5%] pt-[10%]">
                                            MOBILE
                                        </p>
                                        <span className="text-gray-600">
                                            {advertisement?.contact}
                                        </span>
                                    </div>
                                    <div className="w-full ">
                                        <p className="font-bold font-sans text-lg pb-[0.5%] pt-[10%]">
                                            EMAIL
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
                                                PRICE
                                            </p>

                                            {growthClicked &&
                                                advertisement.isInputPrice &&
                                                (priceStatus ? (
                                                    <FaRegCircleCheck className="w-6 h-6 text-green-400" />
                                                ) : (
                                                    <IoMdCloseCircleOutline className="w-6 h-6 text-red-400" />
                                                ))}
                                        </div>
                                        <div className="flex flex-row gap-8">
                                            <span className="text-gray-600">
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
                                        <p className="font-bold font-sans text-lg pb-[0.5%] pt-[8%]">
                                            LAND TYPE
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
                    <div className="w-full h-full">
                        <DistanceCard
                            dataObj={advertisement?.predict}
                            className={
                                "flex gap-4 overflow-x-scroll no-scrollbar p-8"
                            }
                        />
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
