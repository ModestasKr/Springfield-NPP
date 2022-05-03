import React from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../api/libraries/apiLibraries";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    createUser(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Vardas"
            {...register("username", {
              required: "Vardas butinas",
              maxLength: 12,
              minLength: 2,
              pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9_ .+-]*$/i,
            })}
          />
        </div>
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
        <div>
          <input
            type="password"
            placeholder="Pakartokite slaptažodį"
            {...register("repeatPassword", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
          />
        </div>
        <p>
          <button type="submit">Register</button>
        </p>
      </form>
    </div>
  );
}

export default Registration;
