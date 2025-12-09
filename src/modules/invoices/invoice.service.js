// src/modules/invoices/invoice.service.js
import Invoice from './invoice.model.js';

// সার্ভিস: ইউজার অনুযায়ী সমস্ত ইনভয়েস খুঁজে বের করা
export const getInvoicesByUserId = async (userId) => {
    return await Invoice.find({ user: userId });
};