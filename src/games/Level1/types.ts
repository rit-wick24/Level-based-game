export interface GameSettings {
    id: string;
    matrix: { x: number, y: number };
    bets: number[];
    Symbols: Symbol[];
    resultSymbolMatrix: any[];
    jackpotAmount: number[];
    useJackpot: boolean;
    lineData: any[];
    };
export interface Symbol {
  Name: string;
  Id: number;
  payout: number;
  reelInstance: { [key: string]: number };
}