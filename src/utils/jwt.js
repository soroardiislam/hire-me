import jwt from "jsonwebtoken";
import { config } from "../core/config.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "1d",
  });
};
