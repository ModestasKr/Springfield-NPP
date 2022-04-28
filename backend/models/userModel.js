const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "income",
  },
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
  name: {
    type: String,
    default: "Other",
  },
  category: {
    type: String,
    default: "Other",
  },
});

const expenseSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "expenses",
  },
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
  name: {
    type: String,
    default: "Other",
  },
  category: {
    type: String,
    default: "Other",
  },
});

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
  income: [incomeSchema],
  expenses: [expenseSchema],
});

// ModelDb table name
const Users = new mongoose.model("Users", usersSchema);

// Duomenų siuntimas į DB
// const testUsers = new Users({
//   username: "Rokas",
//   email: "Norvilis@gmail.com",
//   password: "pass123KK",
//   balance: "10000",
//   income: [
//     {
//       type: "income",
//       amount: "500",
//       date: "2021-01-01",
//       incomeName: "Job",
//       category: "Job",
//       date_created: "2021-02-05",
//       date_updated: "2021-02-06",
//     },
//   ],
//   expenses: [
//     {
//       type:"expenses",
//       amount: "600",
//       date: "2021-02-03",
//       expenseName: "Food",
//       category: "Food",
//       date_created: "2021-02-05",
//       date_updated: "2021-02-06",
//     },
//   ],
// });

// testUsers.save();

module.exports = Users;
