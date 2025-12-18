import { logger } from "../utils/logger.js";

export const sendMail = async (to, subject, body) => {
  logger.info(`[MAIL] Sending to: ${to}, Subject: ${subject}`);

  return {
    success: true,
    message: "Mock email sent successfully.",
  };
};

export const sendApplicationStatusUpdate = (to, userName, jobTitle, status) => {
  const subject = `Application Status Update: ${status}`;
  const body = `Dear ${userName}, your application for the job "${jobTitle}" has been ${status}.`;
  return sendMail(to, subject, body);
};
