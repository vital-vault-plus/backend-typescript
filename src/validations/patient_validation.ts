import { z } from "zod";

export const patient_schema = z.object({
  aadharNumber: z
    .number()
    .min(100000000000, "Aadhar number must be at least 12 digits")
    .max(999999999999, "Aadhar number cannot exceed 12 digits"),
  email: z.string().email("Invalid email address"),
  guardianName: z.string().optional(),
  emergencyContact: z
    .number()
    .min(1000000000, "Invalid emergency contact number")
    .max(9999999999, "Emergency contact cannot exceed 10 digits"),
  name: z.string().min(1, "Name cannot be empty"),
  gender: z
    .enum(["Male", "Female", "Other"])
    .refine((val) => val, { message: "Invalid gender selection" }),
  contact: z
    .number()
    .min(1000000000, "Invalid contact number")
    .max(9999999999, "Contact number cannot exceed 10 digits"),
  image: z.string().optional(),
  addedBy: z.string({ required_error: "Employee name is missing" }),
  organisationId: z.string({ required_error: "Organisation Id is missing" }),
  verified: z.boolean().optional(),
});
