import { Router } from "express";
import {
  updateStatus,
  getHistory,
  getApplicationsByRole,
  applyJob,
} from "./application.controller.js";
import { protect } from "../../middlewares/auth.js";
import { roleCheck } from "../../middlewares/role.js";
import { ROLES } from "../../core/roles.js";
import { validateApplicationStatus } from "./application.validation.js";
import { uploadResume } from "../../middlewares/upload.js";

const router = Router();

router.get(
  "/",
  protect,
  roleCheck([ROLES.ADMIN, ROLES.EMPLOYEE]),
  getApplicationsByRole
);

router.put(
  "/:id",
  protect,
  roleCheck([ROLES.JOB_SEEKER, ROLES.ADMIN]),
  validateApplicationStatus,
  updateStatus
);

router.get("/history", protect, roleCheck([ROLES.JOB_SEEKER]), getHistory);

router.post(
  "/apply/:jobId",
  protect,
  roleCheck([ROLES.JOB_SEEKER]),
  uploadResume,
  applyJob
);

export { router as applicationRoutes };
