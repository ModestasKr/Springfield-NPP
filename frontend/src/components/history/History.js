import React, { useState, useEffect, Fragment } from "react";
import {getAllUsersData, deleteUserIncome, deleteUserExpenses,} from "../../api/libraries/apiLibraries";
import ReadOnlyRow from "./ReadOnlyRow.js";
import EditExpenses from "./EditExpenses.js";
import EditIncome from "./EditIncome.js";
import "./style/History.css";

function History() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userID, setUserID] = useState(0);
  const [editContactId, setEditContactId] = useState(null);

 
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

    const handleEditClick = (event, subID, type) => {
        event.preventDefault();
        setEditContactId(subID);
    
      };

      const handleCancelClick = () => {
        setEditContactId(null);
      };

    const incomeExpensesSortedByDate = incomeExpenses.sort(sortByDate);

    var userIncomeExpenses = incomeExpensesSortedByDate.map((item) => {
      return (
        <Fragment>
        {editContactId === item._id && item.type === "expenses" ? (
         <EditExpenses 
            getAllUsersData={getAllUsersData}
            // key={item._id}
            handleCancelClick = {handleCancelClick}
            subID={item._id}
            date={item.date}
            category={item.category}
            amount={item.amount}
            type={item.type}
            name={item.name}
            userID={users._id}
            Render={Render}
            setEditContactId = {setEditContactId}
          />
         ) : editContactId === item._id && item.type === "income" ? (
         <EditIncome 
            getAllUsersData={getAllUsersData}
            // key={item._id}
            handleCancelClick = {handleCancelClick}
            subID={item._id}
            date={item.date}
            category={item.category}
            amount={item.amount}
            type={item.type}
            name={item.name}
            userID={users._id}
            Render={Render}
            setEditContactId = {setEditContactId}
            />
         )
          : (
          <ReadOnlyRow 
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
            handleEditClick = {handleEditClick}
            />
         )
        }
      </Fragment>
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
