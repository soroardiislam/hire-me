export const roleCheck = (allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, no user data in request" });
  }

  console.log("User role:", req.user.role, "Allowed roles:", allowedRoles);

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ 
      message: `Forbidden. Role '${req.user.role}' is not authorized for this action.` 
    });
  }

  next();
};
