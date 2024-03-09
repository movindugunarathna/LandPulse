"use client";
import Dropzone from "@/app/components/Dropzone/dropzone";
import PriceSection from "@/app/components/PriceSection/page";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setBasic } from "@/lib/redux/adSlice";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { predictReturn } from "@/data/advertisement";

export const dynamic = "force-dynamic";

export default function CreateAd() {
    const dispatch = useAppDispatch();
    const ad = useAppSelector((state) => state.ad);
    const [priceSection, setPriceSection] = useState({
        selected: false,
        value: ad.price,
    });
    const [priceStatus, setPriceStatus] = useState(null);
    const { data: session, status } = useSession();
    const [surround, setSurround] = useState(predictReturn);

    useEffect(() => {
        if (status === "unauthenticated" && !session?.user) {
            redirect("/api/auth/signin?callbackUrl=/login");
        }
        console.log(session);
    }, [session, session?.user, status]);

    useEffect(() => {
        if (ad.prce !== 0.0) {
            const currentYear = new Date().getMonth();
            setPriceSection({ ...priceSection, value: ad.price });
            setPriceStatus(
                ad.predict[`month__${currentYear}`]?.max_next > ad.price &&
                    ad.predict[`month__${currentYear}`]?.min_next < ad.price
            );
            setSurround(ad.predict);
        }
    }, [priceSection.selected]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        dispatch(
            setBasic({
                value: value,
                field: name,
            })
        );
    };

    return (
        <>
            {priceSection.selected ? (
                <PriceSection
                    setPriceDetails={setPriceSection}
                    priceDetails={priceSection}
                />
            ) : (
                <div className="w-full h-screen flex flex-col justify-center items-center">
                    <div className="w-fit grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-lg">
                        <div className="text-center">
                            <Dropzone className="p-5 mt-2 border border-neutral-200" />
                        </div>
                        <form action="/submit_form" method="post">
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="block text-gray-700 font-bold mb-2 text-left "
                                >
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter your title here..."
                                    value={ad.title}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-gray-700 font-bold mb-2 text-left"
                                >
                                    Description:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    cols="50"
                                    placeholder="Enter your description here..."
                                    value={ad.description}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                                ></textarea>
                            </div>
                            <div className="mb-4 md:mr-5">
                                <label
                                    htmlFor="price"
                                    className="block text-gray-700 font-bold mb-2 text-left"
                                >
                                    Price:
                                </label>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <span
                                        className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline bg-slate-200 cursor-pointer"
                                        onClick={() => {
                                            console.log("Selected price");
                                            setPriceSection({
                                                ...priceSection,
                                                selected: true,
                                            });
                                        }}
                                    >
                                        Rs.{" "}
                                        {Number(priceSection.value).toFixed(2)}{" "}
                                        /=
                                    </span>
                                    {ad.price !== 0.0 &&
                                        (priceStatus ? (
                                            <FaRegCircleCheck className=" w-6 h-6 text-green-400" />
                                        ) : (
                                            <IoMdCloseCircleOutline className=" w-6 h-6 text-red-400" />
                                        ))}
                                </div>
                            </div>
                            <button
                                id="publish"
                                name="publish"
                                className="mt-5 bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Publish
                            </button>
                        </form>
                    </div>
                    {surround !== null && <div></div>}
                </div>
            )}
        </>
    );
}
