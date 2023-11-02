import mongoose from "mongoose";

interface store {
  title: string;
  image: string;
  imageID: string;
  cost: number;
}

interface iStore extends store, mongoose.Document {}

const storeModel = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    cost: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iStore>("users", storeModel);
