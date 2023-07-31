const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    default: "demo",
    type: String,
    required: true,
  },
  password: {
    default: "demo",
    type: String,
    required: true,
  },
  userType: {
    default: "Driver",
    type: String,
    required: true,
  },
  firstName: {
    default: "default",
    type: String,
    required: true,
  },
  lastName: {
    default: "default",
    type: String,
    required: true,
  },

  age: {
    default: 0,
    type: Number,
    required: true,
  },
  birthDate: {
    default: "default",
    type: String,
    required: true,
  },
  licenseNumber: {
    default: "default",
    // unique: true,
    type: String,
    required: true,
  },
  appointmentId: {
    default: "N/A",
    type: String,
  },
  car_details: {
    make: {
      default: "default",
      type: String,
      required: true,
    },
    model: {
      default: "default",
      type: String,
      required: true,
    },
    year: {
      default: 0,
      type: Date,
      required: true,
    },
    plateNumber: {
      default: "default",
      type: String,
      required: true,
    },
  },
});

// userSchema.pre("save", function (next) {
//   bcrypt.hash(this.licenseNumber, 10, (error, hash) => {
//     this.licenseNumber = hash;
//     next();
//   });
// });

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (error, hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("users", userSchema);
