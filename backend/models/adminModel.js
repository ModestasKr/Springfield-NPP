const mongoose = require("mongoose");

const loggingSchema = new mongoose.Schema({
    date_created: {
        type: Date,
        unmodifiable: true,
      },
    email: {
        type: String,
    },
    action: {
        type: String,
    },
    subID: {
        type: String,
    },
     amount: {
        type: Number,
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