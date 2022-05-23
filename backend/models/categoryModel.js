const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        maxLength: 30
    },
});

const Category = new mongoose.model("Category", categorySchema);

// Duomenų siuntimas į DB
const addCategory = new Category({

    category: "Kita",
});

addCategory.save();

module.exports = Category;