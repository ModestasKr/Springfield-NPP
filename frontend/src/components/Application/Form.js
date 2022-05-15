// Libraries
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// Component API
import { createUserIncome } from "../../api/libraries/apiLibraries";
import { createUserExpenses } from "../../api/libraries/apiLibraries";
// Context
import { useGlobalUserContext, UserContext } from "../../util/UserContext.js";
// Components
import Balance from "./Balance";
// Style
import "./style/Form.css";

function Form() {
  // UseState
  const [user, setUser] = useState({});
  const [income, setIncome] = useState({});
  const [incExp, SetIncExp] = useState("income");
  const { userData, updateUserData } = useGlobalUserContext(UserContext);
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      accounting: "",
      name: "",
      category: "",
      amount: "",
      date: "",
    },
  });

  // POST data in database
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  function onSubmit(data) {
    if ("date" in income) {
    }

    incExp === "income"
      ? createUserIncome(data, user._id).then(() => {
          updateUserData(user._id);
        })
      : createUserExpenses(data, user._id).then(() => {
          updateUserData(user._id);
        });
  }

  return (
    <div className="Form-container">
      <div>
        <Balance id={user._id} />
      </div>
      <div className="Form-body">
        <form className="Form-body-form" onSubmit={handleSubmit(onSubmit)}>
          <label>Apskaita</label>
          <select
            onClick={(e) => {
              SetIncExp(e.target[e.target.selectedIndex].value);
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
            <option value="Maistas ir gėrimai">Maistas ir gėrimai</option>
            <option value="Apsipirkimai">Apsipirkimai</option>
            <option value="Namams">Namams</option>
            <option value="Transportas">Transportas</option>
            <option value="Mašina">Mašina</option>
            <option value="Gyvenimas ir linksmybės">
              Gyvenimas ir linksmybės
            </option>
            <option value="Komunikacija,PC">Komunikacija,PC</option>
            <option value="Investavimas">Investavimas</option>
            <option value="Kitas">Kitas</option>
          </select>
          <p className="error">{errors.category?.message}</p>

          <label>Pavadinimas</label>
          <input
            placeholder="Parašykite pavadinimą"
            type="text"
            {...register("name", {
              maxLength: {
                value: 20,
                message: "Daugiausia 20 simbolių",
              },
            })}
          />
          <p className="error">{errors.name?.message}</p>
          <label>Suma</label>
          <input
            placeholder="Parašykite suma"
            type="number"
            step="0.01"
            {...register("amount", {
              required: "Įvestyje nesuvesti duomenys",
              pattern: {
                value: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,
                message: "Tokios sumos nėra",
              },
              minLength: {
                value: 1,
                message: "Mažiausia 1 skaitmuo",
              },
              maxLength: {
                value: 10,
                message: "Daugiausia 10 skaitmenų",
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
            {...register("date")}
          />
          <button className="Form-btn" type="submit">
            Pridėti
          </button>
          <button className="Login-form-btn" type="reset">
            Anuliuoti
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
