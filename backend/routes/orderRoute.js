import { placeOrder, userOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import express from "express";

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/userorders',authMiddleware,userOrder);

export default orderRouter;
