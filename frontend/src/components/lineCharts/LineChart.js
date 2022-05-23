// Libraries
import React, { useState, useEffect } from "react";
// Style
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Chart
import { Line } from "react-chartjs-2";
//Context
import { useGlobalUserContext, UserContext } from "../../util/UserContext";
// API
import { getAllUserIncomeByMonth } from "../../api/libraries/apiLibraries";
import { getAllUserExpensesByMonth } from "../../api/libraries/apiLibraries";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Linechart({ id }) {
  const { userData } = useGlobalUserContext(UserContext);
  const [userIncome, setUserIncome] = useState([]);
  const [userExpenses, setUserExpenses] = useState([]);

  function getAllIncomes() {
    getAllUserIncomeByMonth(userData._id).then((res) => {
      setUserIncome(res.data.data.income);
    });
    getAllUserExpensesByMonth(userData._id).then((res) => {
      setUserExpenses(res.data.data.expenses);
    });
  }

  useEffect(() => {
    if (userData !== undefined && userData.hasOwnProperty("email")) {
      getAllIncomes();
    }
  }, [userData]);

  const dataAll = [...userIncome, ...userExpenses];

  const arr = [];

  for (let i = 0; i < userIncome.length; i++) {
    arr.push({ ...userIncome[i], ...userExpenses[i] });
  }

  const year = arr.reverse().map((year) => {
    const yr = year.yearInc;
    return (
      <div>
        <p>{year.yearInc}</p>
        <Line
          datasetIdKey="id"
          data={{
            labels: [
              "Sausis",
              "Vasaris",
              "Kovas",
              "Balandis",
              "Geguze",
              "Birzelis",
              "Liepa",
              "Rugpjutis",
              "Rugsejis",
              "Spalis",
              "Lapkritis",
              "Gruodis",
            ],
            datasets: [
              {
                id: 1,
                label: "Išlaidos",
                data: year.dataExp,
                borderColor: "rgb(255,0, 0)",
                backgroundColor: "rgba(53, 162, 235, 0)",
              },
              {
                id: 2,
                label: "Pajamos",
                data: year.dataInc,
                borderColor: "rgb(100, 255, 0)",
                backgroundColor: "rgba(53, 162, 235, 0)",
              },
            ],
          }}
        />
      </div>
    );
  });
  return <>{year}</>;
}
export default Linechart;
