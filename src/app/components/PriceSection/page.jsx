"use client";
import React, { useEffect, useState, useRef } from "react";
import InputPrice from "./components/InputPrice";
import PredictPrice from "./components/PredictPrice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toast } from "sonner";
import { setBasic, setPredict, setInputPriceBool } from "@/lib/redux/adSlice";
import { pricePredict } from "@/actions/mlActions";

export default function PriceSection({
    setPriceDetails,
    priceDetails,
    className,
}) {
    const [isPricePredict, setIsPricePredict] = useState(true);
    const ad = useAppSelector((state) => state.ad);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const priceTabRef = useRef(null);

    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            setPriceDetails({
                ...priceDetails,
                selected: false,
            });
        }
    };

    useEffect(() => {
        priceTabRef.current.scrollIntoView({
            behavior: "smooth",
        });
    }, []);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            if (isPricePredict) {
                const data = await pricePredict({
                    geometry: ad.geometry,
                    landTypes: ad.landTypes,
                });
                dispatch(setPredict({ value: data }));
                setPriceDetails({
                    ...priceDetails,
                    selected: false,
                });

                dispatch(
                    setBasic({
                        field: "price",
                        value: parseFloat(data?.price),
                    })
                );

                dispatch(
                    setInputPriceBool({
                        bool: false,
                    })
                );
            } else if (ad.price !== 0 && ad.price) {
                const data = await pricePredict({
                    geometry: ad.geometry,
                    landTypes: ad.landTypes,
                });
                dispatch(setPredict({ value: data }));
                setPriceDetails({
                    ...priceDetails,
                    selected: false,
                });

                dispatch(
                    setInputPriceBool({
                        bool: true,
                    })
                );
            } else toast.error("Please Input price");
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    };

    return (
        <div ref={priceTabRef} className={className} onClick={handleClick}>
            <div className="lg:w-3/5 h-fit bg-white rounded-md shadow-xl hover:shadow-2xl z-10 py-4">
                <div className="relative w-full h-full flex flex-col justify-between gap-8 p-4 px-8">
                    <div className=" absolute top-0 left-0 p-4 max-sm:px-10  w-full h-fit justify-center">
                        <div className="flex items-center justify-center ">
                            <div
                                className={`w-1/3 py-2 font-medium text-center 
                            ${isPricePredict ? "capitalize border-b-2 border-blue-400 text-blue-400 " : "capitalize border-b dark:border-gray-400 dark:text-gray-300"} 
                            hover:cursor-pointer`}
                                onClick={() => setIsPricePredict(true)}
                            >
                                Predict
                            </div>

                            <div
                                className={`w-1/3 py-2 font-medium text-center
                            ${!isPricePredict ? "capitalize border-b-2 border-blue-400 text-blue-400" : "capitalize border-b dark:border-gray-400 dark:text-gray-300"}
                            hover:cursor-pointer`}
                                onClick={() => setIsPricePredict(false)}
                            >
                                Input
                            </div>
                        </div>
                    </div>

                    <div className="relative my-10 w-full h-full">
                        {loading && (
                            <div className="absolute top-0 left-0 z-10 bg-white w-full h-full flex justify-center items-center">
                                Loading...
                            </div>
                        )}
                        {isPricePredict ? <PredictPrice /> : <InputPrice />}
                    </div>

                    <div className=" absolute bottom-0 left-0 w-full h-fit text-center p-4 px-8 flex justify-between items-center bg-white">
                        <input
                            type="button"
                            className=" text-red-500 border border-red-500 hover:bg-red-500 hover:text-white 
                            px-20 py-2 max-sm:px-[10%] shadow-lg sticky sm:right-20 top-0 rounded text-sm cursor-pointer"
                            value={"Cancel"}
                            onClick={handleClick}
                        />
                        <input
                            type="button"
                            className=" text-green-500 border border-green-500 hover:bg-green-500 hover:text-white 
                            px-20 py-2 max-sm:px-[10%] shadow-lg sticky sm:right-20 top-0 rounded text-sm cursor-pointer"
                            value={"Submit"}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
