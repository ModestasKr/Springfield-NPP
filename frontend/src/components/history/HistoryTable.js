// Libraries
import React from "react";
// Style
import "./style/TableHistory.css";
//  Icons
// import { FiEdit } from "react-icons/fi";
// import { AiOutlineDelete } from "react-icons/ai";

function HistoryTable({ userID, subID, incomeName, category, amount, deleteItem, type}) {

//const date = user.date.toString().substr(0, 10);

  return (
  <tr>
      <td>{amount}</td>
      <td>{incomeName}</td>
      <td>{category}</td>
      <td>data</td>
      <td>{subID}</td>
      <td><button
        type="button"
        onClick={() => deleteItem(userID, subID, type)}
      >
        delete
      </button></td>
      
  </tr>
  );
}

export default HistoryTable;
