import React, { useState } from "react";
import { findExpensesDataAndUpdate, addLog } from "../../api/libraries/apiLibraries";
import { useForm } from "react-hook-form";
import "./style/Button.css";
import { useGlobalUserContext, UserContext } from "../../util/UserContext";


const EditExpenses = ({
  handleCancelClick,
  subID,
  category,
  amount,
  type,
  date,
  userID,
  name,
  setEditContactId,
}) => {
  const { userData, updateUserData } = useGlobalUserContext(UserContext);

  const [userUpdateExpense, setUserUpdateExpense] = useState({
    amount: amount,
    type: type,
    date: date,
    category: category,
    name: name,
  });
  const data = {
    email: userData.email,
    action: `Pakeistos išlaidos`,
    subID: subID,
    date_created: new Date(),
  }

  function updateExpenseObject(e) {
    e.preventDefault();
    userUpdateExpense[e.target.name] = e.target.value;
  }

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

  function onSubmit() {
    findExpensesDataAndUpdate(userUpdateExpense, userID, subID, data).then(() => {
      addLog(data)
      updateUserData(userID)
    });
    setEditContactId(null);
  }

  return (
    <tr>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Suma"
            type="number"
            name="amount"
            step="0.01"
            defaultValue={amount}
            {...register("amount", {
              required: true,
              pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,
              minLength: 1,
              maxLength: 10,
            })}
            onChange={(e) => updateExpenseObject(e)}
          />
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            name="category"
            id="category"
            {...register("category", { required: true })}
            onChange={(e) => updateExpenseObject(e)}
          >
            <option value="Maistas ir gėrimai">Maistas ir gėrimai</option>
            <option value="Apsipirkimai">Apsipirkimai</option>
            <option value="Namams">Namams</option>
            <option value="Transportas">Transportas</option>
            <option value="Mašina">Mašina</option>
            <option value="Gyvenimas ir linksmybės">
              Gyvenimas ir linksmybės
            </option>
            <option value="Elektronika">Elektronika</option>
            <option value="Financinės išlaidos">Financinės išlaidos</option>
            <option value="Investicijos">Investicijos</option>
            <option value="Kita">Kita</option>
          </select>
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Pavadinimas"
            className="Edit-input"
            id="name"
            defaultValue={name}
            {...register("name", {
              maxLength: 40,
            })}
            onChange={(e) => updateExpenseObject(e)}
          />
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="date"
            name="date"
            id="date-inp"
            min="2010-01-01"
            max={new Date().toLocaleDateString('lt-LT')}
            defaultValue={date.slice(0, 10)}
            onChange={(e) => updateExpenseObject(e)}
          />
        </form>
      </td>
      <td className="EditExpenses-button">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">Pakeisti</button>
          <button type="submit" onClick={handleCancelClick}>
            Atšaukti
          </button>
        </form>
      </td>
    </tr>
  );
};

export default EditExpenses;
