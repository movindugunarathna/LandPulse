import { z } from "zod";
import {
    hasSymbol,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
} from "../validation";

export const SignUpSchema = z
    .object({
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
        email: z.string().email("Must be a valid email address"),
        username: z.string().min(6, "Username must be at least 6 characters"),
    })
    .refine(
        (entry) => {
            return entry.email !== undefined && entry.username !== undefined;
        },
        {
            message: "Email and username must be provided",
        }
    );



    export const LoginUpSchema = z
    .object({
        email: z.string().email("Must be a valid email address"),
        username: z.string().min(6, "Username must be at least 6 characters"),
    })
    .refine(
        (entry) => {
            return entry.email !== undefined && entry.username !== undefined;
        },
        {
            message: "Email and username must be provided",
        }
    );
