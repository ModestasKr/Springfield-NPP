// Libraries
import React from "react";
// Components
import IncomePieChart from "../../components/pieIncomeChart/IncomePieChart";
import ExpensePieChart from "../../components/pieExpenseChart/ExpensePieChart";
import Form from "../../components/application/Form";
// Style
import "./style/Application.css";

function Application() {
  return (
    <div>
      <div className="Application-container">
        <IncomePieChart />
        <Form />
        <ExpensePieChart />
      </div>
    </div>
  );
}

export default Application;
