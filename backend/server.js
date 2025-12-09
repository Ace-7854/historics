import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import accountLogin from "./middleware/loginHandler.js";
import {addUsers} from "./config/db_handler.js";
import { hashPassword } from "./security/hash.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
  console.log("Health check received -> New client activated");
});

app.post("/api/login", (req, res) => {
  const data = req.body;

  console.log("Login attempt for user:", data);
  
  const loginResult = accountLogin(data);
  res.json(loginResult);
});


app.post("/api/message", (req, res) => {
  const data = req.body;
  console.log("Message received:", data);
  // const message = MessageHandler(data.message);
  res.json({
    role: "bot",
    text: data.message // frontend expects "text"
  });
});

app.post("/api/signup", async (req, res) => {
  const data = req.body;
  console.log("Signup attempt for user:", data.username);
  try {
    data.password = await hashPassword(data.password);
    const signupResult = addUsers(data.username, data.password);
    res.json({ status: 'success', message: 'Signup successful' });
  }
  catch (error) {
    res.json({ status: error, message: "Signup failed" });
  }
});


app.listen(3001, () => console.log("Backend running on port 3001"));