"use server";
import Advertisement from "@/models/advertisementModel";
import { getUserContactsById } from "./userActions";

export const getAdvertisements = async ({
    filterValue = 1,
    pageNumber,
    pageSize,
}) => {
    try {
        const { advertisements, totalPages } = await Advertisement.findSort({
            pageNumber,
            pageSize,
            value: filterValue,
        });
        return {
            totalPages,
            advertisements: advertisements.map((advertisement) => ({
                _id: advertisement._id.toString(),
                title: advertisement.title,
                perch: advertisement.perch,
                price: advertisement.price,
                landTypes: advertisement.landTypes,
                images: advertisement.images,
                userId: advertisement.userId,
                creationDate: advertisement.creationDate,
                isInputPrice: advertisement.isInputPrice,
            })),
        };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};

export const getAdvertisementById = async (id) => {
    try {
        const post = await Advertisement.findOneById(id);
        const userContacts = await getUserContactsById(post.userId);

        console.log("Advertisement fetched successfully");
        return {
            code: 200,
            message: "Successfully downloaded",
            data: {
                _id: post._id.toString(),
                title: post.title,
                description: post.description,
                perch: post.perch,
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

export const deleteAdvertisements = async (title, userId) => {
    try {
        const post = await Advertisement.remove({
            title: title,
            userId: userId,
        });
        console.log("Post Deleted successfully");
        console.log(post);
        return {
            code: 202,
            message: "Post Deleted successfully",
            data: post,
        };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getAdvertisementByUserId = async (userId) => {
    try {
        const post = await Advertisement.find({ userId });
        return post;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getAdvertisementByEmail = async (email) => {
    try {
        const post = await Advertisement.find({ email });
        return post;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
