const mongoose = require("mongoose");

// DB schema
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "Password is too short (Minimum length is 8)"],
    required: [true, "Password is required"],
  },
  balance: {
    type: Number,
  },
  income: [
    {
      amount: {
        type: Number,
        required: [true, "This field is required"],
      },
      date: {
        type: Date,
        default: Date.now,
      },
      from: {
        type: String,
      },
      incomeName: {
        type: String,
      },
      category: {
        type: String,
        default: "Other",
      },
    },
  ],
  expense: [
    {
      amount: {
        type: Number,
        required: [true, "This field is required"],
      },
      date: {
        type: Date,
        default: Date.now,
      },
      date_created: {
        type: Date,
        default: Date.now,
        unmodifiable: true,
      },
      date_updated: {
        type: Date,
        default: Date.now,
      },
      expenseName: {
        type: String,
      },
      category: {
        type: String,
        default: "Other",
      },
    },
  ],
});

// Modelis DB lentelės pavadinimas
const Users = new mongoose.model("Users", usersSchema);

// Duomenų siuntimas į DB
const testUsers = new Users({
  username: "PetradsRokas",
  email: "rd@one.ltsdfsdf",
  password: "pass123KK",
  balance: "10000",
  income: [
    {
      amount: "500",
      date: "2021-01-01",
      from: "2021-02-01",
      incomeName: "Sport",
      category: "other",
    },
  ],
  expense: [
    {
      amount: "600",
      date: "2021-02-03",
      date_created: "2021-02-05",
      date_updated: "2021-02-06",
      expenseName: "Food",
      category: "Other",
    },
  ],
});

testUsers.save();

module.exports = Users;
