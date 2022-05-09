const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    maxLength: [40, "Too long"],
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
    maxLength: [40, "Too long"],
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

// encrypting password before saving
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// verify password
usersSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

// get the token
usersSchema.methods.jwtGenerateToken = function () {
  return jwt.sign({ id: this.id }, `${process.env.JWT_SECRET}`, {
    expiresIn: 3600,
  });
};

// ModelDb table name
const Users = new mongoose.model("Users", usersSchema);

module.exports = Users;
