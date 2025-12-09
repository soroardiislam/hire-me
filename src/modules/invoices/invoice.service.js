import Invoice from "./invoice.model.js";

export const getInvoicesByUserId = async (userId) => {
  return await Invoice.find({ user: userId });
};
