import React from "react";

const LogCard = ({email,action,amount,date}) => {
  // Date without Time zones
  const dateWithoutZeros = date.toString().substr(0, 10);

  return (
    <tr className="ReadOnlyRow-row">
      <td>{email}</td>
      <td>{action}</td>
      <td>{amount}</td>
      <td>{dateWithoutZeros}</td>

    </tr>
  );
};

export default LogCard;