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
      topics: ["payment-successful", "order-successful", "email-successful"],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        switch (topic) {
          case "payment-successful":
            {
              const { userId, cart } = JSON.parse(message.value.toString());
              const total = cart.reduce((acc, item) => acc + item.price, 0);
              console.log(
                `Analytic consumer ${userId} made a payment of $${total}`
              );
            }
            break;
          case "order-successful":
            {
              const { userId, orderId } = JSON.parse(message.value.toString());
              console.log(
                `Analytic consumer order created for user ${userId} with order ID ${orderId}`
              );
            }
            break;
          case "email-successful":
            {
              const { userId, emailId } = JSON.parse(message.value.toString());
              console.log(
                `Analytic consumer email sent to user ${userId} with email ID ${emailId}`
              );
            }
            break;
          default:
            console.log(`Unknown topic`);
        }
      },
    });
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  }
};

run().catch(console.error);

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
