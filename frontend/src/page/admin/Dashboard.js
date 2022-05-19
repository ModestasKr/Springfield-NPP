import React, { useState } from "react";
import RegisterUser from "./Dashboard/RegisterUser";
import Logs from "./Dashboard/Logs";
import Users from "./Dashboard/Users";

function Dashboard() {
  const [display, setDisplay] = useState("users");
  return (
    <>
      <div>
         <button onClick={() => setDisplay("users")}>Vartotojai</button>
        <button onClick={() => setDisplay("registerUser")}>
          Vartotojo priregistravimas
        </button>
        <button onClick={() => setDisplay("category")}>Kategorijos</button>
        
        <button onClick={() => setDisplay("logs")}>Žurnalas</button>
      </div>
      {display == "users" && <Users />}
      {display == "logs" && <Logs />}
      {display == "registerUser" && <RegisterUser />}
    </>
  );
}

export default Dashboard;
