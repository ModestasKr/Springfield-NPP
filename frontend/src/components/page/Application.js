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
    <div className="line-chart"><LineChart2 />2022</div>
    <div className="line-chart"><Linechart />2021</div>
  </div>
  );
}

export default Application;
