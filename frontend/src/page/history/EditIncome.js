import React, { useState } from "react";
import { findIncomeDataAndUpdate, addLog } from "../../api/libraries/apiLibraries";
import { useForm } from "react-hook-form";
import "./style/Button.css";
// import { setActionOptionsFor } from "sweetalert/typings/modules/state";
import { useGlobalUserContext, UserContext } from "../../util/UserContext";


const EditIncome = ({
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

  // Direct property with useState
  const [userUpdateIncome] = useState({
    amount: amount,
    type: type,
    name: name,
    date: date,
    category: category,
  });
const [logData] = useState(0);
const data = {
  email: userData.email,
  action: `Pakeistos pajamos`,
  subID: subID,
  date_created: new Date(),
}
console.log(logData)
  // Update input data
  function updateIncomeObject(e) {
    // Give default value using property value default
    e.preventDefault();
    // Direct value
    userUpdateIncome[e.target.name] = e.target.value;
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
  // Update data clicked by handleSubmit
  function onSubmit() {
    // Direct parameters
    findIncomeDataAndUpdate(userUpdateIncome, userID, subID, data).then(() => {
      updateUserData(userID);
      addLog(data)
    });
    // NULL ????
    setEditContactId(null);
  }

  return (
    <tr>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="Edit-input"
            placeholder="Suma"
            type="number"
            name="amount"
            step="0.01"
            defaultValue={amount}
            {...register("amount", {
              required: true,
              pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,
              minLenght: 1,
              maxLength: 10,
            })}
            onChange={(e) => updateIncomeObject(e)}
          />
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            className="Edit-input"
            name="category"
            {...register("category", { required: true })}
            onChange={(e) => updateIncomeObject(e)}
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
            defaultValue={name}
            {...register("name", {
              maxLength: 20,
            })}
            onChange={(e) => updateIncomeObject(e)}
          />
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="Edit-input"
            type="date"
            name="date"
            min="2021-01-01"
            max={new Date().toLocaleDateString('lt-LT')}
            defaultValue={date.slice(0, 10)}
            onChange={(e) => updateIncomeObject(e)}
          />
        </form>
      </td>
      <td className="EditIncome-button">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">Pakeisti</button>
          <button type="button" onClick={handleCancelClick}>
            Atšaukti
          </button>
        </form>
      </td>
    </tr>
  );
};

export default EditIncome;
