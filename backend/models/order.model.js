import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "User" },
    items: [
        {
            product: { type: String, required: true, ref: "Book" },
            quantity: { type: Number, required: true },
        },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true, ref: "Address" },
    status: { 
        type: String, 
        default: "Order Placed",
        enum: ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]
    },
    paymentType: { 
        type: String, 
        required: true,
        enum: ["COD", "Stripe", "PayPal"]
    },
    isPaid: { type: Boolean, default: false, required: true },
    paymentIntentId: { type: String }, // For Stripe payments
    trackingNumber: { type: String }, // For delivery tracking
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
