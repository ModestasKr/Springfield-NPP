import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getUsersByEmail, updateUserById } from "../../../api/libraries/apiLibraries";
import { useGlobalUserContext, UserContext } from "../../../util/UserContext";



const EditUser = ({
    handleCancelClick,
    handleEditClick,
    username,
    email,
    userID,
    setEditContactId,
    users,
    getUsers,
    
}) => {
  const {userData, updateUserData } = useGlobalUserContext(UserContext);

  const [userUpdate, setUserUpdate] = useState({
    username: username,
    email: email,
  });
  

  function updateUser(e) {
    e.preventDefault();
    setUserUpdate({
      username: e.username,
      email: e.email,
    });
    userUpdate[e.target.name] = e.target.value;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      username: "",
      email: "",
    },
  });

  function onSubmit(data) {
    data.id = userID
    updateUserById(data).then(() => {
    });
    setEditContactId(null);
    getUsers();getUsers();
     
    
  }

  return (
    <tr>
      <td>{userID}</td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="editUser-input"
            placeholder="username"
            type="username"
            name="username"
            defaultValue={username}
            {...register("username", {
              required: true,
              minLength: 1,
              maxLength: 25,
            })}
            onChange={(e) => updateUser(e)}
          />
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            className="editUser-input"
            placeholder="email"
            id="email"
            defaultValue={email}
            {...register("email", {
              maxLength: 40,
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            onChange={(e) => updateUser(e)}
          />
          {errors.email && (
            <div className="error">
              klaidingai įvestas el. paštas
            </div>
          )}
        </form>
      </td>
      
      <td className="EditExpenses-button">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">Pakeisti</button>
          <button type="submit" onClick={handleCancelClick}>
            Atšaukti
          </button>
        </form>
      </td>
    </tr>
  );
};

export default EditUser;