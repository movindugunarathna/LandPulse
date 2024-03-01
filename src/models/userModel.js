import mongoose from "mongoose";
import bcrypt from "bcrypt";

const profileSchema = new mongoose.Schema({
    id: String,
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
        profile: { type: profileSchema, default: null },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    const user = this;

    if (this.isModified("password" || this.isNew)) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            } else
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }
                    user.password = hash;
                    next();
                });
        });
    } else return next();
});

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
