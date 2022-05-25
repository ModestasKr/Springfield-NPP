import React, { useState } from "react";
import RegisterUser from "./Dashboard/RegisterUser";
import Logs from "./Dashboard/Logs";
import Users from "./Dashboard/Users";
import "./style/Dashboard.css";
import Category from "./Dashboard/category/Category";

function Dashboard() {
  const [display, setDisplay] = useState("users");
  return (
    <div className="Dashboard-container">
      <div className="Dashboard-body">
        <button onClick={() => setDisplay("users")}>Vartotojai</button>
        <button onClick={() => setDisplay("registerUser")}>Vartotojas</button>
        <button onClick={() => setDisplay("category")}>Kategorijos</button>
        <button onClick={() => setDisplay("logs")}>Žurnalas</button>
      </div>

      {display == "users" && <Users />}
      {display == "logs" && <Logs />}
      {display == "category" && <Category />}
      {display == "registerUser" && <RegisterUser />}
    </div>
  );
}

export default Dashboard;
