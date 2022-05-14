// Libraries
import React from "react";
// Components
import Linechart from "../../components/lineCharts/LineChart";
import LineChart2 from "../../components/lineCharts/LineChart2";
// Style
import "./style/LineCharts.css";

function lineCharts() {
  return (
    <div>
      <p>2022</p>
      <div className="line-chart">
        <LineChart2 />
      </div>
      <p>2021</p>
      <div className="line-chart">
        <Linechart />
      </div>
    </div>
  );
}

export default lineCharts;
