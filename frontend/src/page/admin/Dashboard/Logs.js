import React, { useState, useEffect, Fragment } from "react";
import LogCard from "./LogCard";
import ReactPaginate from "react-paginate";
import { getLogs } from "../../../api/libraries/apiLibraries";

function Logs() {
  let [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const logsPerPage = 25;
  const pagesVisited = pageNumber * logsPerPage;
   // search input
   const [searchTerm, setSearchTerm] = useState ("");


  useEffect(() => {
    getLogs().then ((res) => {
      setLogs(res.data.data.logs);
    })
  }, []);
  

let arr = [];

for(let i = 0; i < logs.length; i++) {
  arr.unshift(logs[i]);
}

  const logRow = arr.filter((log)=> {
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
          date_created={log.date_created}
        />
      );
    });

  //pagination, change page
  var pageCount = Math.ceil(arr.length / logsPerPage);
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
              <th>El. paštas</th>
              <th>Veiksmas</th>
              <th>Suma</th>
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
