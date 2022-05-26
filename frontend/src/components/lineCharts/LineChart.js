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

  const dataAll = [...userIncome, ...userExpenses];
  const arr = [];

  if(userIncome.length > userExpenses.length || userIncome.length == userExpenses.length) {
    for (let i = 0; i < userIncome.length; i++) {
      arr.push({ ...userIncome[i], ...userExpenses[i]});
    } 
  } else if (userIncome.length > 0 && userExpenses.length == 0) {
      for (let i = 0; i < userIncome.length; i++) {
        arr.push({ ...userIncome[i]});
      }
  } else if(userIncome.length == 0 && userExpenses.length > 0){
    for(let i = 0;i < userExpenses.length;i++){
      var arrInc = 
      {
        yearInc: userExpenses[i].yearExp,
        dataInc: ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
      }
      arr.push({...userIncome[i], ...userExpenses[i]})
    }
  }
  else {
      for (let i = 0; i < userExpenses.length; i++) { 
        if(userIncome[i] == undefined) {
          var array1Inc = 
            {yearInc: userExpenses[i].yearExp,
            dataInc: userIncome[i-1].dataInc}
          var array1Exp = 
            {
              yearExp: userExpenses[i].yearExp,
              dataExp: userExpenses[1].dataExp
            }
          arr.push({ ...array1Exp, ...array1Inc});
          
        } else {
          var array2Inc = 
            {yearInc: userExpenses[i].yearExp,
            dataInc: ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00']}

          arr.push({...array2Inc, ...userExpenses[i]})
          console.log(userIncome[i])
          console.log(userExpenses[i].dataExp)
        }
        console.log(arr)
      }
  }

  const year = arr.reverse().map((year) => {
    const yr = year.yearInc;
    
    const key = year._id;
    return (
      <div>
        <p className="Linechart-p"> {yr}</p>
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
