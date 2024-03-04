import { ObjectId } from "mongodb";
import clientPromise from "@/utils/connect";

class UserModel {
    static collection = null;

    static async connect() {
        try {
            // Wait for the client to be connected
            const client = await clientPromise;
            const db = client.db(process.env.MONGODB_DB_NAME);
            this.collection = db.collection("users");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            throw new Error("Failed to connect to the database.");
        }
    }

    static async create(user) {
        try {
            await this.connect();

            // Insert the user document
            const result = await this.collection.insertOne(user);
            return result.insertedId;
        } catch (error) {
            console.error("Failed to insert user:", error.message);
            throw new Error("Failed to insert user.");
        }
    }

    static async find(query = {}) {
        try {
            await this.connect();

            // Find documents based on the query and sort by creation date descending
            const users = await this.collection
                .find(query)
                .sort({ creationDate: -1 })
                .toArray();
            return users;
        } catch (error) {
            console.error("Failed to fetch users:", error.message);
            throw new Error("Failed to fetch users.");
        }
    }

    static async findOne(query = {}) {
        try {
            await this.connect();

            // Find a user by username
            const user = await this.collection.findOne(query);
            return user;
        } catch (error) {
            console.error("Failed to fetch user:", error.message);
            throw new Error("Failed to fetch user.");
        }
    }

    static async update(id, updatedFields) {
        try {
            await this.connect();

            // Update the user document
            const result = await this.collection.updateOne(
                { _id: ObjectId(id) },
                { $set: updatedFields }
            );

            return result.modifiedCount; // Return the number of modified documents
        } catch (error) {
            console.error("Failed to update user:", error.message);
            throw new Error("Failed to update user.");
        }
    }

    static async remove(id) {
        try {
            await this.connect();

            // Delete the user document
            const result = await this.collection.deleteOne({
                _id: ObjectId(id),
            });

            return result.deletedCount; // Return the number of deleted documents
        } catch (error) {
            console.error("Failed to delete user:", error.message);
            throw new Error("Failed to delete user.");
        }
    }
}

export default UserModel;
