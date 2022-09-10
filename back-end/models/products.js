const mongoose = require("mongoose");
const productsSchemma = new mongoose.Schema({
  name: { type: String, requried: true, max: 100 },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "UserRegistration",
    required: true,
  },
  price: { type: String, requried: true, max: 100 },
  description: { type: String, max: 1000 },
  color: { type: String, requried: true, max: 100 },
});
module.exports = mongoose.model("Products", productsSchemma);
