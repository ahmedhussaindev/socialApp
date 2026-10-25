import * as z from "zod";

export const changePasswordSchema = z.object({
    password: z.string().nonempty("Current password is required"),
    newPassword: z.string()
        .regex(/^.{8,}$/, "Password must be at least 8 characters"),
    confirmPassword: z.string()
        .nonempty("Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
