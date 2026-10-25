import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty('email is required'),
    password: z.string().regex(/^.{8,}$/, 'Enter avalid password'),
})