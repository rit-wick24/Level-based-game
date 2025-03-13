import express from "express";
import { loginOrRegister } from "../controllers/playerController";
import { updateBalance } from "../controllers/playerController";

const router = express.Router();

// ✅ Login or Register a Player
router.post("/login", async (req, res) => {
    await loginOrRegister(req, res);
  });
router.post("/update-balance", async (req, res) => {
    await updateBalance(req, res);
});
export default router;