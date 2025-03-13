import express from "express";
import { register, login } from "../controllers/authController"; // ✅ Ensure this is correct

const router = express.Router();

router.post("/register", register);  // ✅ Defines the register route
router.post("/login", login);

export default router;