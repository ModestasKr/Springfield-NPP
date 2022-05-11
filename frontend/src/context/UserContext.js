import React, { createContext, useState, useContext, useEffect } from "react";

import { loginUser, getUserById } from "../api/libraries/apiLibraries";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (localStorage.user !== undefined) {
      console.log(localStorage.user === undefined);
      console.log(localStorage.user == undefined);
      console.log(typeof JSON.parse(localStorage.user));
      setUserData(JSON.parse(localStorage.getItem("user")));
      console.log(userData);
    }
  }, []);

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

  return (
    <UserContext.Provider
      value={{
        setUserData,
        doLogin,
        userData,
        updateUserData,
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
