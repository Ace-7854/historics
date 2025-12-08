import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AccountLogin from "./middleware/loginHandler.js";
import MessageHandler from "./middleware/api_handler.js";

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
  console.log("Login attempt for user:", data.username);
  // const loginResult = AccountLogin(data);
  // res.json(loginResult);
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

app.post("/api/signup", (req, res) => {
  const data = req.body;
  console.log("Signup attempt for user:", data.username);
  // const signupResult = AccountSignup(data);
  // res.json(signupResult);
  if (data.username && data.password) {
    res.json({ status: "success", message: "User signed up successfully" });
  } else {
    res.json({ status: "fail", message: "Invalid signup data" });
  }
});


app.listen(3001, () => console.log("Backend running on port 3001"));