import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// // Import routes
// import authRoutes from "./routes/auth.js";
// import chatRoutes from "./routes/chat.js";

// app.use("/auth", authRoutes);
// app.use("/chat", chatRoutes);

app.listen(3001, () => console.log("Backend running on port 3001"));
