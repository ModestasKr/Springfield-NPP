import React, { useState } from "react";
import EditExpensesHistoryForm from "./EditExpensesHistoryForm";
import EditIncomeHistoryForm from "./EditIncomeHistoryForm";

import "./style/TableHistory.css";

function HistoryTable({
  userId,
  subID,
  getAllUsersData,
  category,
  amount,
  deleteItem,
  type,
  date,
  name,
  userID,
  Render,
}) {
  const dateWithoutZeros = date.toString().substr(0, 10);
  const [editFormStatus, setEditFormStatus] = useState(false);
  let colorClass = (str) => {
    if (str === "income") {
      return "table-income";
    } else {
      return "table-expense";
    }
  };
  return (
    <>
      <tr className="HistoryTable-row">
        <td className={colorClass(type)}>{amount}</td>
        <td>{category}</td>
        <td>{name}</td>
        <td>{dateWithoutZeros}</td>
        <td className="HistoryTable-button">
          <button type="button" onClick={() => deleteItem(userID, subID, type)}>
            Ištrinti
          </button>
          <button
            className="button"
            onClick={() => setEditFormStatus(!editFormStatus)}
          >
            Atnaujinti
          </button>
        </td>
      </tr>
      <tr>
        {editFormStatus && type === "income" && (
          <EditIncomeHistoryForm
            getAllUsersData={getAllUsersData}
            key={subID}
            id={subID}
            category={category}
            amount={amount}
            editFormStatus={editFormStatus}
            setEditFormStatus={setEditFormStatus}
            deleteItem={deleteItem}
            type={type}
            date={date}
            userID={userID}
            Render={Render}
            name={name}
          />
        )}
        {editFormStatus && type === "expenses" && (
          <EditExpensesHistoryForm
            getAllUsersData={getAllUsersData}
            key={subID}
            id={subID}
            category={category}
            amount={amount}
            editFormStatus={editFormStatus}
            setEditFormStatus={setEditFormStatus}
            deleteItem={deleteItem}
            type={type}
            date={date}
            userID={userID}
            Render={Render}
            name={name}
          />
        )}
      </tr>
    </>
  );
}

export default HistoryTable;
