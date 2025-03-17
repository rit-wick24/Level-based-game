import { generateReelStrips } from "../common/reelGenerator";
import { calculateWinnings } from "../common/payoutCalulator";
import { loadParsheet } from "../common/parsheetLoader";
import Player from "../../models/Player";
import { Request, Response } from "express";

export class BaseGame {
  public settings: any;

  constructor(public playerData: any) {
    const gameConfig = loadParsheet();
    this.settings = {
      matrix: gameConfig.matrix,
      paylines: gameConfig.linesApiData,
      Symbols: gameConfig.Symbols,
      bets: gameConfig.bets,
    };
    this.processSpin = this.processSpin.bind(this);
  }

   async processSpin(req: Request, res: Response)  {
    try {
      const { uniqueId, googleId, betAmount } = req.body;
      const player = await Player.findOne({ uniqueId, googleId });

      if (!player) return res.status(404).json({ message: "Player not found" });

      if (betAmount > player.balance)
        return res.status(400).json({ message: "Insufficient balance" });

      // ✅ Deduct balance
      player.balance -= betAmount;
      player.totalBet += betAmount;

      // ✅ Generate spin result
      const reels = generateReelStrips();
      const resultMatrix = this.generateSpinResult(reels);

      // ✅ Calculate winnings
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
    for (let row = 0; row < 3; row++) {
      const rowResult: string[] = [];
      for (let col = 0; col < 5; col++) {
        const randomIndex = Math.floor(Math.random() * reels[col].length);
        rowResult.push(reels[col][randomIndex]);
      }
      resultMatrix.push(rowResult);
    }
    return resultMatrix;
  }
}