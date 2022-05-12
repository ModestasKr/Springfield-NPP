import React, { createContext, useState, useContext, useEffect } from "react";
import swal from "sweetalert";
import { loginUser, getUserById, getUserBalanceByMonth } from "../api/libraries/apiLibraries";


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [balance, setBalance] = useState(0);
//
  useEffect(() => {
    if (localStorage.user !== undefined ) {
      // console.log(localStorage.user === undefined);
      // console.log(localStorage.user == undefined);
      // console.log(typeof JSON.parse(localStorage.user));
      setUserData(JSON.parse(localStorage.getItem("user")));
      console.log("super" +userData);
      
    }
  }, []);

  useEffect(() => {
    if (userData !== undefined && userData.hasOwnProperty("email")) {
      console.log("super" +userData);
      getUserBalanceByMonth(userData._id).then((res) => {
      setBalance(res.data.data.balance)
        
        })
    }
  }, [userData]);

  function updateUserData(id) {
    getUserById(id).then((res) => {
      setUserData(res.data.data.users);
      localStorage.setItem("user", JSON.stringify(res.data.data.users));
    });
  }

  function doLogin(data) {
    loginUser(data).then((res) => {
      setUserData(res.data.user);
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log(JSON.parse(localStorage.user));
    });
  }

  function logOut() {
    setUserData({})
    localStorage.clear();
      swal({
        text: "Sėkmingai atsijungta!",
        icon: "success",
        button: "Puiku",
      });
    console.log(`Atsijungta`);
  }

  return (
    <UserContext.Provider
      value={{
        setUserData,
        doLogin,
        userData,
        updateUserData,
        logOut,
        balance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
