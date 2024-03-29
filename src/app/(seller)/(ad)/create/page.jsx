"use client";
import Dropzone from "@/app/components/Dropzone/dropzone";
import PriceSection from "@/app/components/PriceSection/page";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setBasic } from "@/lib/redux/adSlice";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaArrowUp, FaRegCircleCheck } from "react-icons/fa6";
import DistanceCard from "@/app/components/DistanceCard/DistanceCard";
import ChartApp from "@/app/components/Chart/Chart";
import { FaArrowDown } from "react-icons/fa";
import { AdvertisementSchema } from "@/lib/zodSchema/schema";
import { toast } from "sonner";
import { saveAdvertisements } from "@/actions/adActions";

export const dynamic = "force-dynamic";

export default function CreateAd() {
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const dispatch = useAppDispatch();
    const ad = useAppSelector((state) => state.ad);
    const [priceSection, setPriceSection] = useState({
        selected: false,
        value: parseFloat(ad.price),
    });
    const [priceStatus, setPriceStatus] = useState(null);
    const { data: session, status } = useSession();
    const [surround, setSurround] = useState(null);
    const [instructionAppear, setInstructionAppear] = useState(true);
    const [showChart, setShowChart] = useState(false);
    const [firstRender, setFirstRender] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);
    const errorMsgTimeOut = 6000;

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        if (status === "unauthenticated" && !session?.user) {
            router.push("/api/auth/signin?callbackUrl=/login");
        }
        if (session?.user) {
            const { user } = session;
            setUserId(user.id);
        }
    }, [session, session?.user, status]);

    useEffect(() => {
        if (ad.price !== 0) {
            console.log("Price available");
            const currentMonth = new Date().getMonth();
            setPriceSection({
                ...priceSection,
                value: parseFloat(ad.price),
            });
            setPriceStatus(
                ad.predict[`${currentMonth}`]?.max_next > ad.price &&
                    ad.predict[`${currentMonth}`]?.min_next < ad.price
            );
            setSurround(ad.predict);
        }
    }, [priceSection.selected]);

    useEffect(() => {
        if (priceSection.selected === false && firstRender) {
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
        setFirstRender(true);
    }, [priceSection.selected]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "perch") {
            dispatch(
                setBasic({
                    value: parseFloat(value),
                    field: name,
                })
            );
        } else
            dispatch(
                setBasic({
                    value: value,
                    field: name,
                })
            );
    };

    useEffect(() => {
        setTimeout(() => {
            setErrMsg("");
        }, errorMsgTimeOut);
    }, [errMsg]);

    const submitAdPost = async () => {
        try {
            setLoading(true);
            const dataParse = AdvertisementSchema.safeParse(ad);

            if (dataParse.success && ad?.images.length > 0) {
                toast.info("submition pending...");
                const res = await saveAdvertisements({
                    ...dataParse.data,
                    userId,
                });
                console.log(res);
                if (res.data.acknowledged) {
                    toast.success(res.message);
                    console.log(res.data);
                    router.push("/dashboard");
                } else toast.success("Something went wrong!");
            } else if (dataParse.error) {
                const issue_1 = dataParse.error?.issues[0];
                console.log(
                    issue_1.path +
                        " Received: " +
                        issue_1.received +
                        " , Error: " +
                        issue_1?.message
                );
                setErrMsg(issue_1?.message);
            } else if (!(ad?.images.length > 0)) {
                setErrMsg("At least one image must be selected");
            } else {
                setErrMsg("Something went wrong!");
            }
            console.log(dataParse);
        } catch (error) {
            console.log(error);
            setErrMsg(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="relative overflow-hidden">
            {priceSection.selected && (
                <PriceSection
                    className={
                        " z-20 absolute bottom-0 left-0 w-full min-h-screen backdrop-blur-sm flex justify-center items-center"
                    }
                    setPriceDetails={setPriceSection}
                    priceDetails={priceSection}
                />
            )}
            <div className="w-screen h-full flex justify-center items-center">
                {loading ? (
                    <div className="w-full min-h-screen flex justify-center items-center">
                        Loading...
                    </div>
                ) : (
                    <div className="w-fit overflow-hidden h-full flex flex-col justify-center items-center">
                        {instructionAppear && (
                            <div className="w-full w-max-[1350px] min-h-screen flex flex-col justify-center items-center">
                                <div className="relative w-fit h-fit p-4">
                                    <IoMdCloseCircleOutline
                                        className="absolute top-0 right-0 w-6 h-6 text-red-400 hover:cursor-pointer"
                                        onClick={() =>
                                            setInstructionAppear(
                                                !instructionAppear
                                            )
                                        }
                                    />
                                    <div className=" bg-gray-100 p-8 rounded-md  shadow-xl hover:shadow-2xl">
                                        <h2 className="text-lg font-bold mb-2">
                                            Advertisement Posting Instructions:
                                        </h2>
                                        <ol className="list-decimal pl-4">
                                            <li>
                                                Click on the price field to open
                                                the popup.
                                            </li>
                                            <li>
                                                In the popup, select the land
                                                type and location from the
                                                options provided.
                                            </li>
                                            <li>
                                                Choose the &apos;Input&apos; tab
                                                to manually input the price or
                                                the &apos;Predict&apos; tab to
                                                get a predicted price.
                                            </li>
                                            <li>
                                                If inputting manually, submit
                                                the form to set the price.
                                            </li>
                                            <li>
                                                A green checkmark or a red cross
                                                icon will appear next to the
                                                price based on its validity.
                                            </li>
                                            <li>
                                                The chosen or predicted price
                                                will appear in the main
                                                advertisement price field.
                                            </li>
                                            <li>
                                                To edit details or price, click
                                                on the price field and follow
                                                the same steps.
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <button
                                    id="scroll"
                                    name="scroll"
                                    className="w-40 mt-5 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded
                                    flex gap-x-2 justify-center items-center focus:outline-none focus:shadow-outline"
                                    onClick={() => {
                                        scrollRef.current.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    <FaArrowDown className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        <div
                            className=" relative w-screen min-h-screen flex justify-center items-center flex-col mt-20"
                            ref={scrollRef}
                        >
                            <div className=" max-lg:hidden md:w-4/5 w-full flex justify-end">
                                <button
                                    id="publish"
                                    name="publish"
                                    className=" hover:text-green-500 border hover:border-green-500 hover:bg-white bg-green-500 
                                    text-white px-10 py-2 shadow-lg sticky right-20 top-0 rounded text-sm"
                                    onClick={submitAdPost}
                                >
                                    Publish
                                </button>
                            </div>

                            <div className="sticky top-20 text-red-400 h-7">
                                {errMsg}
                            </div>

                            <div className="w-fit grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-lg">
                                <div className="text-center">
                                    <Dropzone className="p-5 mt-2 border border-neutral-200" />
                                </div>
                                <div className="relative h-full flex justify-between flex-col">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="title"
                                            className="block text-gray-700 font-bold mb-2 text-left "
                                        >
                                            Title:
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            placeholder="Enter your title here..."
                                            value={ad.title}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="description"
                                            className="block text-gray-700 font-bold mb-2 text-left"
                                        >
                                            Description:
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="5"
                                            cols="50"
                                            placeholder="Enter your description here..."
                                            value={ad.description}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
                                        ></textarea>
                                    </div>

                                    <div className=" mb-4 flex justify-between items-center">
                                        {/* price */}
                                        <div className="w-1/2">
                                            <label
                                                htmlFor="price"
                                                className="block text-gray-700 font-bold mb-2 text-left"
                                            >
                                                Price (per perch):
                                            </label>
                                            <div className="w-full h-fit flex gap-2 justify-start items-center">
                                                <span
                                                    className={` relative appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight 
                                                        focus:outline-none focus:shadow-outline ${priceSection.value === 0 ? " bg-red-100 hover:bg-red-200" : "bg-green-100 hover:bg-green-200"} 
                                                        shadow-md hover:shadow-lg cursor-pointer`}
                                                    onClick={() => {
                                                        console.log(
                                                            "Selected price"
                                                        );
                                                        setPriceSection({
                                                            ...priceSection,
                                                            selected: true,
                                                        });
                                                    }}
                                                >
                                                    Rs.{" "}
                                                    {Number(
                                                        priceSection.value
                                                    ).toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        toFixed: 2,
                                                        maximumFractionDigits: 2,
                                                    })}{" "}
                                                    /=
                                                    <span
                                                        className="absolute top-0 right-0 h-full w-fit flex items-center justify-center p-3 text-sm 
                                                    text-black/30 backdrop-blur-md"
                                                    >
                                                        click
                                                    </span>
                                                </span>
                                                <div
                                                    className="w-6 h-6 cursor-pointer flex items-center"
                                                    onMouseEnter={() =>
                                                        setShowChart(true)
                                                    }
                                                    onMouseLeave={() =>
                                                        setShowChart(false)
                                                    }
                                                    onClick={() => {
                                                        setShowChart(true);
                                                    }}
                                                >
                                                    {ad.price !== 0.0 &&
                                                        (ad.isInputPrice ? (
                                                            priceStatus ? (
                                                                <FaRegCircleCheck className="w-full h-full text-green-400" />
                                                            ) : (
                                                                <IoMdCloseCircleOutline className="w-full h-full text-red-400" />
                                                            )
                                                        ) : (
                                                            <FaArrowUp className="w-full h-2/3 text-purple-400" />
                                                        ))}
                                                    {showChart &&
                                                        ad.price !== 0 && (
                                                            <ChartApp
                                                                className={
                                                                    "w-[500px] h-[400px] shadow-2xl p-4 bg-white absolute bottom-0 left-0 flex justify-center items-center flex-col"
                                                                }
                                                                dataObj={
                                                                    ad.predict
                                                                }
                                                            />
                                                        )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* perch */}
                                        <div className="text-nowrap w-1/2">
                                            <label
                                                htmlFor="perch"
                                                className="block text-gray-700 font-bold mb-2 text-left"
                                            >
                                                Perch:
                                            </label>
                                            <input
                                                type="number"
                                                id="perch"
                                                name="perch"
                                                placeholder="Enter your perch here..."
                                                value={ad.perch}
                                                onChange={handleInputChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* mobile view  */}
                            {surround && ad.predict?.Obj && (
                                <div className="p-8 w-full overflow-x-scroll max-md:no-scrollbar">
                                    <DistanceCard
                                        className={
                                            "distanceCard h-full p-8 flex gap-x-10"
                                        }
                                        dataObj={ad.predict}
                                    />
                                </div>
                            )}
                            <div className=" lg:hidden md:w-4/5 w-full flex justify-center">
                                <button
                                    id="publish"
                                    name="publish"
                                    className=" hover:text-green-500 border hover:border-green-500 hover:bg-white bg-green-500
                                     text-white px-10 py-2 shadow-lg sticky right-20 top-0 rounded text-sm"
                                    onClick={submitAdPost}
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
