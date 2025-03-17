import fs from "fs";
import path from "path";

export const loadParsheet = (level: number) => {
  try {
    const filePath = path.join(__dirname, `../Level${level}/parsheet.json`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Parsheet not found at: ${filePath}`);
      throw new Error("Parsheet not found");
    }

    const parsheet = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return parsheet;
  } catch (error) {
    console.error("Error loading parsheet:", );
    return null;
  }
};