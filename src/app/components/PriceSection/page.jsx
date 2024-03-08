import React, { useState } from "react";
import InputPrice from "./components/InputPrice";
import PredictPrice from "./components/PredictPrice";
import { useAppSelector } from "@/lib/redux/hooks";

export default function PriceSection({ setPriceDetails, priceDetails }) {
    const [isPricePredict, setIsPricePredict] = useState(true);
    const ad = useAppSelector((state) => state.ad);

    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            setPriceDetails({
                ...priceDetails,
                selected: false,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div
            className=" mt-10 w-full h-full bg-white flex justify-center items-center"
            onClick={handleClick}
        >
            <div className="lg:w-4/5 h-full bg-white rounded-md border border-black z-10 ">
                <form
                    onSubmit={handleSubmit}
                    className="relative w-full h-full flex flex-col justify-between gap-8 p-4 px-8"
                >
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
                            type="submit"
                            className="inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide text-white bg-custom-green-100 hover:bg-lime-900 rounded-lg "
                            value={"Submit"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
