import Stripe from 'stripe';
import Order from '../models/order.model.js';
import Book from '../models/book.model.js';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

// Create Stripe payment intent
export const createPaymentIntent = async (req, res) => {
    try {
        if (!stripe) {
            return res.status(500).json({ message: "Stripe not configured", success: false });
        }

        const { items, address } = req.body;
        const userId = req.userId;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Items are required", success: false });
        }

        // Calculate total amount
        let amount = 0;
        for (const item of items) {
            const book = await Book.findById(item.product);
            if (!book) {
                return res.status(404).json({ message: "Book not found", success: false });
            }
            amount += book.offerPrice * item.quantity;
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                userId,
                items: JSON.stringify(items),
                address: JSON.stringify(address)
            }
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            amount: amount
        });
    } catch (error) {
        console.error('Payment intent creation error:', error);
        res.status(500).json({ message: "Payment processing failed", success: false });
    }
};

// Confirm payment and create order
export const confirmPayment = async (req, res) => {
    try {
        if (!stripe) {
            return res.status(500).json({ message: "Stripe not configured", success: false });
        }

        const { paymentIntentId, items, address } = req.body;
        const userId = req.userId;

        // Verify payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: "Payment not completed", success: false });
        }

        // Calculate amount
        let amount = 0;
        for (const item of items) {
            const book = await Book.findById(item.product);
            if (!book) {
                return res.status(404).json({ message: "Book not found", success: false });
            }
            amount += book.offerPrice * item.quantity;
        }

        // Create order
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Stripe",
            isPaid: true,
            paymentIntentId
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ message: "Order creation failed", success: false });
    }
};

// PayPal payment (simplified - you'd integrate with PayPal SDK)
export const createPayPalOrder = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;

        // Calculate total amount
        let amount = 0;
        for (const item of items) {
            const book = await Book.findById(item.product);
            if (!book) {
                return res.status(404).json({ message: "Book not found", success: false });
            }
            amount += book.offerPrice * item.quantity;
        }

        // For demo purposes, we'll create the order directly
        // In production, integrate with PayPal SDK
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "PayPal",
            isPaid: true
        });

        res.status(201).json({
            success: true,
            message: "PayPal order created successfully",
            order
        });
    } catch (error) {
        console.error('PayPal order creation error:', error);
        res.status(500).json({ message: "PayPal order creation failed", success: false });
    }
};