"use client";
import Image from "next/image";
import Advertisement from "./components/elements/advertisement/Advertisement";
import { getAdvertisements } from "@/actions/adActions";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function Page() {
    const [advertisements, setAdvertisements] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const { advertisements } = await getAdvertisements({
                    pageNumber: 1,
                    pageSize: 3,
                });
                setAdvertisements(advertisements);
            } catch (error) {
                toast.error(error.message);
            }
        };

        load();
    }, []);

    return (
        <>
            <section>
                <div
                    className="relative w-auto h-screen mx-auto flex justify-center items-center"
                    id="hero-banner"
                >
                    <Image
                        className="absolute object-cover w-full h-full"
                        src="/hero-image.jpg"
                        alt=""
                        width={2560}
                        height={1440}
                        loading="eager"
                    />
                    <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
                    <div
                        className="relative md:h-fit md:py-32 lg:w-2/3 h-fit py-8 px-6 md:px-20 rounded-3xl bg-black/30 backdrop-blur-sm z-10 flex flex-col 
                    justify-center items-center text-center text-white md:gap-10 gap-4"
                    >
                        <h1 className=" text-2xl sm:text-3xl font-bold md:text-5xl text-white capitalize">
                            LAND AWAITS YOUR IMAGINATION
                        </h1>
                        <p className="w-full mt-4 text-sm md:text-lg text-wrap text-justify leading-relaxed">
                            Welcome to a realm where your imagination knows no
                            bounds.Our collection of pristine land parcels
                            invites you to paint your dreams upon nature&apos;s
                            canvas. Whether you envision a tranquil retreat
                            nestled among trees or aspire to build your legacy
                            in an urban landscape, our diverse listings cater to
                            your unique aspirations. Explore rolling hills, vast
                            plains, or scenic waterfronts each plot holds the
                            promise of your vision. Begin your journey here,
                            where land becomes a space for your creativity to
                            flourish and your dreams to take shape.
                        </p>
                        <div className="w-full flex max-md:flex-col justify-center items-center md:gap-6 gap-2">
                            <Link
                                className="md:mt-8 md:px-8 px-4 md:py-4 py-2 max-md:w-full bg-custom-green-100 text-white font-bold text-xl rounded-md"
                                href={"/login"}
                            >
                                Claim your Spot{" "}
                            </Link>
                            <Link
                                className="md:mt-8 md:px-8 px-4 md:py-4 py-2 max-md:w-full bg-white text-custom-green-100 font-bold text-xl rounded-md"
                                href={"/viewAll"}
                            >
                                Explore Land
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* End of the hero section */}

            {/* Starting featured posts */}
            {advertisements ? (
                <section className="w-full h-full flex items-center justify-center mt-24">
                    <div className="w-full max-w-6xl">
                        <div className="">
                            <h1 className="text-2xl md:text-4xl font-bold text-center text-custom-green-100">
                                Your Dream Awaits,
                                <br />
                                Explore Vast Landscapes for Your Vision.
                            </h1>
                            <p className="mt-5 text-justify text-sm md:text-lg mx-4">
                                Embark on a journey to find the canvas for your
                                dreams midst sprawling landscapes that await
                                your vision. Our curated selection of expansive
                                terrains offers a tapestry of possibilities,
                                ready to be shaped according to your desires.
                                Whether it&apos;s a serene retreat enveloped by
                                nature&apos;s embrace or a bustling expanse
                                primed for innovation, our diverse array of land
                                listings caters to every aspiration. Unearth the
                                ideal backdrop for your dreams, where endless
                                horizons meet limitless potential. Begin your
                                exploration today and discover the space that
                                resonates with your unique vision.
                            </p>
                        </div>
                        <div className="flex flex-wrap xl:flex-nowrap gap-10 justify-center items-stretch mt-5">
                            {advertisements?.map((advertisement) => (
                                <Advertisement
                                    key={advertisement._id}
                                    advertisement={advertisement}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-center h-20 space-x-2 mt-5">
                            <Link
                                className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded"
                                href={`/viewAll`}
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="w-full h-full py-10 flex justify-center items-center">
                    Loading...
                </section>
            )}
            {/* Ending featured posts */}
        </>
    );
}
