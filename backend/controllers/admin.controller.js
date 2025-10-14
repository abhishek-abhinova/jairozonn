import jwt from 'jsonwebtoken';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';

// Admin login => /admin/login
export const adminLogin = async(req, res) => {
  try {
      const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ message: "Please fill all the fields", success: false });
      }
      // Check if the admin credentials are valid
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          // Generate a JWT token
          const adminToken = jwt.sign({ email }, process.env.JWT_SECRET, {
              expiresIn: "1d",
          });
          res.cookie("adminToken", adminToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", maxAge: 24 * 60 * 60 * 1000, });
          return res.status(200).json({ message: "Admin logged in successfully", success: true });
      }

      return res.status(401).json({ message: "Invalid credentials", success: false });
  } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Internal server error", success: false });
  }
};

//check admin auth : /admin/is-auth
export const checkAuth = async(req, res) => {
    try {
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error during admin authentication:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Admin logout => /admin/logout
export const adminLogout = async(req, res) => {
  try {
      res.clearCookie("adminToken");
      return res.status(200).json({ message: "Admin logged out successfully", success: true });
  } catch (error) {
      console.error("Error during admin logout:", error);
      res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Get dashboard analytics => /admin/analytics
export const getDashboardAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBooks = await Book.countDocuments();
        const totalOrders = await Order.countDocuments();
        
        // Calculate total revenue
        const revenueData = await Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);
        const totalRevenue = revenueData[0]?.totalRevenue || 0;
        
        // Recent orders
        const recentOrders = await Order.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);
            
        // Monthly sales data
        const monthlySales = await Order.aggregate([
            { $match: { isPaid: true } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalSales: { $sum: "$amount" },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } },
            { $limit: 12 }
        ]);
        
        // Top selling books
        const topBooks = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.product",
                    totalSold: { $sum: "$items.quantity" }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            { $unwind: "$bookDetails" }
        ]);
        
        res.status(200).json({
            success: true,
            analytics: {
                totalUsers,
                totalBooks,
                totalOrders,
                totalRevenue,
                recentOrders,
                monthlySales,
                topBooks
            }
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ message: "Failed to fetch analytics", success: false });
    }
};

// Update order status => /admin/update-order-status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        if (!orderId || !status) {
            return res.status(400).json({ message: "Order ID and status are required", success: false });
        }
        
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: "Failed to update order status", success: false });
    }
};

// Delete book => /admin/delete-book
export const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        const book = await Book.findByIdAndDelete(bookId);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found", success: false });
        }
        
        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error('Delete book error:', error);
        res.status(500).json({ message: "Failed to delete book", success: false });
    }
};

// Get all users => /admin/users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: "Failed to fetch users", success: false });
    }
};
