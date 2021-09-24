import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protectRoute, addOrderItems);
router.route("/:id").get(protectRoute, getOrderById);
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);
router.route("/myorders").put(protectRoute, getMyOrders);

export default router;
