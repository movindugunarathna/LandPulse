import { ObjectId } from "mongodb";
import clientPromise from "@/utils/connect";

class AdvertisementModel {
    static collection = null;
    static totalAdvertisements = 0;

    static async connect() {
        try {
            // Wait for the client to be connected
            const client = await clientPromise;
            const db = client.db(process.env.MONGODB_DB_NAME);
            this.collection = db.collection("advertisements");
            this.totalAdvertisements = await this.collection.countDocuments();
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            throw new Error("Failed to connect to the database.");
        }
    }

    static async insert(advertisement) {
        try {
            await this.connect();

            advertisement.creationDate = new Date();
            const result = await this.collection.insertOne(advertisement);
            return result;
        } catch (error) {
            console.error("Failed to insert advertisement:", error.message);
            throw new Error("Failed to insert advertisement.");
        }
    }

    static async findSort({
        query = {},
        pageNumber = 1,
        pageSize = 25,
        value,
    }) {
        try {
            await this.connect();
            console.log("DB Model");

            // Calculate the page size based on the total number of advertisements
            const totalPages = Math.ceil(this.totalAdvertisements / pageSize);

            if (pageNumber < 1 || pageNumber > totalPages) {
                throw new Error("Invalid page number.");
            }

            // Calculate the number of documents to skip based on the page number and page size
            const skipCount = (pageNumber - 1) * pageSize;

            let sortCriteria = {};

            // Determine sorting criteria based on the value
            switch (value) {
                case 1:
                    // Sort by creation date descending (default)
                    sortCriteria = { creationDate: -1 };
                    break;
                case 2:
                    // Sort by price low to high
                    sortCriteria = { price: 1 };
                    break;
                case 3:
                    // Sort by price high to low
                    sortCriteria = { price: -1 };
                    break;
                case 4:
                    // Sort by perch low to high
                    sortCriteria = { perch: 1 };
                    break;
                case 5:
                    // Sort by perch high to low
                    sortCriteria = { perch: -1 };
                    break;
                case 6:
                    // Sort by isInputPrice (boolean)
                    sortCriteria = { isInputPrice: 1, creationDate: -1 };
                    break;
                // Add more cases for other sorting options if needed
                default:
                    // Sort by creation date descending (default)
                    sortCriteria = { creationDate: -1 };
            }

            // Find documents based on the query and sort criteria
            const advertisements = await this.collection
                .find(query)
                .sort(sortCriteria)
                .skip(skipCount)
                .limit(pageSize)
                .toArray();

            return {
                advertisements,
                totalPages,
            };
        } catch (error) {
            console.error("Failed to fetch advertisements:", error.message);
            throw new Error("Failed to fetch advertisements.");
        }
    }

    static async find({ query = {} }) {
        try {
            await this.connect();

            const advertisements = await this.collection
                .find(query)
                .sort({ creationDate: -1 })
                .toArray();

            return advertisements;
        } catch (error) {
            console.error("Failed to fetch advertisements:", error.message);
            throw new Error("Failed to fetch advertisements.");
        }
    }

    static async findOneById(id) {
        try {
            await this.connect();

            const advertisement = await this.collection.findOne({
                _id: new ObjectId(id),
            });

            return advertisement;
        } catch (error) {
            console.error("Failed to fetch advertisement:", error.message);
            throw new Error("Failed to fetch advertisement.");
        }
    }

    static async update(id, updatedFields) {
        try {
            await this.connect();

            // Update the advertisement document
            const result = await this.collection.updateOne(
                { _id: ObjectId(id) },
                { $set: updatedFields }
            );

            return result.modifiedCount; // Return the number of modified documents
        } catch (error) {
            console.error("Failed to update advertisement:", error.message);
            throw new Error("Failed to update advertisement.");
        }
    }

    static async remove(id) {
        try {
            await this.connect();

            // Delete the advertisement document
            const result = await this.collection.deleteOne({
                _id: ObjectId(id),
            });

            return result.deletedCount; // Return the number of deleted documents
        } catch (error) {
            console.error("Failed to delete advertisement:", error.message);
            throw new Error("Failed to delete advertisement.");
        }
    }
}

export default AdvertisementModel;
