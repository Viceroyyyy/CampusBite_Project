import { listOrders, placeOrder, updateOrderStatus, userOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import express from "express";

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/userorders',authMiddleware,userOrder);
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updateOrderStatus);

export default orderRouter;
