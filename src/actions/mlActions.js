"use server";
import { pricePredictSchema } from "@/lib/zodSchema/schema";
import { convertBackToNumbers } from "@/utils/readFiles";
import axios from "axios";

export const pricePredict = async (inputData) => {
    try {
        const priceInputPass = pricePredictSchema.safeParse(inputData);

        if (priceInputPass.success) {
            const { geometry, landTypes } = priceInputPass.data;

            const response = await axios.post(
                "https://landpulse-ml-vubyb2fdca-el.a.run.app/predict",
                {
                    latitude: geometry.lat,
                    longitude: geometry.lng,
                    landType: landTypes.join(" ,"),
                    radius: 1000,
                }
            );
            console.log(response);

            return await convertBackToNumbers(response.data);
        } else {
            const issue_1 = priceInputPass.error?.issues[0];
            throw new Error(issue_1?.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
