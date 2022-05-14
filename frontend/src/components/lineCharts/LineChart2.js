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
import { useGlobalUserContext, UserContext } from "../../context/UserContext";
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

function LineChart2() {
  const { userData } = useGlobalUserContext(UserContext);
  const [userIncome, setUserIncome] = useState([]);
  const [userExpenses, setUserExpenses] = useState([]);

  function getAllIncomes() {
    getAllUserIncomeByMonth(userData._id).then((res) => {
      setUserIncome(res.data.data.income[0].dataInc);
    });
    getAllUserExpensesByMonth(userData._id).then((res) => {
      setUserExpenses(res.data.data.expenses[0].dataExp);
    });
  }

  useEffect(() => {
    if (userData !== undefined && userData.hasOwnProperty("email")) {
      getAllIncomes();
    }
  }, [userData]);

  return (
    <div>
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
              label: "Islaidos",
              data: userExpenses,
              borderColor: "rgb(255,0, 0)",
              backgroundColor: "rgba(53, 162, 235, 0)",
            },
            {
              id: 2,
              label: "Pajamos",
              data: userIncome,
              borderColor: "rgb(100, 255, 0)",
              backgroundColor: "rgba(53, 162, 235, 0)",
            },
          ],
        }}
      />
    </div>
  );
}
export default LineChart2;
