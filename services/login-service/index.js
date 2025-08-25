import express from "express";
import cors from "cors";
import { Kafka } from "kafkajs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(express.json());

// Kafka setup
const kafka = new Kafka({
  clientId: "login-service",
  brokers: ["localhost:9094"],
});
const producer = kafka.producer();

// JWT secret key
const SECRET_KEY = "supersecretkey"; // In real apps, store in process.env

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", service: "login-service" });
});

// Temporary in-memory users (no DB for now)
const users = [
  { id: 1, username: "nisal", password: "123456", role: "admin" },
  { id: 2, username: "alice", password: "password", role: "seller" },
  { id: 3, username: "hiruna", password: "hii@1234", role: "admin" },
  { id: 4, username: "user1", password: "hii@user1", role: "user" },
];

// -------------------- SIGNUP --------------------
app.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  // check if user exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // create new user
  const newUser = {
    id: users.length + 1,
    username,
    password,
    role: role || "user", // default role = user
  };
  users.push(newUser);

  // Create JWT token
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username, role: newUser.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  // Publish Kafka signup event
  try {
    await producer.send({
      topic: "user-signedup",
      messages: [{ value: JSON.stringify(newUser) }],
    });
    console.log(`📤 user-signedup event sent for user: ${username}`);
  } catch (err) {
    console.error("Kafka publish error:", err);
  }

  res.json({
    message: "Signup successful",
    token,
    user: { id: newUser.id, username: newUser.username, role: newUser.role },
  });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  // Publish Kafka event
  try {
    await producer.connect();
    await producer.send({
      topic: "login-successful",
      messages: [
        { value: JSON.stringify({ userId: user.id, username: user.username }) },
      ],
    });
    console.log(`📤 login-successful event sent for user: ${username}`);
  } catch (err) {
    console.error("Kafka publish error:", err);
  }

  res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
  });
});

// Start server
app.listen(7001, async () => {
  await producer.connect(); // Connect Kafka at startup
  console.log("✅ Auth service (login + signup) running on port 7001");
});
