"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const registerUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password, role }) {
    const existingUser = yield User_1.default.findOne({ username });
    if (existingUser)
        throw new Error("Username already exists");
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new User_1.default({ username, password: hashedPassword, role });
    yield newUser.save();
    return { token: generateToken(newUser), user: newUser };
});
exports.registerUser = registerUser;
const loginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password }) {
    const user = yield User_1.default.findOne({ username });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password)))
        throw new Error("Invalid credentials");
    return { token: generateToken(user), user };
});
exports.loginUser = loginUser;
const generateToken = (user) => jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
