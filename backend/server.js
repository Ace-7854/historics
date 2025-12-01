import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import accountLogin from "./middleware/loginHandler.js";

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
  const loginResult = accountLogin(data);
  res.json(loginResult);
  console.log("Login attempt for user:", data.username);
});


app.listen(3001, () => console.log("Backend running on port 3001"));
