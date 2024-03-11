import React, { useEffect, useState, useRef } from "react";
import InputPrice from "./components/InputPrice";
import PredictPrice from "./components/PredictPrice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { pricePredictSchema } from "@/lib/zodSchema/schema";
import { toast } from "sonner";
import { setBasic, setPredict, setInputPriceBool } from "@/lib/redux/adSlice";
import axios from "axios";

export default function PriceSection({
    setPriceDetails,
    priceDetails,
    className,
}) {
    const [isPricePredict, setIsPricePredict] = useState(true);
    const ad = useAppSelector((state) => state.ad);
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
        try {
            const inputData = {
                geometry: ad.geometry,
                landTypes: ad.landTypes,
            };

            const priceInputPass = pricePredictSchema.safeParse(inputData);

            if (priceInputPass.success) {
                const { geometry, landTypes } = priceInputPass.data;
                toast.info("Waiting for price prediction !!!");

                const response = await axios.post(
                    "http://127.0.0.1:5000/predict",
                    {
                        latitude: geometry.lat,
                        longitude: geometry.lng,
                        landType: landTypes.join(" ,"),
                        radius: 1000,
                    }
                );

                const data = response.data;

                if (response.status === 200) {
                    // const data = predictReturn;
                    // if (true) {
                    dispatch(setPredict({ value: data }));
                    setPriceDetails({
                        ...priceDetails,
                        selected: false,
                    });

                    if (isPricePredict) {
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
                    } else {
                        dispatch(
                            setInputPriceBool({
                                bool: true,
                            })
                        );
                    }

                    toast.success("Price Input Success");
                } else {
                    const errorMessage =
                        response.data.error || response.statusText;
                    toast.error(errorMessage || "Something went wrong !!!");
                }
            } else {
                const issue_1 = priceInputPass.error?.issues[0];
                console.log(
                    issue_1.path +
                        " Received: " +
                        issue_1.received +
                        " , Error: " +
                        issue_1?.message
                );
                toast.error(issue_1?.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div ref={priceTabRef} className={className} onClick={handleClick}>
            <div className="lg:w-3/5 h-fit bg-white rounded-md border border-black z-10 ">
                <div className="relative w-full h-full flex flex-col justify-between gap-8 p-4 px-8">
                    <div className=" absolute top-0 left-0 p-4 max-sm:px-10  w-full h-fit justify-center">
                        <div className="flex items-center justify-center">
                            <div
                                className={`w-1/3 py-2 font-medium text-center 
                            ${isPricePredict ? "text-gray-800 capitalize border-b-2 border-custom-green-100 dark:border-blue-400 dark:text-white" : "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"} 
                            hover:cursor-pointer`}
                                onClick={() => setIsPricePredict(true)}
                            >
                                Predict
                            </div>

                            <div
                                className={`w-1/3 py-2 font-medium text-center
                            ${!isPricePredict ? "text-gray-800 capitalize border-b-2 border-custom-green-100 dark:border-blue-400 dark:text-white" : "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"}
                            hover:cursor-pointer`}
                                onClick={() => setIsPricePredict(false)}
                            >
                                Input
                            </div>
                        </div>
                    </div>

                    <div className="py-10 w-full h-full">
                        {isPricePredict ? <PredictPrice /> : <InputPrice />}
                    </div>

                    <div className=" absolute bottom-0 left-0 w-full h-fit text-center p-4 px-8 flex justify-between items-center bg-white">
                        <input
                            type="button"
                            className="inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide 
                            border border-black rounded-lg "
                            value={"Cancel"}
                            onClick={handleClick}
                        />
                        <input
                            type="button"
                            className="inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide text-white bg-custom-green-100 hover:bg-lime-900 rounded-lg "
                            value={"Submit"}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
