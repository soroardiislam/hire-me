import dotenv from "dotenv";

export const loadConfig = () => {
  dotenv.config();
  console.log("Environment variables loaded.");
};

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
