import React, { useState, useEffect } from "react";
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
  userID,
}) {
  const dateWithoutZeros = date.toString().substr(0, 10);
  const [editFormStatus, setEditFormStatus] = useState(false);
  
  return (
    <>
    <tr>
    <td>{dateWithoutZeros}</td>
      <td>{amount}</td>
      <td>{category}</td>
      <td>{type}</td>
  const dateFixed = date.toString().substr(0, 10);
   

  let colorClass = (str) => {
    if (str === "income") {
      return "table-income";
    } else {
      return "table-expense";
    }
  };


  return (
    <tr id="">
      <td className={colorClass(type)} >{amount}</td>
      <td>{category}</td>
      <td>{dateFixed}</td>
      <td>
        <button onClick={() => deleteItem(userID, subID, type)}>
          Ištrinti
        </button>
        <button >
          Redaguoti
        </button>
      </td>
      <td>
        <button
            className="button"
            onClick={() => setEditFormStatus(!editFormStatus)}
          >Update
        </button>
        </td>
    </tr>
    <tr>
    {editFormStatus && type === "income" && (
      <EditIncomeHistoryForm
        getAllUsersData={getAllUsersData}
        key={subID}
        id = {subID}
        category ={category}
        amount = {amount}
        editFormStatus={editFormStatus}
        setEditFormStatus={setEditFormStatus}
        deleteItem ={deleteItem}
        type={type}
        date={date}
        userId={userId}
      />
    )}
    {editFormStatus && type === "expenses" && (
      <EditExpensesHistoryForm
      getAllUsersData={getAllUsersData}
      key={subID}
      id = {subID}
      category ={category}
      amount = {amount}
      editFormStatus={editFormStatus}
      setEditFormStatus={setEditFormStatus}
      deleteItem ={deleteItem}
      type={type}
      date={date}
      userId={userId}
      />
    )}
  </tr>
  </>
  );
}

export default HistoryTable;
