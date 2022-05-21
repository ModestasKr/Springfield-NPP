import React, { useState } from "react";
import Users from "./Dashboard/User";

function Dashboard() {
  const [display, setDisplay] = useState("users");
  return (
    <>
      <div>
        <button onClick={() => setDisplay("logs")}>Žurnalas</button>
        <button onClick={() => setDisplay("category")}>Kategorijos</button>
        <button onClick={() => setDisplay("users")}>Vartotojas</button>
      </div>
      {display === "users" && <Users />}
    </>
  );
}

export default Dashboard;
