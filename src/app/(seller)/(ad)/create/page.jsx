"use client";
import Dropzone from "@/app/components/Dropzone/dropzone";
import PriceSection from "@/app/components/PriceSection/page";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setBasic } from "@/lib/redux/adSlice";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import DistanceCard from "@/app/components/DistanceCard/DistanceCard";
import ChartApp from "@/app/components/Chart/Chart";
import { FaArrowDown } from "react-icons/fa";
import { AdvertisementSchema } from "@/lib/zodSchema/schema";
import { toast } from "sonner";
import { saveAdvertisements } from "@/actions/adActions";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CreateAd() {
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const dispatch = useAppDispatch();
    const ad = useAppSelector((state) => state.ad);
    const [priceSection, setPriceSection] = useState({
        selected: false,
        value: parseFloat(ad.price) * parseFloat(ad.perch),
    });
    const [priceStatus, setPriceStatus] = useState(null);
    const { data: session, status } = useSession();
    const [surround, setSurround] = useState(null);
    const [instructionAppear, setInstructionAppear] = useState(true);
    const [showChart, setShowChart] = useState(false);
    const [firstRender, setFirstRender] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const errRef = useRef(null);
    const scrollRef = useRef(null);
    const errorMsgTimeOut = 6000;

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        if (status === "unauthenticated" && !session?.user) {
            redirect("/api/auth/signin?callbackUrl=/login");
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
                value: parseFloat(ad.price) * parseFloat(ad.perch),
            });
            setPriceStatus(
                ad.predict[`${currentMonth}`]?.max_next > ad.price &&
                    ad.predict[`${currentMonth}`]?.min_next < ad.price
            );
            setSurround(ad.predict);
        }
    }, [priceSection.selected]);

    useEffect(() => {
        setTimeout(() => {
            setErrMsg("");
        }, errorMsgTimeOut);

        if (errMsg !== "") {
            errRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [errMsg]);

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

    const submitAdPost = async () => {
        try {
            setLoading(true);
            const dataParse = AdvertisementSchema.safeParse(ad);

            if (dataParse.success) {
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
                setErrMsg(issue_1.path + " " + issue_1?.message);
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
        <div className="overflow-hidden">
            {priceSection.selected && (
                <PriceSection
                    className={
                        "absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center"
                    }
                    setPriceDetails={setPriceSection}
                    priceDetails={priceSection}
                />
            )}
            <div className="w-screen h-full flex justify-center items-center">
                {loading ? (
                    <div className="w-full h-screen flex justify-center items-center">
                        Loading...
                    </div>
                ) : (
                    <div className="w-fit overflow-hidden h-full flex flex-col justify-center items-center">
                        {instructionAppear && (
                            <div className="w-screen h-screen flex flex-col justify-center items-center">
                                <div className="relative w-fit h-fit p-4">
                                    <IoMdCloseCircleOutline
                                        className="absolute top-0 right-0 w-6 h-6 text-red-400 hover:cursor-pointer"
                                        onClick={() =>
                                            setInstructionAppear(
                                                !instructionAppear
                                            )
                                        }
                                    />
                                    <div className=" bg-gray-100 p-8 rounded-md">
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
                                    className="w-40 mt-5 bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded
                                    flex gap-x-2 justify-center items-center focus:outline-none focus:shadow-outline"
                                    onClick={() => {
                                        scrollRef.current.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    Scroll <FaArrowDown />
                                </button>
                            </div>
                        )}

                        <div
                            className=" relative w-screen min-h-screen flex justify-center items-center flex-col"
                            ref={scrollRef}
                        >
                            <div className="md:w-4/5 w-full flex justify-end">
                                <button
                                    id="publish"
                                    name="publish"
                                    className="mt-5 bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={submitAdPost}
                                >
                                    Publish
                                </button>
                            </div>

                            <div
                                className="sticky top-20 text-red-400 h-7"
                                ref={errRef}
                            >
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
                                                    className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight 
                                                        focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer"
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
                                                    ).toFixed(2)}{" "}
                                                    /=
                                                </span>
                                                <div
                                                    className="w-6 h-6 cursor-pointer"
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
                                                        (priceStatus ? (
                                                            <FaRegCircleCheck className="w-full h-full text-green-400" />
                                                        ) : (
                                                            <IoMdCloseCircleOutline className="w-full h-full text-red-400" />
                                                        ))}
                                                    {showChart &&
                                                        ad.price !== 0 && (
                                                            <ChartApp
                                                                className={
                                                                    "w-[500px] h-[400px] p-2 bg-white absolute bottom-0 left-0 flex justify-center items-center flex-col"
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
                        </div>
                        {surround && (
                            <div className="w-full overflow-x-scroll no-scrollbar">
                                <DistanceCard
                                    className={
                                        "distanceCard h-full p-8 flex gap-x-10"
                                    }
                                    dataObj={ad.predict}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
