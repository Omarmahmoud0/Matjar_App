import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  streetAddress: z.string().min(5, {
    message: "Street address must be at least 5 characters.",
  }),
  city: z.enum(
    [
      "Alexandria",
      "Ismailia",
      "Suez",
      "alsharqia",
      "Kafr El-Sheikh",
      "Menoufia",
      "Qalyubia",
      "Giza",
    ],
    {
      required_error: "Please select a city.",
    }
  ),
  phoneNumber: z.string().max(11, {
    message: "Phone number must be 11 digits.",
  }),
  isDefault: z.boolean(),
});
