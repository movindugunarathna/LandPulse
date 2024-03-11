"use server";
import Advertisement from "@/models/advertisementModel";
import { getUserContactsById } from "./userActions";

export const getAdvertisements = async () => {
    try {
        const advertisements = await Advertisement.find();
        return advertisements;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const getAdvertisementById = async (id) => {
    try {
        const post = await Advertisement.findOneById(id);
        const userContacts = await getUserContactsById(post.userId);
        return {
            code: 200,
            message: "Successfully downloaded",
            data: {
                _id: post._id.toString(),
                title: post.title,
                description: post.description,
                price: post.price,
                landTypes: post.landTypes,
                geometry: post.geometry,
                isInputPrice: post.isInputPrice,
                predict: JSON.stringify(post.predict),
                images: post.images,
                userId: post.userId,
                creationDate: post.creationDate,
                contact: userContacts.contact,
                email: userContacts.email,
            },
        };
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
