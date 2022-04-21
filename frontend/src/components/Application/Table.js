// Libraries
import React from "react";
// Style
import "./style/Table.css";
// Icons
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

// editUserFn
function Table({ id, user, deleteUserFn }) {
  return (
    <tr className="Table-row">
      <td>-/+</td>
      <td>{user.username}</td>
      {/* Salary, Invesment, Food etc... */}
      <td>{user.income.incomeName}</td>
      <td>{user.income.date}</td>

      <td className="Table-btn">
        <button
          type="button"
          // onClick={() => {
          //   editUserFn(user);
          // }}
        >
          <FiEdit />
        </button>
        <button type="button" onClick={() => deleteUserFn(id)}>
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
}

export default Table;
