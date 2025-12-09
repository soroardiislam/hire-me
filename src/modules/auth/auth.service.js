import User from "../users/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

// Register
export const registerUser = async ({ name, email, password, role }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");
  const user = await User.create({ name, email, password, role });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id,role),
  };
};

// Login
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (user && (await user.matchPassword(password)))
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  throw new Error("Invalid email or password");
};

// Logout
export const logoutUser = async () => ({ message: "Logged out successfully" });

// Forgot password (OTP)
export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // OTP simulation (store in DB if needed, for now just return token)
  return { message: "OTP sent to email", otp: resetToken };
};

// Verify OTP & Reset password
export const verifyOTPAndResetPasswordService = async (
  email,
  otp,
  newPassword
) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
  const user = await User.findOne({
    email,
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid or expired OTP");
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  return { message: "Password reset successfully" };
};

// Update profile
export const updateProfileService = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.name = data.name || user.name;
  user.email = data.email || user.email;
  if (data.password) user.password = data.password;
  await user.save();
  return { _id: user._id, name: user.name, email: user.email, role: user.role };
};
