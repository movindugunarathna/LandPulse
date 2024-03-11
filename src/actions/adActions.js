"use server";
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

export const saveAdvertisements = async (slug) => {
    try {
        const post = await Advertisement.insert({ ...slug });
        const id = Number(post?.insertedId).toString();
        const acknowledged = post.acknowledged;
        console.log(id, acknowledged);
        return {
            code: 200,
            message: "Post saved successfully",
            data: {
                acknowledged,
                id,
            },
        };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
