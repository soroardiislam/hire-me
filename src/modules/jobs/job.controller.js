import * as jobService from "./job.service.js";

export const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJobPost({
      ...req.body,
      postedBy: req.user.id,
    });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.company) query.company = req.query.company;

    const jobs = await jobService.findJobs(query);
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await jobService.updateJobById(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role
    );
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const result = await jobService.deleteJobById(
      req.params.id,
      req.user.id,
      req.user.role
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
