import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/your-db";
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully! ✅");
    } catch (error) {
        console.error("MongoDB connection failed ❌:", error);
        process.exit(1);
    }
};
export default connectDB;