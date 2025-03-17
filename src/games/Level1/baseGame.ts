import { generateReelStrips } from "../common/reelGenerator";
import { calculateWinnings } from "../common/payoutCalulator";
import { loadParsheet } from "../common/parsheetLoader";
import Player from "../../models/Player";
import { Request, Response } from "express";

export class BaseGame {
  constructor(public playerData: any) {
    this.processSpin = this.processSpin.bind(this); // ✅ Bind method explicitly
  }

  async processSpin(req: Request, res: Response) {
    try {
      const { uniqueId, googleId, betAmount } = req.body;
      const player = await Player.findOne({ uniqueId, googleId });

      if (!player) return res.status(404).json({ message: "Player not found" });

      if (betAmount > player.balance)
        return res.status(400).json({ message: "Insufficient balance" });

      player.balance -= betAmount;
      player.totalBet += betAmount;

      const reels = generateReelStrips();
      const resultMatrix = this.generateSpinResult(reels);

      const winnings = calculateWinnings(resultMatrix, betAmount);
      player.balance += winnings;
      player.totalWon += winnings;

      await player.save();

      return res.status(200).json({
        message: "Spin processed",
        balance: player.balance,
        winnings,
        resultSymbols: resultMatrix,
      });
    } catch (error) {
      console.error("Error processing spin:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  generateSpinResult(reels: string[][]): string[][] {
    const resultMatrix: string[][] = [];
    for (let row = 0; row < 3; row++) {  // ✅ Row loop exists (good)
      const rowResult: string[] = [];
      for (let col = 0; col < 5; col++) { // ✅ Column loop exists (good)
        const randomIndex = Math.floor(Math.random() * reels[col].length);
        rowResult.push(reels[col][randomIndex]); // ❌ Only selecting 1 symbol per column (Not 3 per column)
      }
      resultMatrix.push(rowResult);
    }
    return resultMatrix;
  }
}