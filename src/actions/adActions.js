import Advertisement from "@/models/advertisementModel";

export const getAdvertisements = async () => {
    try {
        const advertisements = await Advertisement.find();
        return advertisements;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const getAdvertisement = async (slug) => {
    try {
        const post = await Advertisement.findOne({ slug });
        return post;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch post!");
    }
};