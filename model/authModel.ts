import mongoose from "mongoose";

interface iUser {
  email: string;
  password: string;
  userName: string;
}

interface iUserData extends iUser, mongoose.Document {}

const authModel = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", authModel);
