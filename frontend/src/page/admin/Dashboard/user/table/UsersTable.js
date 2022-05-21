import React, { useState } from "react";
import UsersUpdate from "./UsersUpdate";
import { deleteUserById } from "../../../../../api/libraries/apiLibraries";
import swal from "sweetalert";
function UsersTable({ username, email, id, reset, setUsers, searchUsers }) {
  function deleteUser() {
    swal({
      title: "Ar tikrai norite ištrinti šį vartotoją?",
      icon: "warning",
      buttons: ["Atšaukti", "Gerai"],
    }).then((isConfirm) => {
      if (isConfirm) {
        console.log(isConfirm);
        deleteUserById(id);
        reset();
        setUsers({});
      }
      swal({
        text: "Ištrinta!",
        icon: "success",
        button: "Gerai",
        timer: 1500,
      });
    });
  }
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <>
        <div>
          <div> {username}</div>
          <div>{email}</div>
          <div>
            <button onClick={() => setIsEditing(!isEditing)}>Redaguoti</button>
          </div>
          <div>
            <button onClick={() => deleteUser()}>Istrinti</button>
          </div>
        </div>
      </>

      {isEditing === true && (
        <UsersUpdate
          username={username}
          email={email}
          id={id}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          searchUsers={searchUsers}
        />
      )}
    </>
  );
}

export default UsersTable;
