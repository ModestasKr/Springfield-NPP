const express = require("express");

const { createUser, getEmail } = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/email").get(getEmail);

module.exports = router;
