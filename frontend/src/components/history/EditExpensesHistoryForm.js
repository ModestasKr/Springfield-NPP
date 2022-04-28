import React, { useState, useEffect } from "react";
import { findExpensesDataAndUpdate } from "../../api/libraries/apiLibraries";
import { useForm } from "react-hook-form";


function EditExpensesHistoryForm({
    getAllUsersData,
    id,
    category,
    amount,
    editFormStatus,
    setEditFormStatus,
    deleteItem,
    type,
    date,
    userId,
}) {
  const [userUpdateExpense, setUserUpdateIncome] = useState({
    amount: amount,
    type: type,
    date: date,
    category: category,
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
    findExpensesDataAndUpdate(userUpdateExpense, userId, id).then(() =>
    getAllUsersData()
    );
    setEditFormStatus(!editFormStatus);
  }
  return (
    <>
      <td className="custom-td">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <input
              className="custom-input"
              type="date"
              name="date"
              id="date-inp"
              min="2010-01-01"
              defaultValue={date.slice(0, 10)}
              onChange={(e) => updateExpenseObject(e)}
            />
          </div>
          <div className="mb-1">
            <input
              className="custom-input"
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
              <span className="text-danger fw-light">
                Būtinas laukas. Ne daugiau 10 simbolių, negali būti neigiamas
                skaičius.
              </span>
            )}
          </div>
          <div className="mb-1">
            <select
              className="custom-input"
              name="category"
              id="category"
              {...register("category", { required: true })}
              onChange={(e) => updateExpenseObject(e)}
            >
              <option value="Food and Drinks">Maistas ir gėrimai</option>
              <option value="Shopping">Apsipirkinėjimas</option>
              <option value="Housing">Namai</option>
              <option value="Transportation">Transportas</option>
              <option value="Vehicle">Mašina</option>
              <option value="Life and Entertainment">Pramogos</option>
              <option value="Communication,PC">Elektronika</option>
              <option value="Transportation">Transportas</option>
              <option value="Financial expenses">Mokesčiai</option>
              <option value="Invesments">Investicijos</option>
              <option value="Others">Kita</option>

            </select>
          </div>
          <div>
            <button type="submit" className="btn">
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setEditFormStatus(!editFormStatus)}
            >
             
            </button>
          </div>
        </form>
      </td>
    </>
  );
}

export default EditExpensesHistoryForm;
