export interface GameSettings {
    id: string;
    matrix: { x: number, y: number };
    bets: number[];
    Symbols: Symbol[];
    resultSymbolMatrix: any[];
    jackpotAmount: number[];
    useJackpot: boolean;
    lineData: any[];
    wild: {
      SymbolName: string;
      SymbolID: number;
      useWild: boolean
  },
    };
export interface Symbol {
  Name: string;
  Id: number;
  payout: number;
  reelInstance: { [key: string]: number };
}