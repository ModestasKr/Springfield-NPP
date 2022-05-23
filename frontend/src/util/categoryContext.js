import React, { createContext, useState, useContext, useEffect } from "react";

import { getCategory } from "../../api/library/CategoriesAPI";
import { useGlobalUserContext, UserContext } from "../context/UserContext";

const CategoriesProvider = ({ children }) => {
    const [expensesCategories, setExpensesCategories] = useState([]);
    const { userData } = useGlobalUserContext(UserContext);
  
    useEffect(() => {
      if (userData != undefined && userData.hasOwnProperty("email")) {
        getCategory().then((res) => {
          setExpensesCategories(res.data.data.category);
        });
      }
    }, [userData]);

    function refreshCategoriesData(id) {
        getAllExpCategories().then((res) => {
          setExpensesCategories(res.data.data.category);
        });
    }
    
    return (
        <CategoriesContext.Provider
          value={{
            expensesCategories,
            refreshCategoriesData,
          }}
        >
          {children}
        </CategoriesContext.Provider>
    );
};

export const useGlobalCategoriesContext = () => {
    return useContext(CategoriesContext);
};
  
export { CategoriesContext, CategoriesProvider };