import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
  uniqueId: string;   // Unity will send this
  googleId: string;   // Google authentication ID
  name: string;
  balance: number;
  xpPoints: number;
  totalBet: number;
  totalWon: number;
}

const PlayerSchema = new Schema<IPlayer>({
  uniqueId: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 },
  xpPoints: { type: Number, default: 0 },
  totalBet: { type: Number, default: 0 },
  totalWon: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IPlayer>("Player", PlayerSchema);