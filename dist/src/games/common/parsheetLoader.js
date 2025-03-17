"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadParsheet = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loadParsheet = (level) => {
    try {
        const filePath = path_1.default.join(__dirname, `../Level${level}/parsheet.json`);
        if (!fs_1.default.existsSync(filePath))
            throw new Error("Parsheet not found");
        const parsheet = JSON.parse(fs_1.default.readFileSync(filePath, "utf8"));
        return parsheet;
    }
    catch (error) {
        console.error("Error loading parsheet:", error);
        return null;
    }
};
exports.loadParsheet = loadParsheet;
