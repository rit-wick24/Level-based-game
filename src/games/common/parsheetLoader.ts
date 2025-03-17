import fs from "fs";
import path from "path";

export function loadParsheet(): any {
  const filePath = path.join(__dirname, "../Level1/parsheet.json");
  if (!fs.existsSync(filePath)) {
    throw new Error("PARSHEET NOT FOUND");
  }
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}