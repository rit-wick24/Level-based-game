import { loadParsheet } from "../common/parsheetLoader";
import { getLevelFromXP } from "../common/XPManager";
import { RandomResultGenerator } from "../common/RandomResultGenerator";
import { PayoutCalculator } from "../common/payoutCalulator"; 
import { initializeGameSettings, checkForWin } from "./helper";
import { GameSettings } from "./types";
import { Request, Response } from "express";
import Player from "../../models/Player";

export class BaseGame {
  public settings: GameSettings;
  public payoutCalculator: PayoutCalculator; // ✅ Declare `payoutCalculator` as a class property

  constructor(public playerData: any) {
    const level = getLevelFromXP(playerData.xpPoints);
    const parsheet = loadParsheet(level);

    if (!parsheet) throw new Error("Missing parsheet data!");

    this.settings = initializeGameSettings(parsheet, playerData);
    this.payoutCalculator = new PayoutCalculator(); // ✅ Initialize the payout calculator
  }

  async processSpin(req: Request, res: Response) {
    try {
      const { uniqueId, googleId, betAmount } = req.body;
      const player = await Player.findOne({ uniqueId, googleId });

      if (!player) return res.status(404).json({ message: "Player not found" });

      if (betAmount > player.balance)
        return res.status(400).json({ message: "Insufficient balance" });

      // ✅ Deduct bet amount
      player.balance -= betAmount;
      player.totalBet += betAmount;

      // ✅ Generate spin result
      const result = new RandomResultGenerator(this.settings);
      checkForWin(this.settings);

      // ✅ Use `payoutCalculator` instance correctly
      this.payoutCalculator.calculatePayout(this.settings.lineData, this.settings.bets[1]);
      const wonAmount = this.payoutCalculator.totalWinningAmount;

      const xpGained = Math.floor((betAmount + wonAmount) / 10);

      player.totalWon += wonAmount;
      player.xpPoints += xpGained;
      player.balance += wonAmount;

      await player.save();

      return res.status(200).json({
        message: "Spin processed",
        balance: player.balance,
        xpPoints: player.xpPoints,
        winnings: wonAmount,
        resultSymbols: result.resultMatrix,
      });
    } catch (error) {
      console.error("Error processing spin:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}