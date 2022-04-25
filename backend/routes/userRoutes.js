const express = require("express");

const {
  getAllUsersData,
  findIncomeDataAndUpdate,
  findExpensesDataAndUpdate,
  addToUserIncome,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsersData);
router.route("/:id/income/:subID").patch(findIncomeDataAndUpdate);
router.route("/:id/expenses/:subID").patch(findExpensesDataAndUpdate);
router.route("/:id/income").patch(addToUserIncome);
module.exports = router;
