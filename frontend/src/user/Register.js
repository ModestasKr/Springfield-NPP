// Libraries
import React from "react";
import { useForm } from "react-hook-form";
// Api Libraries
import { createUser } from "../api/libraries/apiLibraries";
// Style
import "./style/Register.css";
// Images
import img from "../assets/register.jpg";

function Registration() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      accounting: "",
      name: "",
      category: "",
      amount: "",
      date: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    createUser(data);
  }

  let password = watch("password");

  return (
    <div className="Main-container">
      <div>
        <img src={img} alt="springfield" />
      </div>
      <form className="Main-form" onSubmit={handleSubmit(onSubmit)}>
        <label>Vardas</label>
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
            pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9_ .+-]*$/i,
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
          })}
        />
        <span className="error">{errors.email?.message}</span>
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
            validate: { passwordMatch: (value) => value === password },
          })}
        />
        <span className="error">{errors.repeatPassword?.message}</span>

        <button className="Main-form-btn" type="submit">
          Registracija
        </button>
        <button className="Main-form-btn" type="reset">
          Anuliuoti
        </button>
      </form>
    </div>
  );
}

export default Registration;
