// Libraries
import React, { useState, useEffect } from "react";
// Components API
import {
  getAllUsersData,
  deleteUserIncome,
  deleteUserExpenses,
} from "../../api/libraries/apiLibraries";
// Components
import HistoryTable from "./HistoryTable.js";
// Style
import "./style/History.css";
import { Table } from "reactstrap";

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
      // kode setUserID nepasikeicia?
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
    <Table bordered>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>user id</th>
        </tr>
      </thead>
      <tbody>{userIncomeExpenses}</tbody>
    </Table>
  );
}

export default History;



//////////////////////////////////////////////////////////
