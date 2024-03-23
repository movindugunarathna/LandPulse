import React from "react";

const details = [
    {
        topic: "About LandPulse",
        description: (
            <p>
                LandPulse is a platform on which you can buy and sell different
                types of lands and properties! Select your desired location and
                start browsing
            </p>
        ),
    },
    {
        topic: "Have lands or properties to sell?",
        description: (
            <ul>
                <li>Sign up for a free account to start selling your items!</li>
                <li>
                    It only takes less than 2 minutes to post an ad. We have an
                    in-built price forecasting system for you to deduce and
                    decide the true value of your property
                </li>
                <li>
                    What are you waiting for? Create an account, post your ad,
                    and start selling!
                </li>
            </ul>
        ),
    },
    {
        topic: "Looking to buy a land or property?",
        description: (
            <ul>
                <li>
                    LandPulse has the widest selection of items all over Sri
                    Lanka
                </li>
                <li>
                    Whether you&apos;re looking for residential, agricultural,
                    commercial, or industrial, you will find the best deal on
                    Landpulse.
                </li>
                <li>
                    Our search and filters make it super easy to find exactly
                    what you&apos;re looking for!
                </li>
            </ul>
        ),
    },
];

const Page = () => {
    return (
        <div>
            <div className=" bg-custom-green-100 text-white p-4 flex justify-between items-center my-10">
                <h1>LandPulse - Buy and Sell</h1>
            </div>
            <div className=" w-full sm:min-h-screen flex flex-col justify-evenly items-center flex-wrap gap-4">
                <div className="main flex w-full flex-wrap gap-x-4 p-2 gap-y-8">
                    {details.map((item) => (
                        <div
                            key={item.topic}
                            className="w-full md:w-1/4 p-4 mx-auto shadow-xl min-w-[420px] flex flex-col gap-4"
                        >
                            <h2 className="font-bold">{item.topic}</h2>
                            <div className="pl-4">{item.description}</div>
                        </div>
                    ))}
                </div>
                <div
                    id="terms"
                    className=" md:w-2/3 xl:p-10 p-10 mx-auto shadow-xl"
                >
                    <h2 className="font-bold">Our Terms and conditions</h2>
                    <p className="pl-4 ">
                        By accessing or using LandPulse, you agree to abide by
                        the following terms and conditions. You may use
                        LandPulse for personal, non-commercial purposes only and
                        must comply with all applicable laws and regulations.
                        Users are responsible for the accuracy and legality of
                        their uploaded content and must not violate intellectual
                        property rights or upload objectionable material.
                        LandPulse collects and uses personal information in
                        accordance with its Privacy Policy. LandPulse and its
                        suppliers are not liable for any damages arising from
                        the use of the platform. These terms are governed by the
                        laws of Sri Lanka, and users agree to the exclusive
                        jurisdiction of the courts in that jurisdiction.
                        LandPulse may revise these terms at any time, and
                        continued use constitutes acceptance of the current
                        terms and conditions.
                    </p>
                </div>
                <div
                    id="contact-info"
                    className="w-full p-4 bg-gray-200 shadow-md mx-auto flex justify-evenly text-center max-md:flex-wrap"
                >
                    <div className="w-1/4 min-w-[190px]">
                        <h3 className="font-bold mt-4">Call us</h3>
                        <p>011 2 891 678</p>
                    </div>
                    <div className="w-1/4 min-w-[190px]">
                        <h2 className="font-bold">Questions? Get in touch!</h2>
                        <p>9am - 6pm on weekdays</p>
                        <p>8am - 5pm on weekends and mercantile holidays</p>
                    </div>
                    <div className="w-1/4 min-w-[190px]">
                        <h3 className="font-bold mt-4">Email us</h3>
                        <p>
                            <a
                                href="mailto:support@Landpulse.lk"
                                className="text-blue-500"
                            >
                                support@LandPulse.lk
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
