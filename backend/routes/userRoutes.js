const express = require("express");

const {
  getAllUsersData,
  getUserById,
  findIncomeDataAndUpdate,
  findExpensesDataAndUpdate,
  deleteUserIncome,
  deleteUserExpenses,
  createUserExpenses,
  createUserIncome,
  getUserExpensesByMonth,
  getUserIncomeByMonth,
  getUserBalanceByMonth,
  getAllUserIncomeByMonth,
  getAllUserExpensesByMonth,
  
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsersData);
router.route("/:id").get(getUserById);
router.route("/:id/expenses").patch(createUserExpenses);
router.route("/:id/income").patch(createUserIncome);
router.route("/:id/income/:subID").patch(findIncomeDataAndUpdate);
router.route("/:id/expenses/:subID").patch(findExpensesDataAndUpdate);
router.route("/:id/income/month").get(getAllUserIncomeByMonth);
router.route("/:id/expenses/month").get(getAllUserExpensesByMonth);
router.route("/:id/income/delete/:subID").patch(deleteUserIncome);
router.route("/:id/expenses/delete/:subID").patch(deleteUserExpenses);
router.route("/:id/expenses/current/month").get(getUserExpensesByMonth);
router.route("/:id/income/current/month").post(getUserIncomeByMonth);
router.route("/:id/balance/current/month").post(getUserBalanceByMonth);

module.exports = router;
