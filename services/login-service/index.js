import express from "express";
import cors from "cors";
import { Kafka } from "kafkajs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Kafka setup
const kafka = new Kafka({
  clientId: "login-service",
  brokers: ["localhost:9094"],
});
const producer = kafka.producer();

// JWT secret key
const SECRET_KEY = "supersecretkey"; // In real apps, store in process.env

// Temporary in-memory users (no DB for now)
const users = [
  { id: 1, username: "nisal", password: "123456" },
  { id: 2, username: "alice", password: "password" },
];

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
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

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
    user: { id: user.id, username: user.username },
  });
});

// Start server
app.listen(7000, async () => {
  await producer.connect(); // Connect Kafka at startup
  console.log("✅ Login service running on port 7000");
});
