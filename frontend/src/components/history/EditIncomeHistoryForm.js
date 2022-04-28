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
    userID,
    Render,
    name,
}) {
  const [userUpdateIncome, setUserUpdateIncome] = useState({
    amount: amount,
    type: type,
    name: name,
    date: date,
    category: category,
    name: name,
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
    findIncomeDataAndUpdate(userUpdateIncome, userID, id).then(() =>
    Render()
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
              <option value="Maistas ir gėrimai">Maistas ir gėrimai</option>
              <option value="Apsipirkimai">Apsipirkimai</option>
              <option value="Namams">Namams</option>
              <option value="Transportas">Transportas</option>
              <option value="Mašina">Mašina</option>
              <option value="Gyvenimas ir linksmybės">Gyvenimas ir linksmybės</option>
              <option value="Elektronika">Elektronika</option>
              <option value="Financinės išlaidos">Financinės išlaidos</option>
              <option value="Investicijos">Investicijos</option>
              <option value="Kita">Kita</option>
            </select>
          </div>
          <div>
            <input
            placeholder="Pavadinimas"
            className="custom-input"
            name="name"
            id="name"
            {...register("name")}
            onChange={(e) => updateIncomeObject(e)}/>
          </div>
          <div>
            <input
            type="text"
            className="custom-input" 
            id="name"
            defaultValue={name}
            {...register("name", {
              maxLength: 40,
            })}
            onChange={(e) => updateIncomeObject(e)}
            />
          </div>
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
