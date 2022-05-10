// Libraries
import React, { useState , useEffect } from "react";
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

ChartJS.register(CategoryScale, ArcElement, LinearScale, Tooltip, Legend);

function IncomePieChart() {
  const [UserExpensesByMonth, setUserExpensesByMonth] = useState()
  const [chart, setChart] = useState([])

  function getCurrentExpensesMonth(){
    getUserExpensesByMonth().then((res) =>{
      setUserExpensesByMonth(res.data.data.expenses)
    })
  }
  getCurrentExpensesMonth()

  function getCurrentExpensesCategoryMonth(){
    getUserExpensesByMonth().then((res) =>{
      getUserExpensesByMonth(res.data.data.currentExpensesC.category)
      console.log(res.data.data.currentExpensesC)
      setChart(res.data.data.currentExpensesC)
    })
  }

  useEffect(() => {
    getCurrentExpensesCategoryMonth();
  }, []);
  
console.log("chart", chart)

  var data = {
    labels: chart?.map(item => item.category),
    datasets: [
      {
        label: `${chart?.length}`,
        data: chart?.map(item => item.amount),
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
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
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

export default IncomePieChart;
