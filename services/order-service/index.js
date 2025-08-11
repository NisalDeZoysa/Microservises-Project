import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "order-service" });

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: "payment-successful",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { userId, cart } = JSON.parse(message.value.toString());

        // TODO : create order in DB
        const dummyOrderId = Math.floor(Math.random() * 10000);
        console.log("Order Consumer creating order for user:", userId);

        await producer.send({
          topic: "order-successful",
          messages: [
            { value: JSON.stringify({ userId, orderId: dummyOrderId }) },
          ],
        });
      },
    });
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  }
};

run().catch(console.error);
