import React, { useEffect, useMemo } from "react";
import dataTypes from "@/utils/types.json";

function DistanceCard({ dataObj, className }) {
    const typesObj = useMemo(() => {
        const filteredObj = {};

        dataTypes.forEach((item) => {
            const pairs = {};
            Object.entries(dataObj.Obj).forEach(([key, value]) => {
                if (key.includes(item)) {
                    pairs[key] = value;
                }
            });
            filteredObj[item] = pairs;
        });

        return filteredObj;
    }, [dataObj.Obj]);

    return (
        <div className={className}>
            <div className="bg-gray-100 rounded-md px-8 py-4 flex flex-col justify-evenly text-gray-800">
                <h3 className="font-bold text text-gray-400 text-nowrap">
                    Air polution
                </h3>
                <div className="">
                    <p className="flex justify-between items-center gap-4">
                        Value: <span>{dataObj.Obj.air}</span>
                    </p>
                </div>
            </div>
            {Object.entries(typesObj).map(([key, value]) => (
                <Card key={key} type={key} value={value} />
            ))}
        </div>
    );
}

const Card = ({ type, value: details }) => {
    const count = Object.entries(details).map(([key, value]) => {
        if (key.includes("_count")) {
            return value;
        }
    });

    const mdist = Object.entries(details).map(([key, value]) => {
        if (key.includes("_mdist")) {
            return (Number(value) / 1000).toFixed(2);
        }
    });

    return (
        <>
            {count !== 0 && (
                <div className="bg-gray-100 rounded-md px-8 py-4 flex flex-col justify-evenly text-gray-800">
                    <h3 className="font-bold text text-gray-400">
                        {type.replace("_", " ").charAt(0).toUpperCase() +
                            type.replace("_", " ").slice(1)}
                    </h3>
                    <div>
                        <p className="flex justify-between items-center gap-4">
                            Count: <span>{count}</span>
                        </p>
                        <p className="flex justify-between items-center gap-4">
                            Distance: <span>{mdist}Km</span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default DistanceCard;
