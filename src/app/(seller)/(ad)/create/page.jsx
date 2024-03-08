"use client";
import Dropzone from "@/app/components/Dropzone/dropzone";
import PriceSection from "@/app/components/PriceSection/page";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";\
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setBasic } from "@/lib/redux/adSlice";

export const dynamic = "force-dynamic";

export default function CreateAd() {
    const dispatch = useAppDispatch();
    const ad = useAppSelector((state) => state.ad);
    const [priceSection, setPriceSection] = useState({
        selected: false,
        value: ad.price,
    });
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated" && !session?.user) {
            redirect("/api/auth/signin?callbackUrl=/login");
        }
        console.log(session);
    }, [session, session?.user, status]);

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
                <>
                    <h2 className="text-3xl font-bold text-gray-800 mt-10 ml-10">
                        Create Advertisement
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-lg">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
                                <div className="mb-4 md:mr-5">
                                    <label
                                        htmlFor="price"
                                        className="block text-gray-700 font-bold mb-2 text-left"
                                    >
                                        Price:
                                    </label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline mb-5 bg-slate-200 cursor-pointer"
                                        readOnly
                                        value={`Rs. ${priceSection.value}`}
                                        onChange={() => {}}
                                        onClick={() => {
                                            console.log("Selected price");
                                            setPriceSection({
                                                ...priceSection,
                                                selected: true,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                id="publish"
                                name="publish"
                                className="bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Publish
                            </button>
                        </form>
                    </div>
                </>
            )}

        </>
    );
}
