import React, { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable.js";
import "./style/History.css";
import {
  getAllUsersData,
  deleteUserIncome,
  deleteUserExpenses,
} from "../../api/libraries/apiLibraries";

function History() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState(0);
  
  
  //   GET method one user data
  function Render() {
    getAllUsersData().then((res) => {
      setUsers(res.data.data.users[0]);
      setUserID(res.data.data.users[0]._id);
      setIsLoading(true);
  
    });
  }

  useEffect(() => {
    Render();
  }, []);

  if (isLoading) {
    let { income } = users;
    let { expenses } = users;

    let incomeExpenses = [...income, ...expenses];

    function sortByDate(a, b) {
      if (a.date_created < b.date_created) {
        return 1;
      }
      if (a.date_created > b.date_created) {
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
      Render();
      Render();
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
          name={item.name}
          userID={users._id}
          Render={Render}
        />
      );
    });
  }

  return (
    <>
      <div className="History-container">
        <table className="History-body">
          <thead className="History-thead">
            <tr>
              <th>Suma</th>
              <th>Kategorija</th>
              <th>Pavadinimas</th>
              <th>Data</th>
              <th>Pasirinkimas</th>
            </tr>
          </thead>
          <tbody>{userIncomeExpenses}</tbody>
        </table>
      </div>
    </>
  );
}

export default History;
