// Libraries
import React from "react";

// Components
import IncomePieChart from "./Application/IncomePieChart";
import ExpensePieChart from "./Application/ExpensePieChart";
import Form from "./Application/Form";
// Style
import "./Application/style/Application.css";

function Application() {
  return (
    <div className="Application-container">
      <IncomePieChart />
      <Form />
      <ExpensePieChart />
    </div>
  );
}

export default Application;
