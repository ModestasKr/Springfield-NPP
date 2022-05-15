import React from "react";
import "./style/Button.css";

const ReadOnlyRow = ({
  subID,
  category,
  amount,
  deleteItem,
  type,
  date,
  name,
  userID,
  handleEditClick,
}) => {
  // Date without Time zones
  const dateWithoutZeros = date.toString().substr(0, 10);
  // We direct color
  let colorClass = (str) => {
    if (str === "income") {
      return "table-income";
    } else {
      return "table-expense";
    }
  };
  return (
    <tr className="ReadOnlyRow-row">
      <td className={colorClass(type)}>{amount}</td>
      <td>{category}</td>
      <td>{name}</td>
      <td>{dateWithoutZeros}</td>
      <td className="ReadOnlyRow-button">
        <button
          type="button"
          onClick={(event) => handleEditClick(event, subID, type)}
        >
          Keisti
        </button>
        <button type="button" onClick={() => deleteItem(userID, subID, type)}>
          Ištrinti
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
