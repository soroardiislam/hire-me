// src/modules/jobs/job.routes.js (Updated)
import { Router } from 'express';
import { createJob, getJobs, updateJob, deleteJob } from './job.controller.js';
import { protect } from '../../middlewares/auth.js';
import { roleCheck } from '../../middlewares/role.js';
import { ROLES } from '../../core/roles.js';

const router = Router();

// Job Listings (PUBLIC for viewing)
router.get('/', getJobs); 

// Job Post Creation (Employee/Admin Only)
router.post(
    '/', 
    protect, 
    roleCheck([ROLES.EMPLOYEE, ROLES.ADMIN]), 
    createJob
);

// Job Update/Delete (Employee/Admin Only)
router.route('/:id')
    .put(protect, roleCheck([ROLES.EMPLOYEE, ROLES.ADMIN]), updateJob)
    .delete(protect, roleCheck([ROLES.EMPLOYEE, ROLES.ADMIN]), deleteJob);

// Job Application (Job Seeker Only)


export { router as jobRoutes };