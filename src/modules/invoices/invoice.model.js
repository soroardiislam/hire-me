// src/modules/invoices/invoice.model.js
import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 100, // জব অ্যাপ্লিকেশনের জন্য 100 টাকা
    },
    status: {
        type: String,
        enum: ['Success', 'Pending', 'Failed'],
        default: 'Success',
    },
    paymentGatewayId: { // মক পেমেন্টের জন্য ID
        type: String,
        required: false, 
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

export default Invoice;