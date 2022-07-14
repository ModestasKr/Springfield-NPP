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

const { addCategory, getCategory, deleteCategory, updateCategory } = require("../controllers/categoryController");

const router = express.Router();

router.route("/").get(getAllUsersData);
router.route("/logs").get(getLogs);
router.route("/add/log").post(addLog);
router.route("/category").get(getCategory);
router.route("/add/category").post(addCategory);
router.route("/category/update/:id").patch(updateCategory);
router.route("/updateUser").post(updateUserById);
router.route("/userByEmail").post(getUsersByEmail);
router.route("/deleteUser/:id").delete(deleteUserById);
router.route("/:id").get(getUserById);
router.route("/:id/expenses").post(createUserExpenses); // patch?
router.route("/:id/income").post(createUserIncome); // patch?
router.route("/category/delete/:id").get(deleteCategory);
router.route("/:id/income/:subID").post(findIncomeDataAndUpdate); // patch?
router.route("/:id/expenses/:subID").post(findExpensesDataAndUpdate); // patch?
router.route("/:id/income/month").get(getAllUserIncomeByMonth);
router.route("/:id/expenses/month").get(getAllUserExpensesByMonth);
router.route("/:id/income/delete/:subID").post(deleteUserIncome); // patch?
router.route("/:id/expenses/delete/:subID").post(deleteUserExpenses); // patch?
router.route("/:id/expenses/current/month").post(getUserExpensesByMonth);
router.route("/:id/income/current/month").post(getUserIncomeByMonth);
router.route("/:id/balance/current/month").post(getUserBalanceByMonth);

//Admin routes

module.exports = router;
