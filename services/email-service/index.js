import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "email-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "email-service" });

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: ["email-successful", "order-successful", "payment-successful"],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { userId, orderId } = JSON.parse(message.value.toString());

        // TODO : send email to the user
        const dummyEmailId = Math.floor(Math.random() * 10000);
        console.log("Email consumer sending email for order:");

        await producer.send({
          topic: "email-successful",
          messages: [
            { value: JSON.stringify({ userId, email: dummyEmailId }) },
          ],
        });
      },
    });
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  }
};

run().catch(console.error);
