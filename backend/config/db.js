import "dotenv/config";
import mongoose from "mongoose";

export const connectDatabase = (req, res) => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database not Connected ", err));
};
