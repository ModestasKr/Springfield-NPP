import React from "react";

const ReadOnlyUser = ({ userID, email, username }) => {
  // Date without Time zones

  // We direct color

  return (
    <tr className="ReadOnlyRow-row">
      <td>{userID}</td>
      <td>{username}</td>
      <td>{email}</td>
    </tr>
  );
};

export default ReadOnlyUser;
