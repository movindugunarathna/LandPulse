import { z } from "zod";
import {
    hasSymbol,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    validateEmail,
} from "../../utils/validation";

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
                (entry.username !== undefined || entry.username?.trim() !== "")
            ) {
                // Skip email validation if username exists
                return true;
            } else if (
                (entry.email !== undefined || entry.username?.trim() !== "") &&
                (entry.username === undefined || entry.username?.trim() === "")
            ) {
                // Validate email if present
                return validateEmail(entry.email);
            }
            // If neither email nor username is provided, trigger the original error message
            return false;
        },
        { message: "Either correct email or username must be provided" }
    );
