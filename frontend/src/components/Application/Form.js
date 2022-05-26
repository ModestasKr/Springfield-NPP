// Libraries
import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
// Component API
import { addLog, createUserIncome } from "../../api/libraries/apiLibraries";
import { createUserExpenses } from "../../api/libraries/apiLibraries";
// Context
import { useGlobalUserContext, UserContext } from "../../util/UserContext.js";
import { useGlobalCategoriesContext, CategoriesContext } from "../../util/categoryContext.js";
import CategoryCard from "../../page/admin/Dashboard/category/CategoryCard";
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
  const { expensesCategories } = useGlobalCategoriesContext();
  


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
          addLog({
            email: user.email,
            action: `Pridėta pajamos`,
            amount: data.amount,
            date_created: new Date(),
          });
          updateUserData(user._id);
        })
      : createUserExpenses(data, user._id).then(() => {
          addLog({
            email: user.email,
            action: `Pridėta išlaidos`,
            amount: data.amount,
            date_created: new Date(),
          });
          updateUserData(user._id);
        });
  }

  var category = expensesCategories.map((item) => {
              
    return  (
       <option key={item._id}>  {item.category} </option>
    );
  });



  return (
    <div className="Form-container">
      <div>
        <Balance id={user._id} />
      </div>
      <div className="Form-body">
        <form className="Form-body-form" onSubmit={handleSubmit(onSubmit)}>
          <select
            onClick={(e) => {
              SetIncExp(e.target[e.target.selectedIndex].value);
            }}
            {...register("accounting", {
              required: "Įvestyje neparinkti duomenys",
            })}
          >
            <option value="" select="true">
              Apskaita
            </option>
            <option value="income">Pajamos</option>
            <option value="expense">Išlaidos</option>
          </select>
          <span className="error">{errors.accounting?.message}</span>
          <select id="category" name="category"
            {...register("category",  {
              required: "Įvestyje neparinkti duomenys",
            })}
          >
            {category}
          </select>
          <p className="error">{errors.category?.message}</p>

          <input
            placeholder="Suma"
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

          {/* <label>Data</label> */}
          <input
            type="date"
            min="2021-01-01"
            max="2041-01-01"
            defaultValue={new Date().toISOString().substr(0, 10)}
            {...register("date")}
          />
          <p className="error">{errors.date?.message}</p>

          <input
            placeholder="Pavadinimas"
            type="text"
            {...register("name", {
              maxLength: {
                value: 20,
                message: "Daugiausia 20 simbolių",
              },
            })}
          />
          <p className="error">{errors.name?.message}</p>

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
