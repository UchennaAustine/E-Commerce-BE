import mongoose from "mongoose";

const url: string = "mongodb://127.0.0.1:27017/SalesDB";

export const DatabaseConnection = async () => {
  await mongoose.connect(url).then(() => {
    console.log("active");
  });
};
