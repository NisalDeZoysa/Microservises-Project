const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  price: Number,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
