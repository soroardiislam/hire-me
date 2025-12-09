export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    const errors = err.errors
      ? err.errors.map((e) => ({ field: e.path[0], message: e.message }))
      : [{ field: "unknown", message: err.message || "Validation failed" }];

    res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
};
