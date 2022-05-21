import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UserSerach from "./user/UserSearch";
import { createUser, getUserEmail } from "../../../api/libraries/apiLibraries";

export default function Users() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState({});

  useEffect(() => {}, [users]);

  function onSubmit(data) {
    console.log(data);
    createUser(data)
      .then((result) => {
        console.log("Success:", result);
        swal({
          text: "Vartotojas pridėtas",
          icon: "success",
          button: "Puiku",
          timer: 2000,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        swal({
          text: "Toks vartotojas jau egzistuoja",
          icon: "error",
          button: "Gerai",
          timer: 5000,
        });
      });
  }

  return (
    <div className="container">
      <div className="body">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label>Vartotojo vardas</label>
          <input
            type="text"
            placeholder="Vardas"
            {...register("username", {
              required: "Laukelis privalomas",
              maxLength: {
                value: 12,
                message: "Daugiausia simbolių galima įvesti 12",
              },
              minLength: {
                value: 2,
                message: "Mažiausia simbolių galima įvesti 2",
              },
              pattern: {
                value: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9_ .+-]*$/i,
                message: "Negali būti specialų simbolių",
              },
            })}
          />
          <span className="error">{errors.username?.message}</span>
          <label>Elektroninis paštas</label>
          <input
            type="email"
            placeholder="El. paštas"
            {...register("email", {
              required: "Laukelis privalomas",
              maxLength: {
                value: 50,
                message: "Daugiausia simbolių galima įvesti 50",
              },
              validate: {
                checkEmail: async (value) => {
                  let pass = await getUserEmail(value);
                  console.log(pass, !pass);
                  return !pass;
                },
              },
            })}
          />
          <span className="error">{errors.email?.message}</span>
          <span className="error">
            {errors.email?.type === "checkEmail" &&
              "El. paštas jau naudojamas."}
          </span>
          <label>Slaptažodis</label>
          <input
            type="password"
            name="password"
            placeholder="Slaptažodis"
            {...register("password", {
              required: "Laukelis privalomas",
              minLength: {
                value: 8,
                message: "Mažiausia simbolių galima įvesti 8",
              },
              maxLength: {
                value: 20,
                message: "Daugiausia simbolių galima įvesti 20",
              },
              pattern: {
                value: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9?!@#$%^&*]/,
                message: "Turi būti bent 1 didžioji raidė ir bent 1 simbolis",
              },
            })}
          />
          <span className="error">{errors.password?.message}</span>
          <label>Pakartotinas slaptažodis</label>
          <input
            type="password"
            placeholder="Pakartokite slaptažodį"
            {...register("repeatPassword", {
              required: "Laukelis privalomas",
              minLength: {
                value: 8,
                message: "Mažiausia simbolių galima įvesti 8",
              },
              maxLength: {
                value: 20,
                message: "Daugiausia simbolių galima įvesti 20",
              },
            })}
          />
          <span className="error">{errors.repeatPassword?.message}</span>

          <button className="-form-btn" type="submit">
            Registracija
          </button>
          <button className="-form-btn" type="reset">
            Anuliuoti
          </button>
        </form>
      </div>
      <div>
        <UserSerach />
      </div>
    </div>
  );
}
