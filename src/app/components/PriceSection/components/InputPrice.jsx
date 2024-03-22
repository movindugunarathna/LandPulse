import React from "react";
import GoogleMapComp from "../../GoogleMap/GoogleMapSearch";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setLandTypes } from "@/lib/redux/adSlice";
import { landTypes } from "@/data/landTypes";
import { setBasic } from "@/lib/redux/adSlice";

export default function InputPrice() {
    const dispatch = useAppDispatch();
    const ad = useAppSelector((state) => state.ad);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "price") {
            dispatch(
                setBasic({
                    value: parseFloat(value),
                    field: name,
                })
            );
        }
    };
    return (
        <div className="w-full h-full">
            <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2 text-left"
            >
                Selling Price Per Perch (Rs.):
            </label>
            <input
                type="number"
                id="price"
                name="price"
                value={ad.price}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
            />

            <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2 text-left"
            >
                Land Type:
            </label>
            <div className=" w-full flex justify-start items-center gap-4  flex-wrap">
                {landTypes.map((item) => (
                    <input
                        key={item.value}
                        type="button"
                        className={`px-4 py-1 inline-flex items-center justify-center font-sans font-semibold tracking-wide hover:shadow-xl
                                    border ${
                                        ad.landTypes.includes(item.type)
                                            ? "bg-purple-500 text-white"
                                            : "text-purple-500 border border-purple-500"
                                    } rounded-md cursor-pointer`}
                        value={item.type}
                        onClick={() => {
                            if (ad.landTypes.includes(item.type)) {
                                dispatch(
                                    setLandTypes({
                                        value: ad.landTypes.filter(
                                            (type) => type !== item.type
                                        ),
                                    })
                                );
                            } else
                                dispatch(
                                    setLandTypes({
                                        value: [...ad.landTypes, item.type],
                                    })
                                );
                        }}
                    />
                ))}
            </div>
            <label
                htmlFor="location"
                className="block text-gray-700 font-bold mt-3 text-left"
            >
                Pick the Location:
            </label>

            <GoogleMapComp className="w-full h-96 mt-1" />
        </div>
    );
}
