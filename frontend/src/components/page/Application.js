// Libraries
import React from "react";

// Components
import IncomePieChart from "../pieIncome/IncomePieChart";
import ExpensePieChart from "../pieExpense/ExpensePieChart";
import Form from "../Application/Form";
// Style
import "./style/Application.css";

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
