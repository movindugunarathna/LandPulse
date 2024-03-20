import { mockResolvedValue, fail } from "jest-fetch-mock";
import { convertBackToNumbers } from "@/utils/readFiles";
import { pricePredictSchema } from "@/lib/zodSchema/schema";
import { pricePredict } from "@/actions/mlActions";
import { mockData } from "@/data/advertisement";

jest.mock("@/utils/readFiles");
jest.mock("@/lib/zodSchema/schema");

describe("pricePredict function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("fetches data successfully and returns formatted response", async () => {
        const mockInputData = {
            geometry: { lat: 12.345, lng: -56.789 },
            landTypes: ["residential", "commercial"],
        };
        const mockResponse = mockData;

        const expectedReturn = () => mockData;

        pricePredictSchema.safeParse.mockReturnValueOnce({
            success: true,
            data: mockInputData,
        });
        convertBackToNumbers.mockReturnValueOnce(expectedReturn);
        mockResolvedValue(mockResponse);

        const result = await pricePredict(mockInputData);

        expect(result).toEqual(expectedReturn);
        expect(convertBackToNumbers).toHaveBeenCalledWith(mockResponse);
    }, 20000);

    it("throws an error for invalid input data", async () => {
        const mockInputData = { invalidProperty: "someValue" };
        const mockError = new Error("data is not valid according to schema");

        pricePredictSchema.safeParse.mockReturnValueOnce({
            success: false,
            error: { issues: [{ message: mockError.message }] },
        });

        try {
            await pricePredict(mockInputData);
            fail("Expected an error to be thrown");
        } catch (error) {
            expect(error.message).toBe(mockError.message);
        }
    });
});
