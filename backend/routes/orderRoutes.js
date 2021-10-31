import express from "express";
import {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderToDelivery,
    updateOrderToPaid,
} from "../controllers/orderController.js";
import {isAdmin, protectRoute} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protectRoute, addOrderItems).get(protectRoute, isAdmin, getAllOrders);
router.route("/myorders").get(protectRoute, getMyOrders);
router.route("/:id").get(protectRoute, getOrderById);
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);
router.route("/:id/deliver").put(protectRoute, isAdmin, updateOrderToDelivery);

export default router;
