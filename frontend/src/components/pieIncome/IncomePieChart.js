// Libraries
import React, { useState , useEffect } from "react";
// Style
import "./style/IncomePieChart.css";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getUserIncomeByMonth } from "../../api/libraries/apiLibraries";
// Chart
import { Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, ArcElement, LinearScale, Tooltip, Legend);

function IncomePieChart() {
  const [UserIncomeByMonth, setUserIncomeByMonth] = useState()
  const [chart, setChart] = useState([])

  function getCurrentIncomeMonth(){
    getUserIncomeByMonth().then((res) =>{
      setUserIncomeByMonth(res.data.data.income)
    })
  }
  getCurrentIncomeMonth()

  function getCurrentIncomeCategoryMonth(){
    getUserIncomeByMonth().then((res) =>{
      getUserIncomeByMonth(res.data.data.currentIncomeC.category)
      setChart(res.data.data.duomenys)
    })
  }

  useEffect(() => {
    getCurrentIncomeCategoryMonth();
  }, []);

  var names = chart?.map(item => {
    if(item.amount !== 0){
      return item.name
    }
  });

  var labels = [];

  for(let i=0;i<chart.length;i++){
    names.forEach((item) => {
      if(item !== undefined){
        labels.indexOf(item) === -1 ? labels.push(item) : console.log("This item already exists");
        return;
      }
    })
  }

  var sums = chart?.map(item => {
    if(item.amount !== 0){
      return item.amount
    }
  });

  var categorySum = [];

  for(let i=0;i<sums.length;i++){
    sums.forEach((item) => {
      if(item > 0){
        categorySum.indexOf(item) === -1 ? categorySum.push(item) : console.log("This item already exists");
        return;
      }
    })
  }

console.log(categorySum)

  var data = {
    labels: labels,
    datasets: [
      {
        label: `${chart?.length}`,
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
      <h3>Pajamos</h3>
      <p>{UserIncomeByMonth} EUR</p>
      <div className="IncomePieChart-chart">
        <Pie data={data} height={400} options={options} />
      </div>
    </div>
  );
}

export default IncomePieChart;
