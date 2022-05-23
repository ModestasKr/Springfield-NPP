import React, { useState, useEffect, Fragment } from "react";
import LogCard from "./LogCard";
import ReactPaginate from "react-paginate";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const logsPerPage =25;
  const pagesVisited = pageNumber * logsPerPage;
   // search input
   const [searchTerm, setSearchTerm] = useState ("");

  const url = "http://localhost:4000/api/v1/users/logs";

  const getLogs = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.data.logs);
        setLogs(result.data.logs);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLogs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // datos rusiavimas
  function sortByDate(a, b) {
    if (a.date_created < b.date_created) {
      return 1;
    }
    if (a.date_created > b.date_created) {
      return -1;
    }
    return 0;
  }

  var logsByDate = logs.sort(sortByDate);

  const logRow = logsByDate.filter((log)=> {
    if (searchTerm == "") {
      return log 
    } else if (log.email.toLowerCase().includes(searchTerm.toLowerCase())){
    return log
  }
  else if (log.action.toLowerCase().includes(searchTerm.toLowerCase())){
    return log
  }
  }).slice(pagesVisited, pagesVisited + logsPerPage)
    .map((log) => {
      return (
        <LogCard
          key={log._id}
          email={log.email}
          action={log.action}
          amount={log.amount}
          date={log.date_created}
        />
      );
    });

  //pagination, change page
  var pageCount = Math.ceil(logsByDate.length / logsPerPage);
  var changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
    <div className="search-box">
        <input type="text" 
           className="search-input"
           placeholder="Paieška" 
           onChange={event => {
           setSearchTerm(event.target.value)
           }}
          />
      </div>
      <div className="History-container">
        <table className="History-body">
          <thead className="History-thead">
            <tr>
              <th>email</th>
              <th>action</th>
              <th>amount</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>{logRow}</tbody>
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

export default Logs;
