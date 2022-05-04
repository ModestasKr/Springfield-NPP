const Users = require("./../models/userModel");

// GET method all user data
exports.getAllUsersData = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Update Income array
exports.findIncomeDataAndUpdate = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);
  console.log(req.body);
  try {
    const updateIncome = await Users.findOneAndUpdate(
      { _id: req.params.id, "income._id": req.params.subID },
      {
        $set: {
          "income.$.date": req.body.date,
          "income.$.category": req.body.category,
          "income.$.amount": req.body.amount,
          "income.$.name": req.body.name,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        users: updateIncome,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Update Expenses array
exports.findExpensesDataAndUpdate = async (req, res) => {
  try {
    const updateExpenses = await Users.findOneAndUpdate(
      { _id: req.params.id, "expenses._id": req.params.subID },
      {
        $set: {
          "expenses.$.name": req.body.name,
          "expenses.$.date": req.body.date,
          "expenses.$.category": req.body.category,
          "expenses.$.amount": req.body.amount,
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        users: updateExpenses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Create a new expense (/:id/expenses)
exports.createUserExpenses = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  try {
    const updated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { expenses: req.body } },
      {
        new: true,
      }
    );
    console.log(updated);
    res.status(200).json({
      status: "success",
      data: {
        expenses: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// DELETE method user array
exports.deleteUserIncome = async (req, res) => {
  try {
    const deleteIncome = await Users.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        income: deleteIncome,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// DELETE method user array

// ("/:id/expenses/delete/:subID")
exports.deleteUserExpenses = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);

  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { expenses: { _id: req.params.subID } } }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// ("/:id/income/delete/:subID")
exports.deleteUserIncome = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subID);

  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { income: { _id: req.params.subID } } }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Add user income
exports.createUserIncome = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.subId);
  try {
    const updated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { income: req.body } },
      {
        new: true,
      }
    );
    console.log(updated);
    res.status(200).json({
      status: "success",
      data: {
        tour: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


//////////////////////////////////////

// exports.getBalance = async (req, res) => {
//     try {
//       const getBalance = await Users.find();
    
//     res.status(200).json({
//       data: {
//         expenses: users
        
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

exports.getBalance = async (req, res) => {
  try {
    const users = await Users.find();
    let expensesSuma = 0;
    
    users[0].expenses.forEach((expense)=>{
      expensesSuma += expense.amount
    })
    let incomeSuma = 0;
    users[0].income.forEach((income)=>{
      incomeSuma += income.amount
    })
    let balansas = incomeSuma - expensesSuma;


    res.status(200).json({
      
      status: "success",
      results: users.length,
      data: {
        expenses: users[0].expenses,balansas,
        income: users[0].income,balansas
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.getDate = async (req, res) => {
  try {
    const users = await Users.find();
    let dated = 0
    console.log(dated)
    users[0].expenses.forEach((dateExpense)=>{
      dated = dateExpense.date
      console.log(dateExpense.date)
    })

    res.status(200).json({
      
      status: "success",
      results: users.length,
      data: {
        date: dateExpense.date.toString().substr(0, 7)
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.getUserExpensesByMonth = async (req, res) => {
  // console.log(req.params.id);
  try {
    const users = await Users.find({ _id: req.params.id });

    const { expenses } = users[0];
    // console.log(income);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const filteredYear = expenses.filter(
      (expItem) => expItem.date.getFullYear() === currentYear
    );

    const filteredMonth = filteredYear.filter(
      (item) => item.date.getMonth() === currentMonth
    );

    const allExpensesCurrentMonth = filteredMonth.reduce(
      (n, { amount }) => n + amount,
      0
    );

    // console.log(allExpensesCurrentMonth);

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        expenses: allExpensesCurrentMonth,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};