import React, { createContext, useState, useContext, useEffect } from "react";

import { getCategory } from "../api/libraries/apiLibraries";
import { useGlobalUserContext, UserContext } from "../util/UserContext";

const CategoriesContext = createContext();

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
        getCategory(id).then((res) => {
          setExpensesCategories(res.data.data.category);
          console.log(res)
        });
    }
    
    return (
        <CategoriesContext.Provider
          value={{
            expensesCategories,
            refreshCategoriesData,
            getCategory,
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