import { ROLES } from "../../core/roles.js";
import { validate } from "../../middlewares/validate.js";

const userUpdateSchema = () => ({
  params: {
    id: { required: true, type: "string" },
  },
  body: {
    role: {
      required: false,
      type: "string",

      validate: (value) => value && Object.values(ROLES).includes(value),
    },
  },
});

export const validateUserUpdate = (req, res, next) => {
  if (req.body.role && !Object.values(ROLES).includes(req.body.role)) {
    return res
      .status(400)
      .json({
        message: `Invalid role: ${
          req.body.role
        }. Must be one of ${Object.values(ROLES).join(", ")}`,
      });
  }

  validate(userUpdateSchema)(req, res, next);
};
