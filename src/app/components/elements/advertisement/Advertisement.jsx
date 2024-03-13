import Image from "next/image";
import Link from "next/link";

const Advertisement = ({ advertisement }) => {
    return (
        <Link
            className=" max-w-[400px]  h-fit bg-white shadow-xl backdrop-blur-md p-6 rounded-lg  text-left overflow-hidden cursor-pointer hover:bg-slate-100"
            href={`viewAd/${advertisement._id}`}
        >
            <div
                key={advertisement._id}
                className="relative flex justify-between items-center flex-col"
            >
                <Image
                    src={advertisement.images[0].url}
                    alt={advertisement.images[0].url}
                    width={500}
                    height={500}
                    className="rounded-md h-52"
                />
                <p className="absolute right-0 font-semibold text-white bg-black/40 px-4 py-2 mt-4 mr-4 rounded-md">
                    {advertisement.creationDate.toLocaleDateString("en-US")}
                </p>

                <h2 className="w-full text-justify font-bold mb-2">
                    {advertisement.title}
                </h2>
                <div className=" w-full text-gray-500 flex flex-col text-sm">
                    <p className="w-full flex justify-between items-center text-gray-800 text-sm">
                        <span className="max-sm:hidden">
                            Price (per perch){" "}
                        </span>
                        <span>
                            LKR {Number(advertisement.price).toFixed(2)} /=
                        </span>
                    </p>
                    <p className="w-full flex justify-between items-center text-gray-800 text-sm">
                        <span className="max-sm:hidden">Perches </span>
                        <span>{advertisement.landTypes.join(", ")}</span>
                    </p>
                    <p className="w-full flex justify-between items-center text-gray-800 text-sm">
                        <span className="max-sm:hidden">Land Types</span>{" "}
                        <span>{advertisement.perch}</span>
                    </p>
                </div>
                <p className="text-gray-700">{advertisement.landType}</p>
            </div>
        </Link>
    );
};

export default Advertisement;
