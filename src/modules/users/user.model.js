import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { ROLES } from "../../core/roles.js";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please use a valid email address"],
  },
  password: { type: String, required: true, minlength: 6, select: false },
  cv: String, // CV file path
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: { type: String, enum: ["employee", "job-seeker", "admin"] },
  createdAt: { type: Date, default: Date.now },
});

// Password hash
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password match
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Reset password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min
  return resetToken;
};

const User = mongoose.model("User", UserSchema);
export default User;
