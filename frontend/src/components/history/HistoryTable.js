// Libraries
import React from "react";
// Style
import "./style/TableHistory.css";
//  Icons
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

function HistoryTable({ user }) {
  const date = user.date.toString().substr(0, 10);
  return (
    <>
      <tr className="Table-row">
        <td>-/+</td>
        <td>{user.amount}</td>
        <td>{user.category}</td>
        <td>{date}</td>
        <td>
          <button type="button">
            <FiEdit />
          </button>
          <button type="button">
            <AiOutlineDelete />
          </button>
        </td>
      </tr>
    </>
  );
}

export default HistoryTable;
