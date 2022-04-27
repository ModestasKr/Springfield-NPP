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
  // const date = users.date.toString().substr(0, 10);

  return (
    <tr>
      <td>{amount}</td>
      <td>{category}</td>
      <td>{date}</td>
      <td>
        <button type="button" onClick={() => deleteItem(userID, subID, type)}>
          Ištrinti
        </button>
      </td>
    </tr>
  );
}

export default HistoryTable;
