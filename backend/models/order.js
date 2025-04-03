import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    paper: {
      type: String,
    },
    frame: {
      type: String,
    },
    size:{
      type: String,
    },
    orderStatus: {
      type: String,
      enum: [
        "processing",
        "printing",
        "packed",
        "shipped",
        "delivered",
        "returned",
      ],
      default: "processing",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    paymentMethod: {
      type: String,
    },
    invoiceId: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      require: true
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export {Order};