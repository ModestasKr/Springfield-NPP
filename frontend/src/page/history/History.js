// Libraries
import React, { useState, useEffect, Fragment } from "react";
// API
import {
  deleteUserIncome,
  deleteUserExpenses,
} from "../../api/libraries/apiLibraries";
// Components
import ReadOnlyRow from "./ReadOnlyRow.js";
import EditExpenses from "./EditExpenses.js";
import EditIncome from "./EditIncome.js";
// Style
import "./style/History.css";
// Context
import { useGlobalUserContext, UserContext } from "../../context/UserContext";

function History() {
  const [users, setUsers] = useState([]);
  const { userData, updateUserData } = useGlobalUserContext(UserContext);
  const [editContactId, setEditContactId] = useState(null);

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

    function deleteItem(userID, subID, type) {
      if (type === "income") {
        deleteUserIncome(users._id, subID, userID).then(() => {
          updateUserData(users._id);
        });
      } else {
        deleteUserExpenses(users._id, subID, userID).then(() => {
          updateUserData(users._id);
        });
      }
    }

    const handleEditClick = (event, subID, type) => {
      event.preventDefault();
      setEditContactId(subID, type);
    };

    const handleCancelClick = () => {
      setEditContactId(null);
    };

    const incomeExpensesSortedByDate = incomeExpenses.sort(sortByDate);

    var userIncomeExpenses = incomeExpensesSortedByDate.map((item) => {
      return (
        <Fragment key={item._id}>
          {editContactId === item._id && item.type === "expenses" ? (
            <EditExpenses
              subID={item._id}
              userID={users._id}
              date={item.date}
              category={item.category}
              amount={item.amount}
              type={item.type}
              name={item.name}
              updateUserData={updateUserData}
              handleCancelClick={handleCancelClick}
              setEditContactId={setEditContactId}
            />
          ) : editContactId === item._id && item.type === "income" ? (
            <EditIncome
              subID={item._id}
              userID={users._id}
              date={item.date}
              category={item.category}
              amount={item.amount}
              type={item.type}
              name={item.name}
              updateUserData={updateUserData}
              handleCancelClick={handleCancelClick}
              setEditContactId={setEditContactId}
            />
          ) : (
            <ReadOnlyRow
              subID={item._id}
              userID={users._id}
              date={item.date}
              category={item.category}
              amount={item.amount}
              type={item.type}
              name={item.name}
              updateUserData={updateUserData}
              deleteItem={deleteItem}
              handleEditClick={handleEditClick}
            />
          )}
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
