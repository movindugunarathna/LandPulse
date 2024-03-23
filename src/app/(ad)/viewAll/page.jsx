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
    const [advertisements, setAdvertisements] = useState(null);
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
        <div className="min-h-screen min-w-full flex flex-col justify-between items-center gap-10 overflow-x-hidden">
            <div className="w-full h-10 text-sm z-10 flex justify-center md:justify-between items-start mt-10 sticky top-0 md:px-52">
                <div
                    className="relative w-fit rounded-md shadow-sm flex flex-col"
                    ref={dropdownRef}
                >
                    <div
                        className="hover:bg-slate-100 px-2 py-2 bg-white rounded-md shadow-xl relative flex justify-center 
                        items-center z-10"
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
                        className={`${dropdownOpen ? "sticky" : "hidden"} shadow-md bg-white rounded-md w-full h-32 top-0 left-0 flex 
                        flex-col text-center gap-2 overflow-y-scroll no-scrollbar`}
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
                <div className="max-md:hidden w-fit h-fit flex justify-center items-center gap-8">
                    Page {pageNumber}
                </div>
            </div>

            <div className=" w-full flex flex-wrap gap-10 justify-center items-stretch pt-5 lg:px-24">
                {advertisements ? (
                    advertisements?.map((advertisement) => (
                        <Advertisement
                            key={advertisement._id}
                            advertisement={advertisement}
                        />
                    ))
                ) : (
                    <>No Advertisements Yet...</>
                )}
            </div>
            <div className="w-full h-full flex justify-between items-center md:px-52 sm:px-24 px-8">
                {pageNumber == 1 && (
                    <button
                        className={`border border-black/50 hover:bg-lime-900 text-black hover:text-white 
                         py-1 px-5 rounded-lg`}
                        type="button"
                        onClick={() => {
                            if (pageNumber !== 1) {
                                setPageNumber(pageNumber - 1);
                            }
                        }}
                    >
                        Back
                    </button>
                )}
                <div className="text-black">Page {pageNumber}</div>
                {pageNumber == totalPages && (
                    <button
                        className={`border border-black/50 hover:bg-lime-900 text-black hover:text-white 
                     py-1 px-5 rounded-lg`}
                        type="button"
                        onClick={() => {
                            if (pageNumber !== totalPages) {
                                setPageNumber(pageNumber + 1);
                            }
                        }}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default ViewAll;
