// routes/orderRoutes.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createOrder, getMyOrders, getSellerOrders, updateOrderStatus} from "../controller/OrderController.js";

const orderrouter = express.Router();

// Create a new order
orderrouter.post("/createorder", verifyToken, createOrder);

// Get logged-in user's orders
orderrouter.get("/myorder", verifyToken, getMyOrders);

orderrouter.get("/sellerorders", verifyToken, getSellerOrders);

// orderrouter.put("/:orderId/status", verifyToken, updateOrderStatus);

export default orderrouter;
