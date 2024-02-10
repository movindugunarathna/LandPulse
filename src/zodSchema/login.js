import z from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    username: z.string().min(6),
    password: z.string().min(5)
})