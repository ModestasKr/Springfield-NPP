
import React, { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable.js";
import "./style/History.css";
import { Table } from "reactstrap";
import {getAllUsersData, deleteUserIncome, deleteUserExpenses,} from "../../api/libraries/apiLibraries";

function History() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState(0);

  //   GET method one user data
  useEffect(() => {
    getAllUsersData().then((res) => {
      setUsers(res.data.data.users[userID]);
      setUserID(res.data.data.users[userID]._id);
      setIsLoading(true);
      // kodel setUserID nepasikeicia??
      console.log("useEffect " + userID);
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
    // tikrai cia su deleto userID viskas ok????
    function deleteItem(userID, subID, type) {
      console.log("userio id:" + users._id);
      console.log("subid " + subID);

      if (type === "income") {
        console.log("income");
        deleteUserIncome(users._id, subID);
      } else {
        deleteUserExpenses(users._id, subID);
        console.log("expenses");
      }
    }

    const incomeExpensesSortedByDate = incomeExpenses.sort(sortByDate);

    var userIncomeExpenses = incomeExpensesSortedByDate.map((item) => {
      return (
        <HistoryTable
          getAllUsersData={getAllUsersData}
          key={item._id}
          subID={item._id}
          date={item.date}
          category={item.category}
          amount={item.amount}
          deleteItem={deleteItem}
          type={item.type}
          userId={users._id}

        />
      );
    });
  }

  return (
    <div className="History-container">
      <table>
      <thead>
        <tr>
        <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Type</th>
           <th></th>
           <th></th>
        </tr>
      </thead>
      <tbody>{userIncomeExpenses}</tbody>
      </table>
      </div>
  );
}

export default History;

