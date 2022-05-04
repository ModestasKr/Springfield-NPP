import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/libraries/apiLibraries";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    loginUser(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            id="email"
            placeholder="El. paštas"
            {...register("email", {
              required: true,
              maxLength: 50,
            })}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Slaptažodis"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
          />
        </div>
        <p>
          <button type="submit">Prisijungti</button>
        </p>
      </form>
    </div>
  );
}

export default Login;
