// Libraries
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// Component API
import { createUserIncome } from "../../api/libraries/apiLibraries";
import { createUserExpenses } from "../../api/libraries/apiLibraries";

// Components
import Balance from "./Balance";
// Style
import "./style/Form.css";
// Icon
import { BsPlusCircle } from "react-icons/bs";

function Form() {
  // UseState
  const [user, setUser] = useState({});
  const [income, setIncome] = useState({});
  const [incExp, SetIncExp] = useState("income");

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      accounting: "",
      category: "",
      amount: "",
      date: "",
    },
  });

  // Testavimas Ritai
  // ADD Expenses and Income
  function onSubmit(data) {
    // console.log(data);
    if ("date" in income) {
      // console.log(income);
    }
    // console.log(user);

    incExp === "income"
      ? createUserIncome(data, user._id)
      : createUserExpenses(data, user._id);
  }

  return (
    <div className="Form-container">
      <div>
        <Balance />
      </div>
      <div className="Form-body">
        <form className="Form-body-form" onSubmit={handleSubmit(onSubmit)}>
          <label>Accounting</label>
          <select
            onClick={(e) => {
              SetIncExp(e.target[e.target.selectedIndex].value);
              // console.log(e.target);
              // console.log(e.target[e.target.selectedIndex].value);
            }}
            {...register("accounting", {
              required: "This is requires",
            })}
          >
            <option value="select" disabled>
              Select
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <span className="error">{errors.accounting?.message}</span>

          <label>Category</label>
          <select
            {...register("category", {
              required: "This is requires",
            })}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Food and Drinks">Food and Drinks</option>
            <option value="Shopping">Shopping</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Life and Entertainment">
              Life and Entertainment
            </option>
            <option value="Communication,PC">Communication,PC</option>
            <option value="Financial expenses">Financial expenses</option>
            <option value="Invesments">Invesments</option>
            <option value="Income">Income</option>
            <option value="Others">Others</option>
          </select>
          <p className="error">{errors.category?.message}</p>

          <label>Amount</label>

          <input
            placeholder="Write a Amount"
            {...register("amount", {
              required: "This is requires",
              minLength: {
                minLength: 1,
                message: "Minimum lenght is 1",
              },

              pattern: {
                pattern: /^((?!0)\d{1,10}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/,
                message: "Badly typed symbols",
              },

              maxLength: {
                maxLength: 10,
                message: "Max lenght is 1000000",
              },
            })}
          />
          <p className="error">{errors.amount?.message}</p>

          <label>Date</label>
          <input
            type="date"
            {...register("date", {
              required: "This is requires",
              minLength: {
                min: "1899-01-01",
                message: "Max lenght is 1899-01-01",
              },
            })}
          />
          <p className="error">{errors.date?.message}</p>

          <button className="Form-btn" type="submit">
            <BsPlusCircle />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
