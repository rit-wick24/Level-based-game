"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController"); // ✅ Ensure this is correct
const router = express_1.default.Router();
router.post("/register", authController_1.register); // ✅ Defines the register route
router.post("/login", authController_1.login);
exports.default = router;
