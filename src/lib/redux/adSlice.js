import { createSlice } from "@reduxjs/toolkit";

const adInitial = {
    title: "",
    description: "",
    landTypes: [],
    geomatry: {
        lat: 6.925187004369271,
        lng: 79.86128293151192,
    },
    price: 0.0,
    predict: {
        Obj: {
            air: 0,
            bakery_count: 0.0,
            bakery_mdist: 0.0,
            bank_count: 0.0,
            bank_mdist: 0.0,
            bar_count: 0.0,
            bar_mdist: 0.0,
            bus_station_count: 0.0,
            bus_station_mdist: 0.0,
            clothing_store_count: 0.0,
            clothing_store_mdist: 0.0,
            curr_month: 0,
            curr_year: 0,
            doctor_count: 0.0,
            doctor_mdist: 0.0,
            gas_station_count: 0.0,
            gas_station_mdist: 0.0,
            gym_count: 0.0,
            gym_mdist: 0.0,
            hospital_count: 0.0,
            hospital_mdist: 0.0,
            land_type: 0,
            lat: 0.0,
            library_count: 0.0,
            library_mdist: 0.0,
            long: 0.0,
            movie_theater_count: 0.0,
            movie_theater_mdist: 0.0,
            pharmacy_count: 0.0,
            pharmacy_mdist: 0.0,
            police_count: 0.0,
            police_mdist: 0.0,
            post_office_count: 0.0,
            post_office_mdist: 0.0,
            restaurant_count: 0.0,
            restaurant_mdist: 0.0,
            school_count: 0.0,
            school_mdist: 0.0,
            store_count: 0.0,
            store_mdist: 0.0,
            supermarket_count: 0.0,
            supermarket_mdist: 0.0,
            train_station_count: 0.0,
            train_station_mdist: 0.0,
            university_count: 0.0,
            university_mdist: 0.0,
        },
        max_next: 0.0,
        min_next: 0.0,
        price: 0.0,
    },
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

        setLocationGeo: (state, action) => {
            const { lat, lng } = action.payload;

            return { ...state, geomatry: { lat, lng } };
        },
        setPredict: (state, action) => {
            const { value } = action.payload;

            return { ...state, predict: { ...value } };
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
} = AdSlice.actions;
export default AdSlice.reducer;
