import React, { useState } from "react";
import { findIncomeDataAndUpdate } from "../../api/libraries/apiLibraries";
import { useForm } from "react-hook-form";

const EditIncome = ({
  handleCancelClick,
  subID,
  category,
  amount,
  type,
  date,
  userID,
  Render,
  name,
  setEditContactId,
}) => {
    const [userUpdateIncome, setUserUpdateIncome] = useState({
        amount: amount,
        type: type,
        name: name,
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
        findIncomeDataAndUpdate(userUpdateIncome, userID, subID).then(() => Render());
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
                    onChange={(e) => updateIncomeObject(e)}
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
                    id="name"
                    defaultValue={name}
                    {...register("name", {
                        maxLength: 40,
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
                    id="date-inp"
                    min="2010-01-01"
                    defaultValue={date.slice(0, 10)}
                    onChange={(e) => updateIncomeObject(e)}
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

export default EditIncome;
