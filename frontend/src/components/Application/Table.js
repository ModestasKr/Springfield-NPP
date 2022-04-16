// Libraries
import React from "react";
// Style
import "./style/Table.css";
// Icons
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

function Table() {
  return (
    <div className="Table-container">
      <table className="Table-body">
        <tbody className="Table-tbody">
          <tr className="Table-row">
            <td>+/-</td>
            <td>$/£ 1000</td>
            {/* Salary, Invesment, Food etc... */}
            <td>Category</td>
            <td>2021-01-01</td>

            <td className="Table-btn">
              <button type="button">
                <FiEdit />
              </button>
              <button type="button">
                <AiOutlineDelete />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
