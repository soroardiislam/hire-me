import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 100,
  },
  status: {
    type: String,
    enum: ["Success", "Pending", "Failed"],
    default: "Success",
  },
  paymentGatewayId: {
    type: String,
    required: false,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
