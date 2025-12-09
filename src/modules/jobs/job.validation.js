// src/modules/jobs/job.validation.js
import { validate } from '../../middlewares/validate.js';

const jobBaseSchema = {
    title: { required: true, type: 'string', min: 5 },
    company: { required: true, type: 'string' },
    description: { required: true, type: 'string', min: 20 },
    salary: { required: true, type: 'number' } // সংখ্যা হওয়া আবশ্যক
};

const createJobSchema = () => ({
    body: jobBaseSchema
});

const updateJobSchema = () => ({
    params: {
        id: { required: true, type: 'string' } // Job ID
    },
    body: {
        ...jobBaseSchema,
        required: false // আপডেটে সব ফিল্ড প্রয়োজন নেই
    }
});

export const validateCreateJob = validate(createJobSchema);
export const validateUpdateJob = validate(updateJobSchema);

// জব অ্যাপ্লাই এর জন্য শুধু jobId প্রয়োজন
const applyJobSchema = () => ({
    params: {
        jobId: { required: true, type: 'string' }
    }
});
export const validateApplyJob = validate(applyJobSchema);

// এই ভ্যালিডেশনকে job.routes.js-এ ব্যবহার করতে হবে:
/*
router.post(
    '/', 
    protect, 
    roleCheck([ROLES.EMPLOYEE, ROLES.ADMIN]), 
    validateCreateJob, // ভ্যালিডেশন যুক্ত করা হলো
    createJob
);
*/