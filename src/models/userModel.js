import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.String,
        unique: true,
    },
    name: String,
    url: String,
    type: String,
    size: Number,
    lastModifiedDate: Date,
});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Must provide a username"],
            unique: [true, "Must provide a unique username"],
        },
        password: {
            type: String,
            required: [true, "Must provide a password"],
        },
        email: {
            type: String,
            required: [true, "Must provide an email"],
            unique: [true, "Must provide a unique email"],
        },
        contact: {
            type: String, // Changed to String
            required: [true, "Must provide a mobile number"],
        },
        address: {
            type: String,
            required: [true, "Must provide a valid address"],
        },
        profile: profileSchema,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
