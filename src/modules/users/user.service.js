import User from "./user.model.js";
import { ROLES } from "../../core/roles.js";

export const findAllUsers = async () => {
  return await User.find().select("-password");
};

export const updateUserById = async (userId, updateData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const allowedFields = ["name", "email", "role", "password"];

  for (const key of Object.keys(updateData)) {
    if (allowedFields.includes(key)) {
      if (key === "role") {
        if (Object.values(ROLES).includes(updateData.role)) {
          user.role = updateData.role;
        }
        continue;
      }

      if (key === "password") {
        user.password = updateData.password;
        continue;
      }

      user[key] = updateData[key];
    }
  }

  await user.save();

  const { password, ...safeUser } = user.toObject();
  return safeUser;
};

export const deleteUserById = async (userId) => {
  const result = await User.deleteOne({ _id: userId });
  if (result.deletedCount === 0) {
    throw new Error("User not found");
  }
  return { message: "User deleted successfully" };
};
