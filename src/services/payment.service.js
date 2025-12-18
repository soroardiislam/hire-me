import Invoice from "../modules/invoices/invoice.model.js";
import { logger } from "../utils/logger.js";


export const processMockPayment = async (userId, amount) => {
  logger.info(
    `Processing mock payment for User: ${userId}, Amount: ${amount} Taka`
  );

  const invoice = await Invoice.create({
    user: userId,
    amount: amount,
    status: "Success",
    paymentGatewayId: `MOCK_TXN_${Date.now()}`,
  });

  logger.info(`Mock payment successful. Invoice ID: ${invoice._id}`);

  return {
    success: true,
    invoiceId: invoice._id,
  };
};
