import Job from "./job.model.js";
import Application from "../applications/application.model.js";

export const findJobs = async (query = {}) => {
  return await Job.find(query).populate("postedBy", "name email");
};

export const createJobPost = async (jobData) => {
  const job = new Job(jobData);
  await job.save();
  return job;
};

export const updateJobById = async (jobId, updateData, userId, userRole) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error("Job not found");

  if (job.postedBy.toString() !== userId.toString() && userRole !== "Admin") {
    throw new Error("Unauthorized: You can only edit your own jobs.");
  }

  Object.assign(job, updateData);
  await job.save();
  return job;
};

export const deleteJobById = async (jobId, userId, userRole) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error("Job not found");

  if (job.postedBy.toString() !== userId.toString() && userRole !== "Admin") {
    throw new Error("Unauthorized: You can only delete your own jobs.");
  }

  await Application.deleteMany({ job: jobId });
  await job.deleteOne();

  return { message: "Job and associated applications deleted successfully" };
};
