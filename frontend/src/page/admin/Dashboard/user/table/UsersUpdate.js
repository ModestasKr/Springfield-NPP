import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import { updateUserById } from "../../../../../api/libraries/apiLibraries";

function UsersUpdate({ id, setIsEditing, isEditing, searchUsers }) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    data.id = id;
    updateUserById(data)
      .then((res) => {
        swal({
          text: "Vartotojas redaguotas",
          icon: "success",
          button: "Gerai",
          timer: 2000,
        });
        console.log(res.data.status);
        searchUsers({ email: data.email });
      })
      .catch((err) => {
        swal({
          text: "Toks el.paštas jau registruotas",
          icon: "error",
          button: "Gerai",
          timer: 5000,
        });
      });

    reset();
    setIsEditing(false);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Vardas"
            {...register("username", {})}
          />

          <input
            type="email"
            placeholder="El. paštas"
            {...register("email", {})}
          />

          <div>
            <button type="submit">Atnaujinti</button>

            <button
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
            >
              Atšaukti
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default UsersUpdate;
