import React, { useState, useEffect, Fragment } from "react";
import swal from "sweetalert";
import "../../history/style/History.css";
import ReadOnlyUser from "./ReadOnlyUser";
import ReactPaginate from "react-paginate";
import "./style/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCounter, setUserCounter] = useState();
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;
  // search input
  const [searchTerm, setSearchTerm] = useState("");

  const url = "http://localhost:4000/api/v1/users";

  const getUsers = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setUserCounter(result.data.users.length);
        setUsers(result.data.users);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Maping parameter
  const usersData = users
    .filter((item) => {
      if (searchTerm == "") {
        return item;
      } else if (
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return item;
      } else if (item.email.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      }
    })
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <ReadOnlyUser
          key={item._id}
          username={item.username}
          userID={item._id}
          email={item.email}
        />
      );
    });

  //pagination, change page
  var pageCount = Math.ceil(users.length / usersPerPage);
  var changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <h3 className="Users-counter">Vartotojų skaičius: {userCounter} </h3>
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
      <div className="History-container">
        <table className="History-body">
          <thead className="History-thead">
            <tr>
              <th>Username</th>
              <th>email</th>
              <th>id</th>
            </tr>
          </thead>
          <tbody>{usersData}</tbody>
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

export default Users;
