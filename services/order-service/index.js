// index.js
import { Kafka } from "kafkajs";
import mongoose from "mongoose";

// ===== MongoDB Connection =====
const MONGO_URI =
  "mongodb+srv://nisalmicro:micro1234@microcluster.w872zhn.mongodb.net/?retryWrites=true&w=majority&appName=microcluster";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===== Order Model =====
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cart: { type: Array, required: true },
  orderId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// ===== Kafka Setup =====
const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "order-service" });

// ===== Service Logic =====
const run = async () => {
  try {
    await consumer.connect();
    await producer.connect();

    await consumer.subscribe({
      topic: "payment-successful",
      fromBeginning: true,
    });

    console.log("📡 Listening for payment-successful events...");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { userId, cart } = JSON.parse(message.value.toString());

        // Create order in DB
        const dummyOrderId = Math.floor(Math.random() * 1000);
        const newOrder = new Order({ userId, cart, orderId: dummyOrderId });

        await newOrder.save();
        console.log(`✅ Order saved: ${dummyOrderId} for user: ${userId}`);

        // Publish order-successful event
        await producer.send({
          topic: "order-successful",
          messages: [
            {
              value: JSON.stringify({
                userId,
                orderId: dummyOrderId,
              }),
            },
          ],
        });

        console.log(
          `📤 order-successful event sent for Order ID: ${dummyOrderId}`
        );
      },
    });
  } catch (error) {
    console.error("Error in order service:", error);
  }
};

run().catch(console.error);
