import React, { useState, useEffect, Fragment } from "react";
import {getAllUsersData, deleteUserIncome, deleteUserExpenses,} from "../../api/libraries/apiLibraries";
import ReadOnlyRow from "./ReadOnlyRow.js";
import EditExpenses from "./EditExpenses.js";
import EditIncome from "./EditIncome.js";
import "./style/History.css";
import {
  getAllUsersData,
  deleteUserIncome,
  deleteUserExpenses,
} from "../../api/libraries/apiLibraries";
import { useGlobalUserContext, UserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from 'uuid';

function History() {
  const [users, setUsers] = useState([]);
  const { userData, updateUserData } = useGlobalUserContext(UserContext);


  useEffect(() => {
    setUsers(userData);
  }, [userData]);

  if (users !== undefined && users.hasOwnProperty("email")) {
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
        deleteUserIncome(users._id, subID).then(() => {
          updateUserData(users._id);
        });
      } else {
        deleteUserExpenses(users._id, subID).then(() => {
          updateUserData(users._id);
        });
        console.log("expenses");
      }
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
        />

        <Fragment>
        {editContactId === item._id && item.type === "expenses" ? (
         <EditExpenses 
            key={item._id}
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
            key={item._id}
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
