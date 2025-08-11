// import { Kafka } from "kafkajs"; // Capital K here

// const kafka = new Kafka({
//   clientId: "analytic-service",
//   brokers: ["localhost:9094"], // Make sure this matches your Kafka container port
// });

// const consumer = kafka.consumer({ groupId: "analytic-service" });

// const run = async () => {
//   try {
//     await consumer.connect();
//     await consumer.subscribe({
//       topic: "payment-successful",
//       fromBeginning: true,
//     });

//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const value = JSON.parse(message.value.toString());
//         const { userId, cart } = JSON.parse(value);

//         const total = cart.reduce((acc, item) => acc + item.price, 0);
//         console.log(`Analytic consumer ${userId} made a payment of $${total}`);
//       },
//     });
//   } catch (error) {
//     console.error("Error connecting to Kafka:", error);
//   }
// };

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "analytic-service",
  brokers: ["localhost:9094"],
});

const consumer = kafka.consumer({ groupId: "analytic-service" });

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
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        console.log(`Analytic consumer ${userId} made a payment of $${total}`);
      },
    });
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  }
};

run().catch(console.error);
