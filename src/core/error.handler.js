import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found or Invalid ID.";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.code === "LIMIT_FILE_SIZE" || err.message.includes("file type")) {
    statusCode = 400;
  }

  logger.error(err.stack);

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
