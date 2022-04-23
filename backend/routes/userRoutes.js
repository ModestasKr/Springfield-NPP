const express = require("express");

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  // findPlacesAndUpdate,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// router.route("/:id/:subId").patch(findPlacesAndUpdate);

module.exports = router;
