import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { createUser, getUserEmail } from "../../../api/libraries/apiLibraries";
import "./style/RegisterUser.css";

export default function RegisterUser() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState({});

  useEffect(() => {}, [users]);

  let password = watch("password");

  function onSubmit(data) {
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
    <div className="RegisterUser-container">
      <div className="RegisterUser-body">
        <form className="RegisterUser-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Vartotojo vardas"
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
                value: /^[A-Za-z0-9_-]*$/i,
                message: "Negali būti specialų simbolių",
              },
            })}
          />
          <span className="error">{errors.username?.message}</span>

          <input
            type="email"
            placeholder="Elektroninis paštas"
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
                message: "Turi būti bent 1 didžioji raidė",
              },
            })}
          />
          <span className="error">{errors.password?.message}</span>
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
              validate: { passwordMatch: (value) => value === password },
            })}
          />
          <span className="error">{errors.repeatPassword?.message}</span>
          <span className="error">
            {errors.repeatPassword?.type === "passwordMatch" &&
              "Slaptažodziai turi sutapti"}
          </span>
          <button className="RegisterUser-form-btn" type="submit">
            Registracija
          </button>
          <button className="RegisterUser-form-btn" type="reset">
            Anuliuoti
          </button>
        </form>
      </div>
    </div>
  );
}
