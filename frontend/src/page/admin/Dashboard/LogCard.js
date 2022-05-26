import React from "react";

const LogCard = ({email,action,amount,date_created}) => {
  
  

  return (
    <tr className="ReadOnlyRow-row">
      <td>{email}</td>
      <td>{action}</td>
      <td>{amount}</td>
      <td>{date_created}</td>

    </tr>
  );
};

export default LogCard;