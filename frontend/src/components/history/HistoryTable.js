// Libraries
import React from "react";
// Style
import "./style/TableHistory.css";
//  Icons
// import { FiEdit } from "react-icons/fi";
// import { AiOutlineDelete } from "react-icons/ai";

function HistoryTable({
  userID,
  subID,
  category,
  amount,
  deleteItem,
  type,
  date,
}) {
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
    </tr>
  );
}

export default HistoryTable;
