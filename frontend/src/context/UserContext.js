import React, { createContext, useState, useContext, useEffect } from "react";
import swal from "sweetalert";
import {
  loginUser,
  getUserById,
  getUserBalanceByMonth,
} from "../api/libraries/apiLibraries";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (localStorage.user !== undefined) {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    if (userData !== undefined && userData.hasOwnProperty("email")) {
      getUserBalanceByMonth(userData._id).then((res) => {
        setBalance(res.data.data.balance);
      });
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
      console.log(data);
      console.log(data.user);
      console.log(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUserData(res.data.user);
      localStorage.setItem("token", JSON.stringify(res.data.token));
    });
  }

  function logOut() {
    setUserData({});
    localStorage.clear();
    swal({
      title: "Ar tu tikras?",
      text: "Ar tu tikras, kad nori atsijungti?",
      icon: "warning",
      button: "Gerai",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          text: "Sėkmingai atsijungiatė!",
          icon: "success",
          button: "Gerai",
        });
      }
    });
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
