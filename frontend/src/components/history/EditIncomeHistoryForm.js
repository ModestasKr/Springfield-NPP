import React, { useState, useEffect } from "react";
import { findIncomeDataAndUpdate } from "../../api/libraries/apiLibraries";
import { useForm } from "react-hook-form";


function EditIncomeHistoryForm({
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
  const [userUpdateIncome, setUserUpdateIncome] = useState({
    amount: amount,
    type: type,
    date: date,
    category: category,
  });

  function updateIncomeObject(e) {
    e.preventDefault();
    userUpdateIncome[e.target.name] = e.target.value;
    console.log(userUpdateIncome);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    findIncomeDataAndUpdate(userUpdateIncome, userId, id).then(() =>
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
              onChange={(e) => updateIncomeObject(e)}
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
              onChange={(e) => updateIncomeObject(e)}
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
              onChange={(e) => updateIncomeObject(e)}
            >
              <option value="Alga">Alga</option>
              <option value="Pensija">Premija</option>
              <option value="Dovana">Dovana</option>
              <option value="Kita">Kita</option>
            </select>
          </div>
          <div>
            <button type="submit" className="btn">Pataisyti
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setEditFormStatus(!editFormStatus)}
            >Atšaukti
             
            </button>
          </div>
        </form>
      </td>
    </>
  );
}

export default EditIncomeHistoryForm;
