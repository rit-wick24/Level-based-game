import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const registerUser = async ({ username, password, role }: { username: string; password: string; role: string }) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error("Username already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    return { token: generateToken(newUser), user: newUser };
};
export const loginUser = async ({ username, password }: { username: string; password: string }) => {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) throw new Error("Invalid credentials");
    return { token: generateToken(user), user };
};
const generateToken = (user: any) => jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });