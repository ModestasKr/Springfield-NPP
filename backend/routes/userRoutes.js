const express = require("express");

const {
  getAllUsersData,
  findIncomeDataAndUpdate,
  findExpensesDataAndUpdate,
  deleteUserIncome,
  deleteUserExpenses,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsersData);
router.route("/:id/income/:subID").patch(findIncomeDataAndUpdate);
router.route("/:id/expenses/:subID").patch(findExpensesDataAndUpdate);
router.route("/:id/income/:subID").delete(deleteUserIncome);
router.route("/:id/expenses/:subID").delete(deleteUserExpenses);

module.exports = router;
