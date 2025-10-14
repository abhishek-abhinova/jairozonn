import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;
        if(!address || !items || items.length === 0){
            return res.status(400).json({ message: "Address and items are required", success: false });
        }
        // Calculate total amount
        let amount = 0;
        for (const item of items) {
            const book = await Book.findById(item.product);
            if (!book) {
                return res.status(404).json({ message: "Book not found", success: false });
            }
            amount += book.price * item.quantity;
        }
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
            isPaid: false
        });
        
        // Send order confirmation email
        try {
            const user = await User.findById(userId);
            if (user && user.email) {
                // Email will be sent here - placeholder for now
                console.log(`Order confirmation email should be sent to: ${user.email}`);
            }
        } catch (emailError) {
            console.error('Failed to send order confirmation email:', emailError);
        }
        
        res.status(201).json({ 
            message: "Order placed successfully", 
            success: true,
            orderId: order._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId })
            .populate('items.product', 'title author offerPrice image category')
            .sort({ createdAt: -1 });
        res.status(200).json({ orders, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .populate('items.product', 'title author offerPrice image category')
            .sort({ createdAt: -1 });
        res.status(200).json({ orders, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        
        const order = await Order.findByIdAndUpdate(
            orderId, 
            { status }, 
            { new: true }
        ).populate('userId', 'name email');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        
        res.status(200).json({ 
            message: "Order status updated successfully", 
            success: true, 
            order 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.userId;
        
        const order = await Order.findOne({ _id: orderId, userId });
        
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        
        if (order.status === 'Shipped' || order.status === 'Delivered') {
            return res.status(400).json({ message: "Cannot cancel shipped or delivered orders", success: false });
        }
        
        order.status = 'Cancelled';
        await order.save();
        
        res.status(200).json({ 
            message: "Order cancelled successfully", 
            success: true 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};  
