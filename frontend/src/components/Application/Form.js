// Libraries
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// Component API
import { createUserIncome } from "../../api/libraries/apiLibraries";
import { createUserExpenses } from "../../api/libraries/apiLibraries";
// Hooks

// Components
import Balance from "./Balance";
// Style
import "./style/Form.css";

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
              required: "Įvestyje neparinkti duomenys",
            })}
          >
            <option value="" select="true">
              Pasirinkti
            </option>
            <option value="income">Pajamos</option>
            <option value="expense">Išlaidos</option>
          </select>
          <span className="error">{errors.accounting?.message}</span>

          <label>Kategorijos</label>
          <select
            {...register("category", {
              required: "Įvestyje neparinkti duomenys",
            })}
          >
            <option value="" select="true">
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
            placeholder="Parašykite suma"
            type="number"
            step="0.01"
            {...register("amount", {
              required: "Įvestyje nesuvesti duomenys",
              minLength: {
                minLength: 1,
                message: "Mažiausias ilgis yra 1 simbolis",
              },
              pattern: {
                pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,
                message: "Blogai suvesti simboliai",
              },
              maxLength: {
                maxLength: 10,
                message: "Didžiausias ilgis yra 10 simbolių",
              },
            })}
          />
          <p className="error">{errors.amount?.message}</p>

          <label>Data</label>
          <input
            type="date"
            min="2021-01-01"
            max="2041-01-01"
            defaultValue={new Date().toISOString().substr(0, 10)}
          />
          <button className="Form-btn" type="submit">
            Pridėti
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
