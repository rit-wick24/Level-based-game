export function initializeGameSettings(parsheet: any, playerData: any) {
  return {
    id: parsheet.id,
    matrix: parsheet.matrix,
    bets: parsheet.bets,
    Symbols: parsheet.Symbols,
    resultSymbolMatrix: [],
    currentGamedata: parsheet,
    lineData: parsheet.linesApiData,
    useJackpot: parsheet.useJackpot,
    jackpotAmount: parsheet.jackpotAmount,
    wild: {
      SymbolName: "",
      SymbolID: -1,
      useWild: false,
    },
  };
}

export function checkForWin(settings: any) {
  console.log("Checking for win...");
  return settings.resultSymbolMatrix;
}