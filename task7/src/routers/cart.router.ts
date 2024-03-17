import { Router } from "express";
import {
  deleteCartByUserId,
  getCartByUserId,
  updateCartItems,
  createOrder,
} from "../controllers/carts.controller";
import validateUpdateCart from "../middlewares/validateUpdateCart";
import isAdmin from "../middlewares/isAdmin";
const router = Router();

router.get("/", getCartByUserId);
router.put("/", validateUpdateCart, updateCartItems);
router.delete("/", isAdmin, deleteCartByUserId);
router.post("/checkout", createOrder);

export default router;
