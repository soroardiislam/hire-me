// src/modules/users/user.routes.js
import { Router } from 'express';
import { getUsers, updateUser, deleteUser } from './user.controller.js';
import { protect } from '../../middlewares/auth.js';
import { roleCheck } from '../../middlewares/role.js';
import { ROLES } from '../../core/roles.js';

const router = Router();

// সমস্ত ইউজার ম্যানেজমেন্ট শুধুমাত্র Admin-এর জন্য
router.use(protect, roleCheck([ROLES.ADMIN])); 

router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router as userRoutes };