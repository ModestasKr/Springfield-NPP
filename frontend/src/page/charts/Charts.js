// Libraries
import React from "react";
// Components
import Linechart from "../../components/lineCharts/LineChart";

// Style
import "./style/LineCharts.css";

function lineCharts() {
  return (
    <div className="lineCharts-container">
      <div className="line-chart">
        <Linechart />
      </div>
    </div>
  );
}

export default lineCharts;
