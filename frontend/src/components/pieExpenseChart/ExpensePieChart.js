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

  var names = chart?.map((item) => {
    if (item.amount !== 0) {
      return item.name;
    }
  });

  var labels = [];

  for (let i = 0; i < chart.length; i++) {
    if(names[i] !== undefined){
      labels.push(names[i])
    }
  }

  var sums = chart?.map((item) => {
    if (item.amount > 0) {
      return item.amount;
    }
  });

  var categorySum = [];

  for (let i = 0; i < sums.length; i++) {
    if(sums[i] !== undefined){
      categorySum.push(sums[i])
    }
  }


  var data = {
    labels: labels,
    datasets: [
      {
        label:labels,
        data: categorySum,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
      <p>{UserExpensesByMonth} EUR</p>
      <div className="ExpensePieChart-chart">
        <Pie data={data} height={400} options={options} />
      </div>
    </div>
  );
}

export default ExpensePieChart;
