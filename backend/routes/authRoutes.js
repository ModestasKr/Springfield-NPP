const express = require("express");
const router = express.Router();

// const { createUser, getEmail } = require("../controllers/authController");


<<<<<<< HEAD
// const {
//   createUser,
//   loginUser,
//   logoutUser,
//   getEmail,
// } = require("../controllers/authController");


=======
>>>>>>> 97df790403a02083c40cd15f280328368e0945c5
const { createUser, loginUser, logoutUser, getEmail } = require("../controllers/authController");

router.route("/register").post(createUser);
router.route("/email").get(getEmail);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

module.exports = router;
