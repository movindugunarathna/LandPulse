import { z } from "zod";
import {
    hasSymbol,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
} from "../../utils/validation";
import { colomboGeometry } from "@/data/landTypes";
import { landTypes } from "@/data/landTypes";

export const SignUpSchema = z
    .object({
        username: z
            .string()
            .min(6, "Username must be at least 6 characters")
            .min(1, "Username is required"),
        email: z
            .string()
            .email("Must be a valid email address")
            .min(1, "Email is required"),
        contact: z
            .string()
            .min(1, "Contact field is required")
            .refine(
                (contact) => contact.length === 10 && /^\d+$/.test(contact),
                {
                    message: "Contact must contain exactly 10 numbers",
                }
            ),
        password: z
            .string()
            .min(6, "Password must be at least 5 characters")
            .refine((password) => hasUpperCase(password), {
                message: "Password must contain at least one capital letter",
            })
            .refine((password) => hasSymbol(password), {
                message: "Password must contain at least one symbol",
            })
            .refine((password) => hasLowerCase(password), {
                message: "Password must contain at least one simple letter",
            })
            .refine((password) => hasNumber(password), {
                message: "Password must contain at least one number",
            }),
        address: z.string().min(1, "Address field is required"),
    })
    .refine(
        (entry) => {
            return (
                entry.email !== undefined &&
                entry.username !== undefined &&
                entry.password !== undefined &&
                entry.contact !== undefined &&
                entry.address !== undefined
            );
        },
        {
            message: "All input fields are required!",
        }
    );

export const updateSchema = z
    .object({
        contact: z
            .string()
            .min(1, "Contact field is required")
            .refine(
                (contact) => contact.length === 10 && /^\d+$/.test(contact),
                {
                    message: "Contact must contain exactly 10 numbers",
                }
            ),

        address: z.string().min(1, "Address field is required"),
    })
    .refine(
        (entry) => {
            return entry.contact !== undefined && entry.address !== undefined;
        },
        {
            message: "All input fields are required!",
        }
    );

export const LoginSchema = z
    .object({
        username: z.string().optional(true),
        email: z.string().optional(true),
        password: z.string().min(1, "Password is required"),
    })
    .refine(
        (entry) => {
            // Check if only username is provided
            if (
                (entry.email === undefined || entry.email?.trim() === "") &&
                (entry.username === undefined || entry.username?.trim() === "")
            ) {
                // Skip email validation if username exists
                return false;
            } else return true;
        },
        { message: "Either correct email or username must be provided" }
    );

export const AdvertisementSchema = z
    .object({
        title: z.string().min(4, "Title is must be longer than 4 character"),
        description: z
            .string()
            .min(20, "Description cant be less than 20 characters"),
        perch: z.number().min(1, "Perch count is required"),
        price: z.number().min(1, "Price is required"),
        landTypes: z.string().array().nonempty("LandType is required!"),
        geometry: z
            .object({
                lat: z.number(),
                lng: z.number(),
            })
            .refine((entry) => {
                return (
                    colomboGeometry.lat !== entry.lat ||
                    colomboGeometry.lng !== entry.lng
                );
            }, "Please select the land location"),
        isInputPrice: z.boolean(),
        predict: z.any(),
        images: z.array(
            z.object({
                id: z.string(),
                lastModified: z.number(),
                lastModifiedDate: z.string(),
                name: z.string(),
                size: z.number(),
                type: z.string(),
                url: z.string(),
                webkitRelativePath: z.string(),
            }),
            "Image is required"
        ),
    })
    .refine(
        (entry) => {
            return (
                entry.title !== undefined &&
                entry.description !== undefined &&
                entry.price !== undefined
            );
        },
        {
            message: "All input fields are required!",
        }
    )
    .refine((entry) => entry.landTypes.length > 0, {
        message: "At least one LandType is required",
    })
    .refine((entry) => {
        console.log(landTypes.map((item) => item.type));
        const landtypesName = landTypes.map((item) => item.type);
        return entry.landTypes.map((type) => landtypesName.includes(type));
    }, "Please select valid LandTypes");

export const pricePredictSchema = z.object({
    landTypes: z.array(z.string()).nonempty("LandType is required!"),
    geometry: z
        .object({
            lat: z.number(),
            lng: z.number(),
        })
        .refine((entry) => {
            return (
                colomboGeometry.lat !== entry.lat ||
                colomboGeometry.lng !== entry.lng
            );
        }, "Please select the land location"),
});
