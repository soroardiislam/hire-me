import jwt from "jsonwebtoken";
import User from "../modules/users/user.model.js";

export const protect = async (req, res, next) => {
  try {
    if (!req.cookies) {
      console.log(" req.cookies is undefined");
      return res.status(401).json({ message: "Cookie parser not loaded" });
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token in cookies" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
