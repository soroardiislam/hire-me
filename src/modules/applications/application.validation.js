import { APPLICATION_STATUS } from "../../core/roles.js";

export const validateApplicationStatus = (req, res, next) => {
  const { status } = req.body;

  if (!status || !Object.values(APPLICATION_STATUS).includes(status)) {
    return res.status(400).json({
      message: `Invalid application status. Must be one of: ${Object.values(
        APPLICATION_STATUS
      ).join(", ")}`,
    });
  }
  next();
};
