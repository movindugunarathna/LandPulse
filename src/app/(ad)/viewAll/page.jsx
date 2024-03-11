"use client";
import Advertisement from "@/app/components/elements/advertisement/Advertisement";
import { getAdvertisements } from "@/actions/adActions";
import React, { useEffect, useState } from "react";

const ViewAll = () => {
    const postPerPage = 25;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [advertisements, setAdvertisements] = useState(1);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const { advertisements, totalPages } = await getAdvertisements({
                pageNumber,
                pageSize: postPerPage,
            });
            setAdvertisements(advertisements);
            setTotalPages(totalPages);
            setLoading(false);
        };
        load();
    }, [pageNumber]);

    return loading ? (
        <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
            Loading...
        </div>
    ) : (
        <div className="min-h-screen min-w-full flex flex-col gap-10 overflow-x-hidden">
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sort</button> */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-52">
                {advertisements.map((advertisement) => (
                    <Advertisement
                        key={advertisement._id}
                        advertisement={advertisement}
                    />
                ))}
            </div>
            <div className=" w-full h-full flex justify-center items-center gap-4">
                <button
                    className="bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                        if (pageNumber !== 1) {
                            setPageNumber(pageNumber - 1);
                        }
                    }}
                >
                    Back
                </button>
                <div className=" font-bold text-custom-green-100">
                    {pageNumber}
                </div>
                <button
                    className="bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                        if (pageNumber !== totalPages) {
                            setPageNumber(pageNumber + 1);
                        }
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ViewAll;
