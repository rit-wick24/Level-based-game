import express from "express";
import { BaseGame } from "./Level1/BaseGame";

const router = express.Router();
const game = new BaseGame({});

// ✅ Ensure `processSpin` is properly called
// router.post("/spin", game.processSpin);
router.post("/spin", (req, res) => {
  game.processSpin(req, res).catch((err) => res.status(500).send(err.message));
});

export default router;