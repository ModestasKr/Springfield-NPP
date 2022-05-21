import React, { useState } from "react";
import RegisterUser from "./Dashboard/RegisterUser";
import Logs from "./Dashboard/Logs";
import Users from "./Dashboard/Users";

function Dashboard() {
  const [display, setDisplay] = useState("users");
  return (
    <>
      <div>
<<<<<<< HEAD
=======
         <button onClick={() => setDisplay("users")}>Vartotojai</button>
        <button onClick={() => setDisplay("registerUser")}>
          Vartotojo priregistravimas
        </button>
        <button onClick={() => setDisplay("category")}>Kategorijos</button>
        
>>>>>>> e091a2810803a5accc45b4392fef88403d9c3d2f
        <button onClick={() => setDisplay("logs")}>Žurnalas</button>
        <button onClick={() => setDisplay("category")}>Kategorijos</button>
        <button onClick={() => setDisplay("users")}>Vartotojas</button>
      </div>
<<<<<<< HEAD
      {display === "users" && <Users />}
=======
      {display == "users" && <Users />}
      {display == "logs" && <Logs />}
      {display == "registerUser" && <RegisterUser />}
>>>>>>> e091a2810803a5accc45b4392fef88403d9c3d2f
    </>
  );
}

export default Dashboard;
