import mongoose, { Document, Schema } from "mongoose";
export interface IUser extends Document {
    username: string;
    password: string;
    role: string;
}
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});
export default mongoose.model<IUser>("User", UserSchema);