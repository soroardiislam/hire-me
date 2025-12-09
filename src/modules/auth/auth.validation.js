import { z } from "zod";

// Register validation
export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
   role: z.enum(["employee", "job-seeker","admin"]),
});

// Login validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Forgot password validation
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

// Verify OTP validation
export const verifyOTPSchema = z.object({
  email: z.string().email("Invalid email"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

// Update profile validation
export const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  password: z.string().min(6).optional(),
});
