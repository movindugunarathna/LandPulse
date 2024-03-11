import { colomboGeometry, predictReturn } from "@/data/advertisement";
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

            return { ...state, geometry: { lat, lng } };
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
