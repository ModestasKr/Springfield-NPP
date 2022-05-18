const mongoose = require("mongoose");

const loggingSchema = new mongoose.Schema({
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
    id: {
        type: String,
    },
});

const Log = new mongoose.model("Log", loggingSchema);

// Duomenų siuntimas į DB
// const addLog = new Log({

//     email: "betkoks@betkoks.japan",
//     action: "Prideta pajamos",
//     amount: 420,
// });

// addLog.save();

module.exports = Log;