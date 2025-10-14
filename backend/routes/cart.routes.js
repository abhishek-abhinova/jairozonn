import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { addToCart, removeFromCart, getCart, updateCart } from "../controllers/cart.controller.js";
const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/remove", authUser, removeFromCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.get("/get", authUser, getCart);

export default cartRouter;