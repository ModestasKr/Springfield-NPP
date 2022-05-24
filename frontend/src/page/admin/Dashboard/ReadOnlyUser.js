import React from "react";


const ReadOnlyUser = ({
  deleteUser,
  userID,
  email,
  username,
  handleEditClick,
}) => {

  // Date without Time zones

  // We direct color

  return (
    <tr className="ReadOnlyRow-row">
      <td>{userID}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td className="ReadOnlyRow-button">
        <button
          type="button"
          onClick={(event) => handleEditClick(event, userID)}
        >
          Keisti
        </button>
        <button type="button" onClick={() => deleteUser(userID)}>
          Ištrinti
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyUser;
