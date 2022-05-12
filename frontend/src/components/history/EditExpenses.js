import React, { useState } from "react";
import { findExpensesDataAndUpdate } from "../../api/libraries/apiLibraries";
import { useForm } from "react-hook-form";

const EditExpenses = ({
  handleCancelClick,
  subID,
  category,
  amount,
  type,
  date,
  userID,
  userData,
  updateUserData,
  name,
  setEditContactId,
}) => {
    const [userUpdateExpense, setUserUpdateExpense] = useState({
        amount: amount,
        type: type,
        date: date,
        category: category,
        name: name,
      });
    
      function updateExpenseObject(e) {
        e.preventDefault();
        userUpdateExpense[e.target.name] = e.target.value;
        console.log(userUpdateExpense);
      }
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      function onSubmit() {
        findExpensesDataAndUpdate(userUpdateExpense, userID, subID).then(() =>
          updateUserData(userID)
        );
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
                id="amount"
                step="0.01"
                defaultValue={amount}
                {...register("amount", {
                    required: true,
                    pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,
                    // min: 1,
                    maxLength: 10,
                })}
                onChange={(e) => updateExpenseObject(e)}
                />
                {errors.sum && (
                <span className="Edit-span">
                    Būtinas laukas. Ne daugiau 10 simbolių, negali būti neigiamas
                    skaičius.
                </span>
                )}
            </form>
        </td>
        <td>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select
                    className="Edit-input"
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
                    className="Edit-input"
                    type="date"
                    name="date"
                    id="date-inp"
                    min="2010-01-01"
                    defaultValue={date.slice(0, 10)}
                    onChange={(e) => updateExpenseObject(e)}
                />
            </form>
        </td>
        <td>
            <form onSubmit={handleSubmit(onSubmit)}>
                <button type="submit">Pakeisti</button>
                <button type="button" onClick={handleCancelClick}>Atšaukti</button>
            </form>
        </td>
    
  </tr>
  );
};

export default EditExpenses;
