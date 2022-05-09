const express = require("express");
const router = express.Router();

// const { createUser, getEmail } = require("../controllers/authController");

const {
  createUser,
  loginUser,
  logoutUser,
  getUserEmail,
} = require("../controllers/authController");

router.route("/register").post(createUser);
router.route("/email").get(getUserEmail);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

module.exports = router;
