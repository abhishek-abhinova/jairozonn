import User from "../models/user.model.js";
import Book from "../models/book.model.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity = 1 } = req.body;

        const user = await User.findById(userId);
        let cartData = user.cartItems || {};

        if (cartData[productId]) {
            cartData[productId] += quantity;
        } else {
            cartData[productId] = quantity;
        }

        await User.findByIdAndUpdate(userId, { cartItems: cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        const user = await User.findById(userId);
        let cartData = user.cartItems || {};

        if (cartData[productId]) {
            cartData[productId] -= 1;
            if (cartData[productId] <= 0) {
                delete cartData[productId];
            }
        }

        await User.findByIdAndUpdate(userId, { cartItems: cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const cartData = user.cartItems || {};
        
        const cartItems = [];
        for (const productId in cartData) {
            const book = await Book.findById(productId);
            if (book) {
                cartItems.push({
                    ...book.toObject(),
                    quantity: cartData[productId]
                });
            }
        }

        res.json({ success: true, cartItems });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        const user = await User.findById(userId);
        let cartData = user.cartItems || {};

        if (quantity > 0) {
            cartData[productId] = quantity;
        } else {
            delete cartData[productId];
        }

        await User.findByIdAndUpdate(userId, { cartItems: cartData });
        res.json({ success: true, message: "Cart updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};