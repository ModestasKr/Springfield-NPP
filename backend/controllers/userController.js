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

// Update User by Id
exports.updateUserById = async (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  try {
    await Users.findByIdAndUpdate(req.body.id, req.body);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// get user BY email
exports.getUsersByEmail = async (req, res) => {
  try {
    const user = await Users.find({ email: req.body.email });

    res.status(200).json({
      status: "success",
      results: user.length,
      data: {
        users: user,
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

// Add user income
exports.createUserIncome = async (req, res) => {
  try {
    const updated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { income: req.body } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        income: updated,
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
  try {
    const updated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { expenses: req.body } },
      {
        new: true,
      }
    );
    // console.log(updated);
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

exports.deleteUserById = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);

    res.status(204).json({
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

// Get user expenses by current month
exports.getUserExpensesByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { expenses } = users[0];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const filteredYear = expenses.filter(
      (expItem) => expItem.date.getFullYear() === currentYear
    );

    const filteredMonth = filteredYear.filter(
      (item) => item.date.getMonth() === currentMonth
    );

    const filteredExpensesC = filteredMonth.filter(
      (expensesC) => expensesC.category
    );

    const allExpensesCurrentMonth = filteredMonth.reduce(
      (n, { amount }) => n + amount,
      0
    );


    function compare_category( a, b )
  {
  if ( a.category.toLowerCase() < b.category.toLowerCase()){
    return -1;
  }
  if ( a.category.toLowerCase() > b.category.toLowerCase()){
    return 1;
  }
  return 0;
}
    // Išrušiuoja kategorijas pagal abėcėlę
    filteredExpensesC.sort(compare_category)

    var expenseCategories = [];
    var expenseSums = [];

    //Išrūšiuotam masyve patikrina pasikartojančias kategorijas ir sudeda jų sumas
    for(let i = 0; i<filteredExpensesC.length; i++){
      if(filteredExpensesC[i].category===expenseCategories[expenseCategories.length-1]){
        expenseSums[expenseSums.length-1] += filteredExpensesC[i].amount
      } else {
        expenseSums.push(filteredExpensesC[i].amount)
        expenseCategories.push(filteredExpensesC[i].category)
      }
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        expenses: allExpensesCurrentMonth,
        currentExpensesC: filteredExpensesC, 
        duomenys: [
          expenseSums,
          expenseCategories,
        ],
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// Get user income by current month
exports.getUserIncomeByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { income } = users[0];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const filteredYear = income.filter(
      (incomeItem) => incomeItem.date.getFullYear() === currentYear
    );

    const filteredMonth = filteredYear.filter(
      (item) => item.date.getMonth() === currentMonth
    );

    const filteredIncomeC = filteredMonth.filter((incomeC) => incomeC.category);

    const allIncomeCurrentMonth = filteredMonth.reduce(
      (n, { amount }) => n + amount,
      0
    );

    function compare_category( a, b )
    {
    if ( a.category.toLowerCase() < b.category.toLowerCase()){
      return -1;
    }
    if ( a.category.toLowerCase() > b.category.toLowerCase()){
      return 1;
    }
    return 0;
  }
      // Išrušiuoja kategorijas pagal abėcėlę
      filteredIncomeC.sort(compare_category)
  
      var incomeCategories = [];
      var incomeSums = [];
  
      //Išrūšiuotam masyve patikrina pasikartojančias kategorijas ir sudeda jų sumas
      for(let i = 0; i<filteredIncomeC.length; i++){
        if(filteredIncomeC[i].category===incomeCategories[incomeCategories.length-1]){
          incomeSums[incomeSums.length-1] += filteredIncomeC[i].amount
        } else {
          incomeSums.push(filteredIncomeC[i].amount)
          incomeCategories.push(filteredIncomeC[i].category)
        }
      }
    
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        income: allIncomeCurrentMonth,
        currentIncomeC: filteredMonth,
        duomenys: [
          incomeSums,
          incomeCategories,
        ],
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// Get user income by current month
exports.getUserBalanceByMonth = async (req, res) => {
  // console.log(req.params.id, "Sveiki");
  try {
    const users = await Users.find({ _id: req.params.id });
    const { income } = users[0];
    //Gaunam current month incomes
    const currentYearI = new Date().getFullYear();
    const currentMonthI = new Date().getMonth();
    const filteredYearI = income.filter(
      (incomeItem) => incomeItem.date.getFullYear() === currentYearI
    );
    const filteredMonthI = filteredYearI.filter(
      (item) => item.date.getMonth() === currentMonthI
    );
    const allIncomeCurrentMonth = filteredMonthI.reduce(
      (n, { amount }) => n + amount,
      0
    );
    //Gaunam current month expenses
    const { expenses } = users[0];
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

    var currentMonthBalance = allIncomeCurrentMonth - allExpensesCurrentMonth;

    res.status(200).json({
      status: "success",
      data: {
        balance: currentMonthBalance,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;

for (let y = 2021; y <= currentYear; y++) {
  if (y !== currentYear) {
    for (let m = 1; m <= 12; m++) {
      // console.log(y, m);
    }
  } else {
    for (let m = 1; m <= currentMonth; m++) {
      // console.log(y, m);
    }
  }
}

exports.getAllUserIncomeByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { income } = users[0];

    var sortedIncomeByDate = income.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });

    const startYear = sortedIncomeByDate[0].date.getFullYear();
    const endYear =
      sortedIncomeByDate[sortedIncomeByDate.length - 1].date.getFullYear();
    const incomeArray = [];

    for (var i = startYear; i <= endYear; i++) {
      var filteredYear = sortedIncomeByDate.filter(
        (item) => item.date.getFullYear() === i
      );

      var yearArray = [];
      yearArray.push({ year: i });
      var monthArray = [];

        


      for (var y = 1; y <= 12; y++) {
        if (filteredYear.filter((item) => item.date.getMonth() + 1 === y)) {
          var filteredMonth = filteredYear.filter(
            (item) => item.date.getMonth() + 1 === y
          );
          var allIncome = filteredMonth.reduce(
            (n, { amount }) => n + amount,
            0
          );
          monthArray.push(allIncome.toFixed(2));
        } else {
          monthArray.push(0);
        }
      }

      var merged = [];

      yearArray.map((year) => {
        merged.push({
          yearInc: year.year,
          dataInc: monthArray,
        });
      });
      incomeArray.push(...merged);
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        income: incomeArray,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.getAllUserExpensesByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { expenses } = users[0];

    var sortedExpensesByDate = expenses.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });

    const startYear = sortedExpensesByDate[0].date.getFullYear();
    const endYear =
      sortedExpensesByDate[sortedExpensesByDate.length - 1].date.getFullYear();
    const expensesArray = [];

    for (var i = startYear; i <= endYear; i++) {
      var filteredYear = sortedExpensesByDate.filter(
        (item) => item.date.getFullYear() === i
      );

      var yearArray = [];
      yearArray.push({ year: i });
      var monthArray = [];

      for (var y = 1; y <= 12; y++) {
        if (filteredYear.filter((item) => item.date.getMonth() + 1 === y)) {
          var filteredMonth = filteredYear.filter(
            (item) => item.date.getMonth() + 1 === y
          );
          var allExpenses = filteredMonth.reduce(
            (n, { amount }) => n + amount,
            0
          );
          monthArray.push(allExpenses.toFixed(2));
        } else {
          monthArray.push(0);
        }
      }

      var merged = [];
      yearArray.map((year) => {
        merged.push({
          yearExp: year.year,
          dataExp: monthArray,
        });
      });

      expensesArray.push(...merged);
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        expenses: expensesArray,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};
