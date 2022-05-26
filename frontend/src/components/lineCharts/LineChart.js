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
    if (userData.income.length > 0){
    getAllUserIncomeByMonth(userData._id).then((res) => {
      setUserIncome(res.data.data.income);
      console.log(res.data.data.income)
    });
  }
    if (userData.expenses.length > 0){
    getAllUserExpensesByMonth(userData._id).then((res) => {
      setUserExpenses(res.data.data.expenses);
    });
  }
  }

  useEffect(() => {
    if (userData !== undefined && userData.hasOwnProperty("email")) {
      getAllIncomes();
    }
  }, [userData]);

  const arr = [];

  for (let i = 0; i < userIncome.length; i++) {
    arr.push({ ...userIncome[i], ...userExpenses[i] });
  }

  const year = arr.reverse().map((year) => {
    const yr = year.yearInc;
    const key = year._id;
    return (
      <div>
        <p className="Linechart-p">{yr}</p>
        <Line
          key={year._id}
          id={year._id}
          data={{
            labels: [
              "Sausis",
              "Vasaris",
              "Kovas",
              "Balandis",
              "Gegužė ",
              "Birželis",
              "Liepa",
              "Rugpjūtis",
              "Rugsėjis",
              "Spalis",
              "Lapkritis",
              "Gruodis",
            ],
            datasets: [
              {
                id: 1,
                label: "Išlaidos",
                data: year.dataExp,
                borderColor: "rgb(255,127,127)",
                backgroundColor: "rgba(255,127,127)",
              },
              {
                id: 2,
                label: "Pajamos",
                data: year.dataInc,
                borderColor: "rgb(127,191,127)",
                backgroundColor: "rgba(127,191,127)",
              },
            ],
          }}
        />
      </div>
    );
  });
  return <>{year} </>;
}
export default Linechart;
