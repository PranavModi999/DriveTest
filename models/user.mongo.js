const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  car_details: {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    plateNumber: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("users", userSchema);
