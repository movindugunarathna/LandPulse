import React, { useState } from "react";
import { landTypes } from "@/data/landTypes";
import GoogleMapComp from "../../GoogleMap/GoogleMapSearch";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setLandTypes } from "@/lib/redux/adSlice";

export default function PredictPrice() {
    const dispatch = useAppDispatch();
    const ad = useAppSelector((state) => state.ad);

    return (
        <div className="">
            <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2 text-left"
            >
                Land Type:
            </label>
            <div className=" w-full flex justify-start items-center gap-4 flex-wrap ">
                {landTypes.map((item) => (
                    <input
                        key={item.value}
                        type="button"
                        className={`inline-flex items-center justify-center px-4 py-1 font-sans font-semibold tracking-wide 
                                    border ${ad.landTypes.includes(item.type) ? "bg-gray-400" : "border-black"} rounded-lg`}
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
