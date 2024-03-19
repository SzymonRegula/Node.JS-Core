import { Router } from "express";
import { validateRegisterUser } from "../middlewares";
import { loginUser, registerUser } from "../controllers/users.controller";

const router = Router();

router.post("/register", validateRegisterUser, registerUser);
router.post("/login", loginUser);

export default router;
