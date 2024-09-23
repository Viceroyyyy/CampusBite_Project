import express from "express";
import { verifyOrder,deleteOrder } from "../controllers/verifyController.js";

const verifyRouter = express.Router();

verifyRouter.post('/verify',verifyOrder);
verifyRouter.post('/delete',deleteOrder);

export default verifyRouter;