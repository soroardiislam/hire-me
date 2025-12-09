import { validate } from "../../middlewares/validate.js";

const jobBaseSchema = {
  title: { required: true, type: "string", min: 5 },
  company: { required: true, type: "string" },
  description: { required: true, type: "string", min: 20 },
  salary: { required: true, type: "number" },
};

const createJobSchema = () => ({
  body: jobBaseSchema,
});

const updateJobSchema = () => ({
  params: {
    id: { required: true, type: "string" },
  },
  body: {
    ...jobBaseSchema,
    required: false,
  },
});

export const validateCreateJob = validate(createJobSchema);
export const validateUpdateJob = validate(updateJobSchema);

const applyJobSchema = () => ({
  params: {
    jobId: { required: true, type: "string" },
  },
});
export const validateApplyJob = validate(applyJobSchema);
