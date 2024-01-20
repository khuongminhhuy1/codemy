import "dotenv/config";
import mongoose from "mongoose";

export const connectDatabase = (req, res) => {
  mongoose
    .connect(process.env.DB_URL, {
      connectTimeoutMS: 30000,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database not Connected ", err));
};
