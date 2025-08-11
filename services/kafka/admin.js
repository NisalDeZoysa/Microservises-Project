import { kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: ["localhost:9094"],
});

const admin = kafka.admin();

const run = async () => {
  await admin.connect();
  console.log("Connected to Kafka");

  await admin.createTopics({
    topics: [{ topic: "payment-successful" }, { topic: "order-successful" }],
  });
  console.log("Topics created successfully");
};

run().catch((error) => {
  console.error("Error in Kafka admin service:", error);
});
