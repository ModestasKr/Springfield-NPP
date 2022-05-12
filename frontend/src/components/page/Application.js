// Libraries
import React from "react";

// Components
import IncomePieChart from "../pieIncome/IncomePieChart";
import ExpensePieChart from "../pieExpense/ExpensePieChart";
import Linechart from "../LineChart/Linechart"
import LineChart2 from "../LineChart/LineChart2"
import Form from "../Application/Form";
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
    <p>2022</p>
    <div className="line-chart"><LineChart2 /></div>
    <p>2021</p>
    <div className="line-chart"><Linechart /></div>
  </div>
  );
}

export default Application;
