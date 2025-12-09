import { Router } from "express";
import { register, login, logout, forgotPassword, verifyOTP, updateProfile,  } from "./auth.controller.js";
import { protect } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { registerSchema, loginSchema, forgotPasswordSchema, verifyOTPSchema, updateProfileSchema } from "./auth.validation.js";


const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/verify-otp", validate(verifyOTPSchema), verifyOTP);

router.put("/update-profile", protect, validate(updateProfileSchema), updateProfile);



export { router as authRoutes };
