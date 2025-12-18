import { success } from "zod";
import * as applicationService from "./application.service.js";

export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id, status);

    const employeeId = req.user.id;

    const updatedApp = await applicationService.updateApplicationStatus(
      id,
      status,
      employeeId
    );
    res.json(updatedApp);
  } catch (error) {
    res.status(403).json({
      message: error.message,
      success: false,
    });
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const history = await applicationService.findApplicationHistory(
      req.user.id
    );
    res.json(history);
  } catch (error) {
    next(error);
  }
};

export const getApplicationsByRole = async (req, res, next) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;
    const query = req.query;

    const applications = await applicationService.findApplicationsByRole(
      userRole,
      userId,
      query
    );
    res.json(applications);
  } catch (error) {
    res.status(403).json({
      message: error.message,
      success: false,
    });
  }
};

export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required.",
        success: false,
      });
    }
    const cvPath = req.file.path;

    console.log(req.body);

    const result = await applicationService.submitApplication(
      jobId,
      userId,
      cvPath,
      req.body.amount
    );

    res.status(201).json({
      message: "Application submitted successfully.",
      application: result.application,
      invoice: result.payment.invoiceId,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
