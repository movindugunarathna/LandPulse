import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    locationURL: {
        type: String,
        required: [true, "Location is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    isSold: {
        type: Boolean,
        default: false,
    },
    creationdDate: {
        type: Date,
        default: Date.now,
    },
    modifiedDate: {
        type: Date,
        default: Date.now,
    }
},
    {
        timestamps: true,
    }
);

const Advertisement = mongoose.models.Advertisement || mongoose.model("Advertisement", advertisementSchema);

export default Advertisement;