import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AccountLogin from "./middleware/loginHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
  console.log("Health check received -> New client activated");
});

app.post("/api/user", (req, res) => {
  const data = req.body;
  const loginResult = AccountLogin(data);
  res.json(loginResult);
  console.log("Login attempt for user:", data.username);
});


app.post("/api/message", (req, res) => {
  const data = req.body;
  console.log("Message received:", data);
  
});

app.listen(3001, () => console.log("Backend running on port 3001"));
