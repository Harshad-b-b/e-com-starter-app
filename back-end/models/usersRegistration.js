const mongoose = require("mongoose");
const userRegistrationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    max: 30,
    unique: true,
    dropDups: true,
  },
  name: { type: String, required: true, max: 50 },
  lastName: { type: String, requird: true, max: 50 },
  email: { type: String, required: true, max: 50 },
  password: { type: String, required: true, max: 50 },
});
module.exports = mongoose.model("UserRegistration", userRegistrationSchema);
