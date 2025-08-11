import express from "express";
import cors from "cors";
import { Kafka } from "kafkajs";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();

const connectToKafka = async () => {
  try {
    await producer.connect();
    console.log("Connected to Kafka successfully -- producer connected");

    // You can add additional setup here, like creating topics if needed
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  }
};

app.use(express.json());

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.post("/payment-service", async (req, res) => {
  const { cart } = req.body;
  //Assume we get the ccookie and decrypt the user id

  const userId = "12345"; // Placeholder for user ID extraction logic

  //TODO: Payment
  console.log("Api called for payment processing");
  //KAFKA
  await producer.send({
    topic: "payment-successful",
    messages: [{ value: JSON.stringify({ userId, cart }) }],
  });

  return res.status(200).json({
    message: "Payment processed successfully",
    userId: userId,
    cart: cart,
  });
});

app.listen(8000, () => {
  connectToKafka().catch((error) => {
    console.error("Failed to connect to Kafka:", error);
  });
  console.log("Payment service is running on port 8000");
});
