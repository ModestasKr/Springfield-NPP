// Libraries
import React, { useState, useEffect, Fragment } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
// API
import {
  deleteUserIncome,
  deleteUserExpenses,
  addLog,
  getAllUserExpensesByMonth,
  getAllUserIncomeByMonth,
} from "../../api/libraries/apiLibraries";
// Components
import ReadOnlyRow from "./ReadOnlyRow.js";
import EditExpenses from "./EditExpenses.js";
import EditIncome from "./EditIncome.js";
// Style
import "./style/History.css";
import "./style/Button.css";
// Context
import { useGlobalUserContext, UserContext } from "../../util/UserContext";

function History() {
  // useState
  const [users, setUsers] = useState([]);
  const { userData, updateUserData } = useGlobalUserContext(UserContext);
  const [editContactId, setEditContactId] = useState(null);
  const [logData, setLogData] = useState(0);
  const [userIncome, setUserIncome] = useState([]);
  const [userExpenses, setUserExpenses] = useState([]);
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const dataPerPage = 10;
  const pagesVisited = pageNumber * dataPerPage;
  // search input
  const [searchTerm, setSearchTerm] = useState("");

 
  // We have all user data using context
  useEffect(() => {
   
    setUsers(userData);
    getAllIncomes();
    
  }, [userData]);

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

  const arr = [];

  for (let i = 0; i < userIncome.length; i++) {
    arr.push({ ...userIncome[i], ...userExpenses[i] });
  }

  const csvHeader = [
    { label: "Tipas", key: "type" },
    { label: "Suma", key: "amount" },
    { label: "Kategorija", key: "category" },
    { label: "Data", key: "date" },
    { label: "Įrašas sukurtas", key: "date_created" },
    { label: "Įrašas atnaujintas", key: "date_updated" },
  ];
  const csvReport = {
    filename: "Islaidos.csv",
    headers: csvHeader,
    data: userData.expenses,
  };

  // Specified property as its own property
  if (users !== undefined && users.hasOwnProperty("email")) {
    // Seprate income and expenses items
    let { income } = users;
    let { expenses } = users;

    // Spread arguments more than 0
    let incomeExpenses = [...income, ...expenses];

    // Sort items by date
    function sortByDate(a, b) {
      if (a.date_created < b.date_created) {
        return 1;
      }
      if (a.date_created > b.date_created) {
        return -1;
      }
      return 0;
    }

    // DELETE items
    function deleteItem(userID, subID, type, amount) {
      const data = {
        email: users.email,
        action: `Deleted ${type}`,
        subID: subID,
      };
      swal({
        title: "Ar tikrai norite ištrinti?",
        icon: "warning",
        buttons: ["Atšaukti", "Gerai"],
      }).then((isConfirm) => {
        if (isConfirm) {
          if (type === "income") {
            deleteUserIncome(users._id, subID, userID).then(() => {
              updateUserData(users._id);
            });
          } else if (type === "expenses") {
            deleteUserExpenses(users._id, subID, userID).then(() =>
              updateUserData(users._id)
            );
          }
        }
      });
      // Incomes

      if (type === "income") {
        deleteUserIncome(users._id, subID, userID, amount).then(() => {
          setLogData(data);
          updateUserData(users._id);
          addLog(logData);
        });
        // Expenses
      } else {
        deleteUserExpenses(users._id, subID, userID, amount).then(() => {
          setLogData(data);
          updateUserData(users._id);
          addLog(logData);
        });
      }
    }

    // Edit button
    const handleEditClick = (event, subID, type) => {
      // default action that belongs to the event will not occur
      event.preventDefault();
      // By ID
      setEditContactId(subID, type);
    };
    // Cancel button
    const handleCancelClick = () => {
      // direct null
      setEditContactId(null);
    };

    const incomeExpensesSortedByDate = incomeExpenses.sort(sortByDate);

    var displayData = incomeExpensesSortedByDate
      .filter((log) => {
        if (searchTerm == "") {
          return log;
        } else if (
          log.category.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return log;
        } else if (log.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return log;
        }
      })
      .slice(pagesVisited, pagesVisited + dataPerPage)
      .map((item) => {
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

    //pagination, change page
    var pageCount = Math.ceil(incomeExpensesSortedByDate.length / dataPerPage);
    var changePage = ({ selected }) => {
      setPageNumber(selected);
    };
  }
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Paieška"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="Csv-body">
        <button className="Csv">
          <CSVLink className="Csv-text" {...csvReport}>
            Atsisiūsti išlaidų CSV
          </CSVLink>
        </button>
      </div>

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
          <tbody>{displayData}</tbody>
        </table>
      </div>
      <div className="pagination">
        <ReactPaginate
          nextLabel={"Pirmyn"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          nextLinkClassName={"previuosButtons"}
          disabledClassName={"paginationDisabled"}
          previousLabel="Atgal"
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
}

export default History;
