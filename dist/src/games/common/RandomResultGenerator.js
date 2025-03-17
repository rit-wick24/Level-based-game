"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomResultGenerator = void 0;
class RandomResultGenerator {
    constructor(settings) {
        this.resultMatrix = this.generateResults(settings);
    }
    generateResults(settings) {
        // ✅ Example: Generate a 3x5 slot matrix
        return Array.from({ length: settings.matrix.y }, () => Array.from({ length: settings.matrix.x }, () => Math.floor(Math.random() * 10)));
    }
}
exports.RandomResultGenerator = RandomResultGenerator;
