import { Router } from "express";
import { getUsers, updateUser, deleteUser } from "./user.controller.js";
import { protect } from "../../middlewares/auth.js";
import { roleCheck } from "../../middlewares/role.js";
import { ROLES } from "../../core/roles.js";

const router = Router();

router.use(protect, roleCheck([ROLES.ADMIN]));

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as userRoutes };
