import React from "react";

const LogCard = ({email,action,amount,date}) => {
  // Date without Time zones

  return (
    <tr className="ReadOnlyRow-row">
      <td>{email}</td>
      <td>{action}</td>
      <td>{amount}</td>
      <td>{date}</td>

    </tr>
  );
};

export default LogCard;