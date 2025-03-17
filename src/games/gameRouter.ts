import express from "express";
import { BaseGame } from "./Level1/baseGame";

const router = express.Router();

router.post("/spin", async (req, res) => {
  const game = new BaseGame(req.body);
  await game.processSpin(req, res);
});

export default router;