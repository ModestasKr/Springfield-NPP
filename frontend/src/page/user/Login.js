// Libraries
import React from "react";
import { useForm } from "react-hook-form";
// API components
import { loginUser } from "../../api/libraries/apiLibraries";
// Style
import "./style/Login.css";
// Images
import img from "../../assets/register.jpg";
// Context
import { useGlobalUserContext, UserContext } from "../../context/UserContext";

function Login() {
  const { doLogin } = useGlobalUserContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    loginUser(data);
    doLogin(data);
  }
  return (
    <div className="Login-container">
      <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img src={img} alt="springfield" />
        </div>
        <label>Elektroninis paštas</label>
        <input
          type="email"
          id="email"
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
        <button className="Login-form-btn" type="submit">
          Prisijungti
        </button>
        <button className="Login-form-btn" type="reset">
          Anuliuoti
        </button>
      </form>
    </div>
  );
}

export default Login;
