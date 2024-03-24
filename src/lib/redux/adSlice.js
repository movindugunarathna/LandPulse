import { predictReturn } from "@/data/advertisement";
import { colomboCityBound, colomboGeometry } from "@/data/landTypes";
import { createSlice } from "@reduxjs/toolkit";

const adInitial = {
    title: "",
    description: "",
    landTypes: [],
    geometry: colomboGeometry,
    isInputPrice: false,
    price: 0.0,
    perch: 1.0,
    predict: predictReturn,
    images: [],
};

const AdSlice = createSlice({
    name: "ad",
    initialState: adInitial,
    reducers: {
        setBasic: (state, action) => {
            const { field, value } = action.payload;

            return { ...state, [field]: value };
        },
        setLandTypes: (state, action) => {
            const { value } = action.payload;

            return {
                ...state,
                landTypes: value,
            };
        },

        setInputPriceBool: (state, action) => {
            const { bool } = action.payload;

            return { ...state, isInputPrice: bool };
        },

        setLocationGeo: (state, action) => {
            const { lat, lng } = action.payload;
            console.log(lat, lng);
            console.log(
                colomboCityBound.max.lat,
                lat,
                colomboCityBound.min.lat
            );
            console.log(
                colomboCityBound.max.lng,
                lng,
                colomboCityBound.min.lng
            );
            if (
                colomboCityBound.max.lat > lat &&
                lat > colomboCityBound.min.lat &&
                colomboCityBound.min.lat &&
                colomboCityBound.max.lng > lng &&
                lng > colomboCityBound.min.lng &&
                colomboCityBound.min.lng
            ) {
                return { ...state, geometry: { lat, lng } };
            } else
                throw new Error("City in not available for price prediction");
        },
        setPredict: (state, action) => {
            const { value } = action.payload;

            return { ...state, predict: { ...value } };
        },

        setImages: (state, action) => {
            const { images } = action.payload;
            console.log(images);
            return { ...state, images: [...images] };
        },

        resetPredict: (state, action) => {
            return { ...state, predict: { ...adInitial.predict } };
        },
    },
});

export const {
    resetPredict,
    setBasic,
    setLocationGeo,
    setPredict,
    setLandTypes,
    setInputPriceBool,
    setImages,
} = AdSlice.actions;
export default AdSlice.reducer;
