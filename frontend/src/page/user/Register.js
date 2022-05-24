// Libraries
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// Api Libraries
import { createUser, getUserEmail, addLog } from "../../api/libraries/apiLibraries";
// Style
import "./style/Register.css";
// Images
import img from "../../assets/register.jpg";

function Registration() {
  const navigate = useNavigate();

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

  // POST data using parameter data
  function onSubmit(data) {
    createUser(data);
    addLog({
      email: data.email,
      action: 'Registracija'
    })
    navigate("/login");
  }

  let password = watch("password");

  return (
    <div className="Registration-container">
      <div className="Registration-body">
        <div className="Registration-images">
          <img className="Registration-image-img" src={img} alt="springfield" />
        </div>
        <form className="Registration-form" onSubmit={handleSubmit(onSubmit)}>
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
              validate: { passwordMatch: (value) => value === password },
            })}
          />
          <span className="error">{errors.repeatPassword?.message}</span>
          <span className="error">
            {errors.repeatPassword?.type === "passwordMatch" &&
              "Slaptažodziai turi sutapti"}
          </span>

          <button className="Registration-form-btn" type="submit">
            Registracija
          </button>
          <button className="Registration-form-btn" type="reset">
            Anuliuoti
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
