import Advertisement from "@/app/components/elements/advertisement/Advertisement";
import { getAdvertisements } from "@/lib/serverActions/adActions";
import React from "react";

const ViewAll = async () => {
    const advertisements = await getAdvertisements();

    return (
        <>
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sort</button> */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-52">
                {advertisements.map((advertisement) => (
                    <Advertisement
                        key={advertisement._id}
                        advertisement={advertisement}
                    />
                ))}
            </div>
        </>
    );
};

export default ViewAll;
