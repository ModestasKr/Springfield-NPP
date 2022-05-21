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
  getUsersByEmail,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

const { addLog, getLogs } = require("../controllers/adminController");

const router = express.Router();

router.route("/").get(getAllUsersData);
router.route("/logs").get(getLogs);
router.route("/add/log").post(addLog);
router.route("/updateUser").post(updateUserById);
router.route("/userByEmail").post(getUsersByEmail);
router.route("/deleteUser/:id").delete(deleteUserById);
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

//Admin routes

module.exports = router;
