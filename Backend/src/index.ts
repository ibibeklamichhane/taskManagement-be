import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors"; 



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the .env file.");
}

app.use(cors()); 

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);


mongoose
  .connect(DATABASE_URL, {})
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
