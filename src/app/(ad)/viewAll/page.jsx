"use client";
import React, { useEffect, useState, useRef } from "react";
import { RiFilterLine } from "react-icons/ri";
import Advertisement from "@/app/components/elements/advertisement/Advertisement";
import { getAdvertisements } from "@/actions/adActions";
import { filterOptions } from "@/data/filterOptions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ViewAll = () => {
    const postPerPage = 25;
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [advertisements, setAdvertisements] = useState([]);
    const [filterValue, setFilterValue] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const { advertisements, totalPages } = await getAdvertisements({
                    pageNumber,
                    pageSize: postPerPage,
                    filterValue,
                });
                setAdvertisements(advertisements);
                setTotalPages(totalPages);
                setLoading(false);
            } catch (err) {
                console.log(err);
                toast.error(err.message);
                router.push("/");
            }
        };
        load();
    }, [pageNumber, filterValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return loading ? (
        <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
            Loading...
        </div>
    ) : (
        <div className="min-h-screen min-w-full flex flex-col justify-center items-center gap-10 overflow-x-hidden">
            <div className="w-4/5 h-10 text-sm">
                <div
                    className="relative w-fit rounded-md flex flex-col"
                    ref={dropdownRef}
                >
                    <div
                        className="hover:bg-slate-200 hover:border-black/40 px-2 py-2 bg-white rounded-md border border-black/20 relative flex justify-center items-center"
                        onClick={() => {
                            setDropdownOpen(!dropdownOpen);
                        }}
                    >
                        <RiFilterLine className="h-4 w-4" />
                        <button className="w-36">
                            {Object.keys(filterOptions).find(
                                (key) => filterOptions[key] === filterValue
                            )}
                        </button>
                    </div>

                    <div
                        className={`${dropdownOpen ? "sticky" : "hidden"} bg-slate-50 rounded-md w-full h-16 top-0 left-0 flex flex-col text-center gap-2 overflow-y-scroll no-scrollbar`}
                    >
                        <div className="mt-1"></div>
                        {Object.entries(filterOptions).map(([key, value]) => (
                            <div
                                className="w-full h-full cursor-pointer hover:bg-slate-200"
                                key={value}
                                onClick={() => {
                                    setFilterValue(value);
                                    setDropdownOpen(!dropdownOpen);
                                }}
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-52">
                {advertisements.map((advertisement) => (
                    <Advertisement
                        key={advertisement._id}
                        advertisement={advertisement}
                    />
                ))}
            </div>
            <div className="w-full h-full flex justify-center items-center gap-4">
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
                <div className="font-bold text-custom-green-100">
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
