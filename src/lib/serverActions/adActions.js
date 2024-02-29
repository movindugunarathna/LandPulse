import Advertisement from "@/models/advertisementModel";
import { connectToDataBase } from "@/utils/connect";

export const getAdvertisements = async () => {
    try {
        connectToDataBase();
        const advertisements = await Advertisement.find();
        return advertisements;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const getAdvertisement = async (slug) => {
    try {
        connectToDataBase();
        const post = await Advertisement.findOne({ slug });
        return post;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch post!");
    }
};
