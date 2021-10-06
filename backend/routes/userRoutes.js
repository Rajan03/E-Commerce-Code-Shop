import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { isAdmin, protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protectRoute, isAdmin, getAllUsers);

router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

router
  .route("/:id")
  .delete(protectRoute, isAdmin, deleteUser)
  .get(protectRoute, isAdmin, getUserById)
  .put(protectRoute, isAdmin, updateUser);

router.route("/login").post(authUser);

export default router;
