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
      <div className="line-chart">
        <Linechart />
      </div>
    </div>
  );
}

export default lineCharts;
