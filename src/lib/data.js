import Advertisement from "@/models/advertisementModel";
import { connectToDb } from "./utills";
import { unstable_noStore as noStore } from "next/cache";

export const getAdvertisements = async () => {
    try {
        connectToDb();
        const advertisements = await Advertisement.find();
        return advertisements;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const getAdvertisement = async (slug) => {
    try {
        connectToDb();
        const post = await Advertisement.findOne({ slug });
        return post;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch post!");
    }
};
