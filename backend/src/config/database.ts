import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.DB_URL || "";

export const dbConnect = () => {
  mongoose
    .connect(URL, {
      family: 4,
    })
    .then((data) => console.log("DB connected successfully"))
    .catch((err) => console.log("Error while connecting to DB ", err));
};
