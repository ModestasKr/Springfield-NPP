import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UsersTable from "./table/UsersTable";
import swal from "sweetalert";
import { getUsersByEmail } from "../../../../api/libraries/apiLibraries";

function UserSearch() {
  const [users, setUsers] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function searchUsers(data) {
    console.log(data);
    getUsersByEmail(data).then((res) => {
      console.log(res);
      if (res.data.data.users.length < 1) {
        swal({
          text: "Tokio vartotoja nerasta",
          icon: "error",
          button: "Gerai",
          timer: 2000,
        });
      }
      console.log(res.data.data.users);
      setUsers(res.data.data.users);
      reset();
    });
  }
  let usersData;
  if (users.length > 0) {
    usersData = users.map((user) => {
      return (
        <UsersTable
          username={user.username}
          email={user.email}
          id={user._id}
          key={user._id}
          searchUsers={searchUsers}
          setUsers={setUsers}
          reset={reset}
        />
      );
    });
  }
  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit(searchUsers)}>
          <input
            type="text"
            placeholder="Vartotojo el.pastas"
            {...register("email", { minLength: 1 })}
          />
          <div className="">
            <button className="" type="submit">
              Ieskoti
            </button>
          </div>
        </form>
      </div>
      <div className="">{usersData}</div>
    </div>
  );
}

export default UserSearch;
