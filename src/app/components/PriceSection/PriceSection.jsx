import React, { useState } from "react";

const landTypes = [
    { type: "Agricultural", value: 1 },
    { type: "Commercial", value: 2 },
    { type: "Residential", value: 3 },
    { type: "Other", value: 4 },
];

export default function PriceSection({ setPriceDetails, priceDetails }) {
    const [isPricePredict, setIsPricePredict] = useState(true);
    const [selectedLandTypes, setSelectedLandTypes] = useState([]);

    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            setPriceDetails({
                ...priceDetails,
                selected: false,
            });
        }
    };

    return (
        <div
            className="absolute top-0 left-0 m-0 p-0 w-screen h-screen bg-white bg-opacity-60 flex justify-center items-center z-0"
            onClick={handleClick}
        >
            <div className="w-2/3 h-2/3 bg-white rounded-md border border-black z-10">
                <form
                    onSubmit={() => onSubmit()}
                    className="w-full h-full flex flex-col justify-between gap-8 p-4 px-8"
                >
                    <div className="w-full max-w-md">
                        <div className="flex items-center justify-center mt-6">
                            <div
                                className={`w-1/3 pb-4 font-medium text-center 
                            ${isPricePredict ? "text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white" : "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"} 
                            hover:cursor-pointer`}
                                onClick={() => setIsPricePredict(true)}
                            >
                                Predict
                            </div>

                            <div
                                className={`w-1/3 pb-4 font-medium text-center 
                            ${!isPricePredict ? "text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white" : "text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"}
                            hover:cursor-pointer`}
                                onClick={() => setIsPricePredict(false)}
                            >
                                Input
                            </div>
                        </div>
                    </div>

                    {isPricePredict ? (
                        <div className="w-full h-full">
                            <label
                                htmlFor="price"
                                className="block text-gray-700 font-bold mb-2 text-left"
                            >
                                Land Type:
                            </label>
                            <div className=" w-full flex justify-start items-center gap-4">
                                {landTypes.map((item) => (
                                    <input
                                        key={item.value}
                                        type="button"
                                        className={`inline-flex items-center justify-center px-4 py-1 font-sans font-semibold tracking-wide 
                                        border ${selectedLandTypes.includes(item.type) ? "bg-gray-400" : "border-black"} rounded-lg`}
                                        value={item.type}
                                        onClick={() => {
                                            if (
                                                selectedLandTypes.includes(
                                                    item.type
                                                )
                                            ) {
                                                setSelectedLandTypes(
                                                    selectedLandTypes.filter(
                                                        (type) =>
                                                            type !== item.type
                                                    )
                                                );
                                            } else
                                                setSelectedLandTypes([
                                                    ...selectedLandTypes,
                                                    item.type,
                                                ]);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            <label
                                htmlFor="price"
                                className="block text-gray-700 font-bold mb-2 text-left"
                            >
                                Selling Price:
                            </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                            />
                        </div>
                    )}

                    <div className="mt-6 text-center w-full flex justify-between items-center">
                        <input
                            type="button"
                            className="inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide 
                            border border-black rounded-lg "
                            value={"Cancel"}
                            onClick={handleClick}
                        />
                        <input
                            type="submit"
                            className="inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg "
                            value={"Submit"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
