// Libraries
import React, { useState, useEffect } from "react";
// Components API
import { getAllUsersData } from "../../api/libraries/apiLibraries";
// Components
import HistoryTable from "./HistoryTable.js";
// Style
import "./style/History.css";

function History() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   GET method one user data
  useEffect(() => {
    getAllUsersData().then((res) => {
      setUsers(res.data.data.users[0]);
      console.log(res.data.data.users[0]);
      setIsLoading(true);
    });
  }, []);

  if (isLoading) {
    let { income } = users;
    let { expenses } = users;

    let incomeExpenses = [...income, ...expenses];

    function sortByDate(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    }

    const incomeExpensesSortedByDate = incomeExpenses.sort(sortByDate);

    var userIncomeExpenses = incomeExpensesSortedByDate.map((user) => {
      return <HistoryTable key={user._id} id={user._id} user={user} />;
    });
  }

  return (
    <>
      <div className="History-container">
        <table className="History-table">
          <thead>
            <tr>
              <th>Accounting</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{userIncomeExpenses}</tbody>
        </table>
      </div>
    </>
  );
}

export default History;
