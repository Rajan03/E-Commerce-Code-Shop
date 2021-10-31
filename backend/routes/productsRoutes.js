import express from "express";
import {
    createProduct,
    deleteProductById,
    getProductById,
    getProducts,
    reviewProduct,
    updateProduct,
} from "../controllers/productController.js";
import {isAdmin, protectRoute} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protectRoute, isAdmin, createProduct);
router.route("/:id/reviews").post(protectRoute, reviewProduct);
router
    .route("/:id")
    .get(getProductById)
    .put(protectRoute, isAdmin, updateProduct)
    .delete(protectRoute, isAdmin, deleteProductById);

export default router;
