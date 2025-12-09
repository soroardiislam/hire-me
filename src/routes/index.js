import { Router } from "express";
import { authRoutes } from "../modules/auth/index.js";
import { userRoutes } from "../modules/users/index.js";
import { jobRoutes } from "../modules/jobs/index.js";
import { applicationRoutes } from "../modules/applications/index.js";

const appRouter = Router();

appRouter.use("/auth", authRoutes);
appRouter.use("/users", userRoutes);
appRouter.use("/jobs", jobRoutes);
appRouter.use("/applications", applicationRoutes);

export { appRouter };
