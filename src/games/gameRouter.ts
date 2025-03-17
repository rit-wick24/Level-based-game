import express from "express";
import { BaseGame } from "./Level1/BaseGame";

const router = express.Router();
const game = new BaseGame({});

// ✅ Ensure `processSpin` is properly called
// router.post("/spin", game.processSpin);

export default router;