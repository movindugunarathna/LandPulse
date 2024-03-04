import React, { useState } from "react";
import { landTypes } from "@/data/landTypes";

export default function PredictPrice() {
    const [selectedLandTypes, setSelectedLandTypes] = useState([]);

    return (
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
                            if (selectedLandTypes.includes(item.type)) {
                                setSelectedLandTypes(
                                    selectedLandTypes.filter(
                                        (type) => type !== item.type
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
    );
}
