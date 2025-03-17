export class RandomResultGenerator {
    public resultMatrix: number[][];
  
    constructor(settings: any) {
      this.resultMatrix = this.generateResults(settings);
    }
  
    generateResults(settings: any): number[][] {
      // ✅ Example: Generate a 3x5 slot matrix
      return Array.from({ length: settings.matrix.y }, () =>
        Array.from({ length: settings.matrix.x }, () => Math.floor(Math.random() * 10))
      );
    }
  }