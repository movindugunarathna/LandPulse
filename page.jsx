import Image from "next/image";
import Advertisement from "./components/elements/advertisement/Advertisement";
import { getAdvertisements } from "@/actions/adActions";
import Link from "next/link";

export default async function Home() {
    const { advertisements } = await getAdvertisements({
        pageNumber: 1,
        pageSize: 3,
    });

    return (
        <>
            <section>
                <div
                    className="relative w-auto md:h-screen mx-auto"
                    id="hero-banner"
                >
                    <Image
                        className="absolute object-cover w-full h-full"
                        src="/hero-image.jpg"
                        alt=""
                        width={2560}
                        height={1440}
                    />
                    <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
                    <div className="relative z-10 flex flex-col justify-center items-center h-screen text-center text-white gap-10">
                        <h1 className="text-2xl font-bold md:text-5xl text-custom-green-200">
                            Land Awaits Your Imagination
                        </h1>
                        <p className="w-1/3 mt-4 md:text-lg text-wrap text-justify leading-relaxed">
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
                        <div className="">
                            <Link
                                className="mt-8 px-8 py-4 bg-gray-700 text-white font-bold text-xl rounded-md mr-5"
                                href={"/viewAll"}
                            >
                                Explore Land
                            </Link>
                            <Link
                                className="mt-8 px-8 py-4 bg-custom-green-100 text-white font-bold text-xl rounded-md"
                                href={"/login"}
                            >
                                Claim your Spot{" "}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* End of the hero section */}

            {/* Starting featured posts */}
            <section className="flex items-center justify-center">
                <div className="w-full max-w-6xl">
                    <div className="mt-10">
                        <h1 className="text-2xl md:text-4xl font-bold text-center text-custom-green-100">
                            Your Dream Awaits,
                            <br />
                            Explore Vast Landscapes for Your Vision.
                        </h1>
                        <p className="mt-5 text-justify text-lg mx-4">
                            Embark on a journey to find the canvas for your
                            dreams midst sprawling landscapes that await your
                            vision. Our curated selection of expansive terrains
                            offers a tapestry of possibilities, ready to be
                            shaped according to your desires. Whether it&apos;s
                            a serene retreat enveloped by nature&apos;s embrace
                            or a bustling expanse primed for innovation, our
                            diverse array of land listings caters to every
                            aspiration. Unearth the ideal backdrop for your
                            dreams, where endless horizons meet limitless
                            potential. Begin your exploration today and discover
                            the space that resonates with your unique vision.
                        </p>
                    </div>
                    <div className="w-full flex flex-wrap justify-center items-center gap-10">
                        {advertisements.map((advertisement) => (
                            <Advertisement
                                key={advertisement._id}
                                advertisement={advertisement}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-center h-20 space-x-2">
                        <Link
                            className="bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded"
                            href={`/viewAll`}
                        >
                            Next
                        </Link>
                    </div>
                </div>
            </section>
            {/* Ending featured posts */}
        </>
    );
}
