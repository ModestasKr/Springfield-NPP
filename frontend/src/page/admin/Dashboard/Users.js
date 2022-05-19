import React, { useState, useEffect, Fragment } from "react";
import swal from "sweetalert";
import "../../history/style/History.css";
// Context
import { useGlobalUserContext, UserContext } from "../../../util/UserContext";
import ReadOnlyUser from "./ReadOnlyUser";

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userCounter, setUserCounter] = useState();
    
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
  
    if (isLoading){
        return <div>Loading...</div>
    }
  
  
    // Maping parameter
    const usersData = users.map((item) => {
      return (
            <ReadOnlyUser
              key = {item._id}
              username={item.username}
              userID={item._id}
              email={item.email}
            />
          )
    });
    
  return (
    <>

    <h3>Vartotojų skaičius: {userCounter} </h3>
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
    </>
  );
}

export default Users;