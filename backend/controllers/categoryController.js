const Category = require("../models/categoryModel");

exports.addCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      results: Category.length,
      data: {
        category: newCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      status: "success",
      results: Category.length,
      data: {
        category: category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
