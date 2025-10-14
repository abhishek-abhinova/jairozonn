import express from "express";
import { placeOrderCOD, getUserOrders, getAllOrders, updateOrderStatus, cancelOrder } from "../controllers/order.controller.js";
import authUser from "../middlewares/authUser.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const orderRouter = express.Router();

orderRouter.post("/place-cod", authUser, placeOrderCOD);
orderRouter.post("/create", authUser, placeOrderCOD); // For cart compatibility
orderRouter.get("/get-user-orders", authUser, getUserOrders);
orderRouter.get("/user-orders", authUser, getUserOrders); // Alternative endpoint
orderRouter.get("/admin", authAdmin, getAllOrders);
orderRouter.get("/all-orders", authAdmin, getAllOrders);
orderRouter.put("/update-status/:orderId", authAdmin, updateOrderStatus);
orderRouter.put("/cancel/:orderId", authUser, cancelOrder); 

export default orderRouter;
