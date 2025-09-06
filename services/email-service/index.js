
import { Kafka } from "kafkajs";
import nodemailer from "nodemailer";

const kafka = new Kafka({
  clientId: "email-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "email-service" });

// Configure transporter (example with Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nisalzoysa2001@gmail.com", // Replace with your Gmail
    pass: "dvwe axbp djfi lvxn", // Use App Password (not your Gmail password)
  },
});

const run = async () => {
  try {
    await consumer.connect();
    await producer.connect();
    await consumer.subscribe({
      topic: "order-successful",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const { userId, orderId } = JSON.parse(message.value.toString());

        // Send email
        const mailOptions = {
          from: "nisalzoysa2001@gmail.com",
          to: "nisalchandirade@gmail.com",
          subject: `Order Confirmation - ${orderId}`,
          text: `Hello User ${userId}, your order with ID ${orderId} has been successfully placed!`,
        };

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log("✅ Email sent:", info.messageId);

          // Send Kafka message after success
          await producer.send({
            topic: "email-successful",
            messages: [
              { value: JSON.stringify({ userId, emailId: info.messageId }) },
            ],
          });
        } catch (err) {
          console.error("❌ Failed to send email:", err);
        }
      },
    });
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  }
};

run().catch(console.error);
