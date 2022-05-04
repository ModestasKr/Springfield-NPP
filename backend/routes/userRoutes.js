const express = require("express");

const {
  getAllUsersData,
  // getUserById,
  findIncomeDataAndUpdate,
  findExpensesDataAndUpdate,
  deleteUserIncome,
  deleteUserExpenses,
  createUserExpenses,
  createUserIncome,
  getBalance,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsersData);
// router.route("/:id").get(getUserById);
router.route("/:id/expenses/balance").get(getBalance);
router.route("/:id/expenses").patch(createUserExpenses);
router.route("/:id/income").patch(createUserIncome);
router.route("/:id/income/:subID").patch(findIncomeDataAndUpdate);
router.route("/:id/expenses/:subID").patch(findExpensesDataAndUpdate);
router.route("/:id/income/delete/:subID").patch(deleteUserIncome);
router.route("/:id/expenses/delete/:subID").patch(deleteUserExpenses);

module.exports = router;
