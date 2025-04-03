import { createOrder } from '../controllers/orderContoller.js';
import express from "express"

const router = express.Router();


router.post("/create", createOrder)
export default router