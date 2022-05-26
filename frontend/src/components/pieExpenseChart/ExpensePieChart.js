// Libraries
import React, { useState, useEffect } from "react";
// Style
import "./style/ExpensePieChart.css";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getUserExpensesByMonth } from "../../api/libraries/apiLibraries";
// Chart
import { Pie } from "react-chartjs-2";
// Context
import { useGlobalUserContext, UserContext } from "../../util/UserContext";

ChartJS.register(CategoryScale, ArcElement, LinearScale, Tooltip, Legend);

function ExpensePieChart() {
  const { userData } = useGlobalUserContext(UserContext);
  const [UserExpensesByMonth, setUserExpensesByMonth] = useState();
  const [chart, setChart] = useState([]);

  function getCurrentExpensesMonth() {
    getUserExpensesByMonth(userData._id).then((res) => {
      setUserExpensesByMonth(res.data.data.expenses);
    });
  }
  useEffect(() => {
    if (userData !== undefined && userData.hasOwnProperty("email")) {
      getCurrentExpensesMonth();
      getCurrentExpensesCategoryMonth();
    }
  }, [userData]);

  //currentExpenseC.category nereikia
  function getCurrentExpensesCategoryMonth() {
    getUserExpensesByMonth(userData._id).then((res) => {
      setChart(res.data.data.duomenys);
    });
  }

  var a = null;
  if(UserExpensesByMonth !== undefined) {
    a = UserExpensesByMonth.toFixed(2)
  }

  var data = {
    labels: chart[1],
    datasets: [
      {
        label:chart[1],
        data: chart[0],
        backgroundColor: [
          "rgba(230, 25, 75, 0.2)",
          "rgba(245, 130, 48, 0.2)",
          "rgba(255, 225, 25, 0.2)",
          "rgba(210, 245, 60, 0.2)",
          "rgba(60, 180, 75, 0.2)",
          "rgba(70, 240, 240, 0.2)",
          "rgba(0, 130, 200, 0.2)",
          "rgba(145, 30, 180, 0.2)",
          "rgba(240, 50, 230, 0.2)",
          "rgba(128, 0, 0, 0.2)",
        ],
        borderColor: [
          "rgba(230, 25, 75, 1)",
          "rgba(245, 130, 48, 1)",
          "rgba(255, 225, 25, 1)",
          "rgba(210, 245, 60, 1)",
          "rgba(60, 180, 75, 1)",
          "rgba(70, 240, 240, 1)",
          "rgba(0, 130, 200, 1)",
          "rgba(145, 30, 180, 1)",
          "rgba(240, 50, 230, 1)",
          "rgba(128, 0, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  var options = {
    maintainAspectRatio: false,

    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div className="IncomePieChart-container">
      {/* Text color is green */}
      <h3>Išlaidos</h3>
      <p>{a} EUR</p>
      <div className="ExpensePieChart-chart">
        <Pie data={data} height={400} options={options} />
      </div>
    </div>
  );
}

export default ExpensePieChart;
