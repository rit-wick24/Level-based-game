import { Request, Response } from "express";
import Player from "../models/Player"; // ✅ Ensure this path is correct

// ✅ Corrected loginOrRegister function
export const loginOrRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uniqueId, googleId, name } = req.body;

    if (!uniqueId || !googleId || !name) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    let player = await Player.findOne({ uniqueId, googleId });

    if (!player) {
      player = new Player({ uniqueId, googleId, name });
      await player.save();
    }

    res.status(200).json({ message: "Login successful", player });
  } catch (error) {
    console.error("Error in loginOrRegister:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Incoming Request:", req.body);  // ✅ Debugging log

    const { uniqueId, googleId, amount, recharge } = req.body;

    if (!uniqueId || !googleId || amount === undefined || recharge === undefined) {
      console.error("❌ Missing required fields");
      res.status(400).json({ message: "Missing required fields", receivedData: req.body });
      return;
    }

    if (amount <= 0) {
      res.status(400).json({ message: "Amount must be greater than zero" });
      return;
    }

    const player = await Player.findOne({ uniqueId, googleId });

    if (!player) {
      res.status(404).json({ message: "Player not found" });
      return;
    }

    // ✅ Update balance
    player.balance += amount;

    // ✅ If recharge is true, track recharges separately
    if (recharge) {
      player.totalBet += amount;
    }

    await player.save();

    res.status(200).json({ message: "Balance updated", player });
  } catch (error) {
    console.error("Error in updateBalance:", error);
    res.status(500).json({ message: "Server error" });
  }
};