// test.js
import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://nisalmicro:micro1234@microcluster.w872zhn.mongodb.net/test?retryWrites=true&w=majority";

try {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB Atlas");
} catch (err) {
  console.error("❌ MongoDB connection error:", err);
}
