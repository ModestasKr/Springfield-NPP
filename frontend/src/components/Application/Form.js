// Libraries
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// Component API
import { createUserIncome } from "../../api/libraries/apiLibraries";

// Components
import Balance from "./Balance";
// Style
import "./style/Form.css";
// Icon
import { BsPlusCircle } from "react-icons/bs";

function Form() {
  const [user, setUser] = useState({});
  const [income, setIncome] = useState({});

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

  function onSubmit(data) {
    console.log(data);
    if ("date" in income) {
      console.log(income);
    }
    console.log(user);
    createUserIncome(data, user._id);
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
            {...register("accounting", {
              required: "This is requires",
            })}
          >
            <option value="">Select</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <p className="error">{errors.accounting?.message}</p>

          <label>Category</label>
          <select
            {...register("category", {
              required: "This is requires",
            })}
          >
            <option value="">Select</option>
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
                value: 1,
                message: "Minimum lenght is 1",
              },
              maxLength: {
                value: 1000000,
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
