import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
        required: [true, "Must provide a email"],
        unique: [true, "Must provide a unique email"],
    },
}, {
    timestamps: true,
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;