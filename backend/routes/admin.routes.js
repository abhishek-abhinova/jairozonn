import express from 'express';
import { 
    adminLogout, 
    adminLogin, 
    checkAuth, 
    getDashboardAnalytics, 
    updateOrderStatus, 
    deleteBook, 
    getAllUsers 
} from '../controllers/admin.controller.js';
import { authAdmin } from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/is-auth", authAdmin, checkAuth);
adminRouter.get("/logout", authAdmin, adminLogout);
adminRouter.get("/analytics", authAdmin, getDashboardAnalytics);
adminRouter.put("/update-order-status", authAdmin, updateOrderStatus);
adminRouter.delete("/delete-book/:bookId", authAdmin, deleteBook);
adminRouter.get("/users", authAdmin, getAllUsers);

export default adminRouter;