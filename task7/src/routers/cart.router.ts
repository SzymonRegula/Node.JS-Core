import { Router } from "express";
import {
  deleteCartByUserId,
  getCartByUserId,
  updateCartItems,
  createOrder,
} from "../controllers/carts.controller";
import { isAdmin, validateUpdateCart } from "../middlewares";
const router = Router();

router.get("/", getCartByUserId);
router.put("/", validateUpdateCart, updateCartItems);
router.delete("/", isAdmin, deleteCartByUserId);
router.post("/checkout", createOrder);

export default router;
