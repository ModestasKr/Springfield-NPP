import React, { useState, useEffect, Fragment } from "react";
import swal from "sweetalert";
import "../../history/style/History.css";
import ReadOnlyUser from "./ReadOnlyUser";
import ReactPaginate from "react-paginate";
import "./style/Users.css";
import EditUser from "./EditUser";
import { deleteUserById } from "../../../api/libraries/apiLibraries";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCounter, setUserCounter] = useState();
  const [editContactId, setEditContactId] = useState(null);
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

    // Cancel button
    const handleCancelClick = () => {
      // direct null
      setEditContactId(null);
    };

    // Edit button
    const handleEditClick = (event, userID) => {
      // default action that belongs to the event will not occur
      event.preventDefault();
      // By ID
      setEditContactId(userID);
    };

    //delete user
    function deleteUser(userID) {
      swal({
        title: "Ar tikrai norite ištrinti šį vartotoją?",
        icon: "warning",
        buttons: ["Atšaukti", "Gerai"],
      }).then((isConfirm) => {
        if (isConfirm) {
          console.log(isConfirm);
          deleteUserById(userID);
          // reset();
          getUsers();
        }
        swal({
          text: "Ištrinta!",
          icon: "success",
          button: "Gerai",
          timer: 1500,
        });
      });
    }
      console.log(users)
  // Maping parameter
  const usersData = users

    .filter((items) => {
     
      if (searchTerm == "") {
        return items;
      } else if (
        items.username.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return items;
      } else if (items.email.toLowerCase().includes(searchTerm.toLowerCase())) {
        return items;
      }
    })
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
          <Fragment key={item._id}>
           {editContactId === item._id ? (
              <EditUser
                username={item.username}
                userID={item._id}
                email={item.email}
                handleCancelClick={handleCancelClick}
                setEditContactId={setEditContactId}
                users={users}
                getUsers={getUsers}
                />
           ) : (
              <ReadOnlyUser
                username={item.username}
                userID={item._id}
                email={item.email}
                deleteUser={deleteUser}
                handleEditClick={handleEditClick}
                users={users}
                />
           )}
        </Fragment>
      );
    });

  //pagination, change page
  var pageCount = Math.ceil(users.length / usersPerPage);
  var changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
      {/* <p className="Users-counter">Vartotojų skaičius: {userCounter} </p> */}
      <div className="History-container">
        <table className="History-body">
          <thead className="History-thead">
            <tr>
              <th>ID (Viso: {userCounter})</th>
              <th>Vartotojo vardas</th>
              <th>EL. paštas</th>
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
