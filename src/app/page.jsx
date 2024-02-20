import Image from "next/image";
import Advertisement from "./components/elements/advertisement/Advertisement";

export default function Home() {
    return (
        <>
            <section>
                <div
                    className="relative w-auto md:h-screen mx-auto"
                    id="hero-banner"
                >
                    <Image
                        className="absolute object-cover w-full"
                        src="/hero-image.jpg"
                        alt=""
                        width={2560}
                        height={1440}
                    />
                    <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
                    <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
                        <h1 className="text-6xl font-bold md:text-5xl text-custom-green-200">
                            Land Awaits Your Imagination
                        </h1>
                        <div className="container text-wrap text-xs leading-relaxed">
                            <p className="mt-4 text-2xl md:text-lg">
                                Welcome to a realm where your imagination knows
                                no bounds.Our collection of pristine land
                                parcels invites you to paint your dreams upon
                                nature&apos;s canvas. Whether you envision a
                                tranquil retreat nestled among trees or aspire
                                to build your legacy in an urban landscape, our
                                diverse listings cater to your unique
                                aspirations. Explore rolling hills, vast plains,
                                or scenic waterfronts each plot holds the
                                promise of your vision. Begin your journey here,
                                where land becomes a space for your creativity
                                to flourish and your dreams to take shape.
                            </p>
                        </div>
                        <div className="">
                            <button className="mt-8 px-8 py-4 bg-gray-700 text-white font-bold text-xl rounded-md mr-5">
                                Explore Land
                            </button>
                            <button className="mt-8 px-8 py-4 bg-gray-400 text-white font-bold text-xl rounded-md">
                                Claim your Spot{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* End of the hero section */}

            {/* Starting featured posts */}
            <section className="flex items-center justify-center">
                <div className="w-full max-w-6xl">
                    <div className="mt-10">
                        <h1 className="text-6xl font-bold md:text-4xl text-center text-custom-green-100">
                            Your Dream Awaits,
                            <br />
                            Explore Vast Landscapes for Your Vision.
                        </h1>
                        <p className="mt-5 text-justify">
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
                    {/* Must create an array and map the info fetch from DB!!! */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        <Advertisement
                            image={""}
                            landType="Bare"
                            price="$500,000"
                            pricePer="$10,000 per acre"
                            headline="Beautiful Farmland for Sale"
                            description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
                        />

                        <Advertisement
                            image={""}
                            landType="Agricultural"
                            price="$500,000"
                            pricePer="$10,000 per acre"
                            headline="Beautiful Farmland for Sale"
                            description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
                        />
                        <Advertisement
                            image={""}
                            landType="Agricultural"
                            price="$500,000"
                            pricePer="$10,000 per acre"
                            headline="Beautiful Farmland for Sale"
                            description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
                        />
                        <Advertisement
                            image={""}
                            landType="Agricultural"
                            price="$500,000"
                            pricePer="$10,000 per acre"
                            headline="Beautiful Farmland for Sale"
                            description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
                        />
                        <Advertisement
                            image={""}
                            landType="Agricultural"
                            price="$500,000"
                            pricePer="$10,000 per acre"
                            headline="Beautiful Farmland for Sale"
                            description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
                        />

                        <Advertisement
                            image={""}
                            landType="Bare"
                            price="$500,000"
                            pricePer="$10,000 per acre"
                            headline="Beautiful Farmland for Sale"
                            description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
                        />
                    </div>
                    <div className="flex items-center justify-center h-20 space-x-2">
                        <button className="bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </div>
                </div>
            </section>
            {/* Ending featured posts */}
        </>
    );
}
