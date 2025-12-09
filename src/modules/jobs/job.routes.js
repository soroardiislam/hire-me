import { Router } from "express";
import { createJob, getJobs, updateJob, deleteJob } from "./job.controller.js";
import { protect } from "../../middlewares/auth.js";
import { roleCheck } from "../../middlewares/role.js";
import { ROLES } from "../../core/roles.js";

const router = Router();

router.get("/", getJobs);

router.post("/", protect, roleCheck([ROLES.EMPLOYEE, ROLES.ADMIN]), createJob);

router
  .route("/:id")
  .put(protect, roleCheck([ROLES.EMPLOYEE, ROLES.ADMIN]), updateJob)
  .delete(protect, roleCheck([ROLES.EMPLOYEE, ROLES.ADMIN]), deleteJob);

export { router as jobRoutes };
