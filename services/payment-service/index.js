import express from "express";
import cors from "cors";
import { Kafka } from "kafkajs";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.post("/payment-service ", async (req, res) => {
  const { cart } = req.body;
  //Assume we get the ccookie and decrypt the user id

  const userId = "12345"; // Placeholder for user ID extraction logic

  //TODO: Payment
  console.log("Api called for payment processing");
  //KAFKA

  return res.status(200).json({
    message: "Payment processed successfully",
    userId: userId,
    cart: cart,
  });
});

app.listen(8000, () => {
  console.log("Payment service is running on port 8000");
});
