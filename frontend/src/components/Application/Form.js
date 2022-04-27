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
          <label>Apskaita</label>
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
            <option value="" disabled>
              Pasirinkti
            </option>
            <option value="income">Pajamos</option>
            <option value="expense">Išlaidos</option>
          </select>
          <span className="error">{errors.accounting?.message}</span>

          <label>Kategorijos</label>
          <select
            {...register("category", {
              required: "This is requires",
            })}
          >
            <option value="" disabled>
              Pasirinkti
            </option>
            <option value="Food and Drinks">Maistas ir gėrimai</option>
            <option value="Shopping">Apsipirkimai</option>
            <option value="Housing">Namams</option>
            <option value="Transportation">Transportas</option>
            <option value="Vehicle">Mašina</option>
            <option value="Life and Entertainment">
              Gyvenimas ir linksmybės
            </option>
            <option value="Communication,PC">komunikacija,PC</option>
            <option value="Financial expenses">Finansinės išlaidos</option>
            <option value="Invesments">Investavimas</option>
            <option value="Others">Kitas</option>
          </select>
          <p className="error">{errors.category?.message}</p>

          <label>Suma</label>

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

          <label>Data</label>
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
            Pridėti
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
