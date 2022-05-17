const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    date_created: {
        type: Date,
        default: Date.now,
        unmodifiable: true,
      },
    email: {
        type: String,
    },
    action: {
        type: String,
    },
    amount: {
        type: Number,
    },
});

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;