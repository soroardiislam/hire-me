import Application from "./application.model.js";
import Job from "../jobs/job.model.js";
import { ROLES } from "../../core/roles.js";
import { processMockPayment } from "../../services/payment.service.js";

export const findApplicationsByRole = async (userRole, userId, query = {}) => {
  let filter = {};

  if (userRole === ROLES.ADMIN) {
  } else if (userRole === ROLES.EMPLOYEE) {
    const Jobs = await Job.find({ postedBy: userId }).select("_id");
    const jobIds = Jobs.map((job) => job._id);
    filter.job = { $in: jobIds };
  }

  return await Application.find(filter)
    .populate("job", "title company")
    .populate("applicant", "name email")
    .sort({ createdAt: -1 });
};

export const submitApplication = async (jobId, userId, cvPath, amount) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error("Job not found");

  const application = await Application.create({
    job: jobId,
    applicant: userId,
    cvPath,
    status: "Pending",
    paymentStatus: "Free",
  });

  const payment = await processMockPayment(userId, amount);

  if (payment.success) {
    application.paymentStatus = "Paid";
    await application.save();
  }

  return { application, payment };
};

export const updateApplicationStatus = async (id, status, employeeId) => {
  const application = await Application.findById(id);
  if (!application) {
    throw new Error("Application does not exist");
  }

  application.status = status;
  await application.save();

  return application;
};

export const findApplicationHistory = async (userId) => {
  const history = await Application.find({ applicant: userId })
    .populate("job", "title company description salary postedBy")
    .sort({ createdAt: -1 });

  return history;
};
