const Users = require("../models/userModel");

// Send data in to database
exports.createUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Check email
exports.getEmail = async (req, res) => {
  console.log(req.params.email);

  try {
    const email = await Users.findOne({ email: req.body.email });

    res.status(200).json({
      status: "success",
      results: email.length,
      data: {
        email: email,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
