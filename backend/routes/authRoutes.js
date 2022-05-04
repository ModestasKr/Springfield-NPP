const express = require("express");
const router = express.Router();

const { createUser, loginUser, logoutUser } = require("../controllers/authController");


router.route("/register").post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;
